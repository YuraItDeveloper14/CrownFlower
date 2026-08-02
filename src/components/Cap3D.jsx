import { useEffect, useRef, useState } from 'react'
import { RotateCw } from 'lucide-react'

// A real 3D cap built procedurally in Three.js (WebGPU + node materials, per the
// webgpu-threejs-tsl skill): a low 6-panel crown + six flower-petal visors
// radiating out + a gold metal button. Drag to rotate (tilt under to see the
// inside), auto-spins. Camera framed so all six visors stay in view.
export default function Cap3D({ crown = '#15141b', accent = '#d6a85a', size = 360 }) {
  const mountRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mountEl = mountRef.current
    let renderer, controls, disposed = false, onResize

    ;(async () => {
      const THREE = await import('three/webgpu')
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js')
      if (disposed || !mountEl) return

      const w = mountEl.clientWidth || size
      const h = mountEl.clientHeight || size

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100)
      camera.position.set(0, 2.3, 5.4)

      // lights
      scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b0a4, 1.4))
      const key = new THREE.DirectionalLight(0xffffff, 2.7)
      key.position.set(2.5, 5, 3)
      scene.add(key)
      const warm = new THREE.DirectionalLight(0xffe2b0, 1.2)
      warm.position.set(-3, 1.5, 1)
      scene.add(warm)

      // materials
      const fabric = new THREE.MeshStandardNodeMaterial({
        color: new THREE.Color(crown),
        roughness: 0.82,
        metalness: 0.06,
      })
      const fabricDark = new THREE.MeshStandardNodeMaterial({
        color: new THREE.Color(crown).multiplyScalar(0.6),
        roughness: 0.85,
        metalness: 0.04,
      })
      const gold = new THREE.MeshStandardNodeMaterial({
        color: new THREE.Color(accent),
        roughness: 0.22,
        metalness: 1.0,
      })

      const cap = new THREE.Group()

      // low rounded crown dome — open hemisphere, double-sided so the inside
      // (lining) is visible when the cap is tilted to its underside
      fabric.side = THREE.DoubleSide
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(0.85, 64, 44, 0, Math.PI * 2, 0, Math.PI * 0.5),
        fabric
      )
      dome.scale.set(1, 0.5, 1)
      cap.add(dome)

      // sweatband rim at the opening (reads as a real cap from underneath)
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.055, 18, 60), fabricDark)
      rim.rotation.x = Math.PI / 2
      cap.add(rim)

      // centre rivet on the inside (back of the button)
      const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 16), fabricDark)
      rivet.position.y = -0.04
      cap.add(rivet)

      // six rounded flat petals — same flower shape as the SVG, joined at base
      const petalGeo = new THREE.SphereGeometry(0.6, 44, 28)
      for (let i = 0; i < 6; i++) {
        const petal = new THREE.Mesh(petalGeo, fabric)
        petal.scale.set(1.28, 0.1, 0.8) // wide, flat, rounded
        const a = (i / 6) * Math.PI * 2
        petal.position.set(Math.cos(a) * 0.92, -0.02, Math.sin(a) * 0.92)
        petal.rotation.y = -a
        cap.add(petal)
      }

      // gold centre button (the only metal accent — clean cap)
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.14, 32, 24), gold)
      btn.position.set(0, 0.45, 0)
      cap.add(btn)

      cap.scale.setScalar(0.9)
      scene.add(cap)

      renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true })
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
      renderer.setSize(w, h)

      try {
        await renderer.init()
      } catch {
        return
      }
      if (disposed) {
        renderer.dispose()
        return
      }

      mountEl.appendChild(renderer.domElement)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      setReady(true)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.enablePan = false
      controls.enableZoom = false
      controls.autoRotate = true
      controls.autoRotateSpeed = 1.6
      controls.target.set(0, 0, 0)
      controls.update()

      onResize = () => {
        const nw = mountEl.clientWidth, nh = mountEl.clientHeight
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        renderer.setSize(nw, nh)
      }
      window.addEventListener('resize', onResize)

      renderer.setAnimationLoop(() => {
        controls.update()
        renderer.render(scene, camera)
      })
    })()

    return () => {
      disposed = true
      if (onResize) window.removeEventListener('resize', onResize)
      if (controls) controls.dispose()
      if (renderer) {
        renderer.setAnimationLoop(null)
        if (renderer.domElement?.parentNode) renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [crown, accent, size])

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={mountRef}
        className="relative grid touch-none place-items-center rounded-2xl"
        style={{ width: size, height: size }}
      >
        {!ready && (
          <span className="absolute h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-gold" />
        )}
      </div>
      <p className="inline-flex items-center gap-2 text-sm text-stone-500">
        <RotateCw size={14} /> Drag to rotate · auto-spins
      </p>
    </div>
  )
}

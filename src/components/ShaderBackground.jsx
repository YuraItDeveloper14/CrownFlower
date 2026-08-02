import { useEffect, useRef } from 'react'

// A subtle WebGPU/TSL animated background: a slow flowing gold sheen over the
// porcelain base. Written with Three.js TSL (per the webgpu-threejs-tsl skill).
// WebGPURenderer falls back to WebGL2 automatically when WebGPU is unavailable.
export default function ShaderBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const mountEl = ref.current
    let renderer
    let disposed = false
    let onResize

    ;(async () => {
      const THREE = await import('three/webgpu')
      const { color, uv, time, mix } = await import('three/tsl')
      if (disposed || !mountEl) return

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

      const uvN = uv()
      // two crossing slow waves → soft organic flow (0..1)
      const wave = uvN.x.add(uvN.y).mul(3).add(time.mul(0.18)).sin().mul(0.5).add(0.5)
      const wave2 = uvN.y.sub(uvN.x).mul(2.4).sub(time.mul(0.12)).sin().mul(0.5).add(0.5)
      const intensity = wave.mul(wave2).mul(0.16) // cap the gold tint ~16%

      const mat = new THREE.MeshBasicNodeMaterial()
      mat.colorNode = mix(color(0xf6f6f4), color(0xe0b84d), intensity)

      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat)
      scene.add(quad)

      renderer = new THREE.WebGPURenderer({ antialias: false })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(window.innerWidth, window.innerHeight)

      try {
        await renderer.init()
      } catch (e) {
        // GPU not available — leave the CSS porcelain base showing
        return
      }
      if (disposed) {
        renderer.dispose()
        return
      }

      const canvas = renderer.domElement
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.display = 'block'
      mountEl.appendChild(canvas)

      onResize = () => renderer.setSize(window.innerWidth, window.innerHeight)
      window.addEventListener('resize', onResize)
      renderer.setAnimationLoop(() => renderer.render(scene, camera))
    })()

    return () => {
      disposed = true
      if (onResize) window.removeEventListener('resize', onResize)
      if (renderer) {
        renderer.setAnimationLoop(null)
        if (renderer.domElement?.parentNode) renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [])

  return <div ref={ref} className="absolute inset-0" aria-hidden="true" />
}

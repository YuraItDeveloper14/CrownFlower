import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

// Interactive 3D scene (e.g. the cursor-following robot) from Spline.
export default function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="grid h-full w-full place-items-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-gold" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}

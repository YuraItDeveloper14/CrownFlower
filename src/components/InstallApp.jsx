import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Apple, Check, Share } from 'lucide-react'

// "Get the app" band: uses the PWA install prompt where available (Android /
// desktop Chrome/Edge), and shows manual steps on iOS / unsupported browsers.
export default function InstallApp() {
  const [deferred, setDeferred] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    if (window.matchMedia?.('(display-mode: standalone)').matches) setInstalled(true)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = async () => {
    if (deferred) {
      deferred.prompt()
      const { outcome } = await deferred.userChoice
      if (outcome === 'accepted') setInstalled(true)
      setDeferred(null)
    } else {
      setShowHelp((v) => !v)
    }
  }

  if (installed) return null

  return (
    <section className="relative px-5 pt-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-10"
        >
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            {/* app icon */}
            <motion.img
              src="/icon.svg"
              alt="CROWNFLOWER app"
              className="h-20 w-20 shrink-0 rounded-2xl shadow-md"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="flex-1">
              <span className="eyebrow">Get the app</span>
              <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 sm:text-3xl">
                Install CROWNFLOWER — right here
              </h2>
              <p className="mt-2 text-stone-600">
                Add it to your home screen or desktop in one tap. Opens like a real
                app, works offline. No store, no download fuss.
              </p>
            </div>

            <button onClick={install} className="btn-primary shrink-0">
              <Download size={18} />
              Install app
            </button>
          </div>

          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 grid gap-4 border-t border-stone-200 pt-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-2xl bg-stone-50 p-4">
                    <Apple size={20} className="mt-0.5 shrink-0 text-stone-700" />
                    <p className="text-sm text-stone-600">
                      <span className="font-semibold text-stone-900">iPhone / iPad (Safari):</span> tap
                      <Share size={14} className="mx-1 inline align-text-bottom" />
                      <span className="font-medium">Share</span> → <span className="font-medium">Add to Home Screen</span>.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-stone-50 p-4">
                    <Check size={20} className="mt-0.5 shrink-0 text-stone-700" />
                    <p className="text-sm text-stone-600">
                      <span className="font-semibold text-stone-900">Desktop / Android (Chrome, Edge):</span> open
                      the browser menu and choose <span className="font-medium">Install CROWNFLOWER</span>.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

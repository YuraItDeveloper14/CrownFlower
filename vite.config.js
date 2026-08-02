import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Web build uses absolute root paths (so the manifest/assets resolve on deep
  // routes like /product/x). The Electron build sets ELECTRON_BUILD=1 to use
  // relative paths, required to load from a file:// URL.
  base: process.env.ELECTRON_BUILD ? './' : '/',
  plugins: [react()],
})

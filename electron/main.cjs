const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height: 880,
    minWidth: 380,
    minHeight: 640,
    backgroundColor: '#f6f6f4',
    title: 'CROWNFLOWER',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
    },
  })

  // Open any external link (http/https) in the system browser, not the app window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url)
      return { action: 'deny' }
    }
    return { action: 'allow' }
  })

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173')
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

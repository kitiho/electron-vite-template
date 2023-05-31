import { resolve } from 'node:path'
import { BrowserWindow, app, ipcMain } from 'electron'

let mainWindow: BrowserWindow | null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      preload: resolve(__dirname, './preload.js'),
      nodeIntegration: true,
      sandbox: false,
    },
  })

  ipcMain.handle('ping', () => 'pong2222')

  // when in dev mode, load the url and open the dev tools
  if (import.meta.env.DEV) {
    mainWindow.loadURL(import.meta.env.ELECTRON_APP_URL)
    mainWindow.webContents.openDevTools()
  }
  else {
    // in production, close the dev tools
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools()
    })

    // load the build file instead
    mainWindow.loadFile(import.meta.env.ELECTRON_APP_URL)
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  if (mainWindow == null)
    createWindow()
})

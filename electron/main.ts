import { join, resolve } from 'node:path'
import { BrowserWindow, app, ipcMain } from 'electron'
import { ListRepositoriesRequest } from '@alicloud/devops20210625'
import { client, runtime } from './client'

let mainWindow: BrowserWindow | null

const indexHtml = join(__dirname, '../dist/index.html')

async function handleGetData() {
  const request = new ListRepositoriesRequest({
    organizationId: import.meta.env.VITE_ORGANIZATION_ID,
  })
  const headers: { [key: string ]: string } = { }
  try {
    const res = await client.listRepositoriesWithOptions(request, headers, runtime)
    return res
  }
  catch (error) {
    return 'error'
  }
}

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

  // when in dev mode, load the url and open the dev tools
  if (import.meta.env.DEV) {
    mainWindow.loadURL(import.meta.env.ELECTRON_APP_URL)
    mainWindow.webContents.openDevTools()
  }
  else {
    // in production, close the dev tools
    // mainWindow.webContents.on('devtools-opened', () => {
    //   mainWindow?.webContents.closeDevTools()
    // })

    // load the build file instead
    mainWindow.loadFile(indexHtml)
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  ipcMain.handle('getData', handleGetData)
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  if (mainWindow == null)
    createWindow()
})

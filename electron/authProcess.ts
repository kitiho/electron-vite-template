import { BrowserWindow } from 'electron'
import { getAuthenticationURL } from './auth'

let win: BrowserWindow | null = null

function createAuthWindow() {
  destroyAuthWin()

  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
    },
  })

  win.loadURL(getAuthenticationURL())

  const { session: { webRequest } } = win.webContents

  const filter = {
    urls: [
      'http://localhost/callback*',
    ],
  }

  webRequest.onBeforeRequest(filter, async ({ url }) => {
    win?.webContents.send('auth-success', url)
    // return destroyAuthWin()
  })

  // win.on('authenticated', () => {
  //   destroyAuthWin()
  // })

  win.on('closed', () => {
    win = null
  })
}
function destroyAuthWin() {
  if (!win)
    return
  win.close()
  win = null
}

export {
  createAuthWindow,
}

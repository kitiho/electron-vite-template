import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('readSettings', {
  ping: () => ipcRenderer.invoke('ping'),
})

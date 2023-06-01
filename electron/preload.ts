import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getData: () => ipcRenderer.invoke('getData'),
})

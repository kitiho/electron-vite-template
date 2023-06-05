import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getData: () => ipcRenderer.invoke('getData'),
  login: (setToken: any) => ipcRenderer.invoke('login', setToken),
  onLoginSuccess: (callback: any) => ipcRenderer.on('auth-success', callback),
})

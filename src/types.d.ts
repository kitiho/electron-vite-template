interface Window {
  electronAPI: {
    getData: () => Promise<unknown>
    login: () => Promise<unknown>
    onLoginSuccess: (arg:(event:any,value:any)=>void) => void
  }
}

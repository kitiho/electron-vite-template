import { resolve } from 'node:path'
import { type ChildProcess, spawn } from 'node:child_process'
import type { AddressInfo } from 'node:net'
import { build, defineConfig } from 'vite'
import type { ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

async function bundle(server: ViteDevServer) {
  const address = server.httpServer.address() as AddressInfo
  // build the url
  const appUrl = `http://localhost:${address.port}`
  // this is RollupWatcher, but vite do not export its typing...
  const watcher: any = await build({
    // our config file, vite will not resolve this file
    configFile: 'vite.config.electron.ts',
    // mode is `development` when running vite
    // mode is `production` when running vite build
    mode: server.config.mode,
    build: {
      watch: {}, // to make a watcher
    },
    define: {
      // here we define a vite replacement
      'import.meta.env.ELECTRON_APP_URL': JSON.stringify(appUrl),
    },
  })

  // it returns a string pointing to the electron binary

  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const electron = require('electron') as string
  // resolve the electron main file
  const electronMain = resolve(
    server.config.root,
    server.config.build.outDir,
    'main.js',
  )

  let child: ChildProcess | undefined

  // exit the process when electron closes
  function exitProcess() {
    process.exit(0)
  }

  // restart the electron process
  function start() {
    if (child)
      child.kill()

    child = spawn(electron, [electronMain], {
      windowsHide: false,
    })

    child.on('close', exitProcess)
  }

  function startElectron({ code }: any) {
    if (code === 'END') {
      watcher.off('event', startElectron)
      start()
    }
  }

  watcher.on('event', startElectron)

  // watch the build, on change, restart the electron process
  watcher.on('change', () => {
    // make sure we dont kill our application when reloading
    child.off('close', exitProcess)

    start()
  })
}

// https://vitejs.dev/config/
export default defineConfig(env => ({
  base: env.mode === 'production' ? './' : '/',
  plugins: [
    react(),
    {
      name: 'electron-vite',
      configureServer(server) {
        server.httpServer.on('listening', () => {
          bundle(server).catch(server.config.logger.error)
        })
      },
    }],
}))

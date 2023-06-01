import { defineConfig } from 'vite'

export default defineConfig(env => ({
  base: env.mode === 'production' ? './' : '/',
  publicDir: false,
  build: {
    emptyOutDir: false,
    ssr: true,
    rollupOptions: {
      input: ['electron/main.ts', 'electron/preload.ts'],
      output: {
        format: 'cjs',
      },
    },
  },
  define: {
    // once again
    // 'import.meta.env.ELECTRON_APP_URL': `${join('./dist/index.html')}`,
  },
}))

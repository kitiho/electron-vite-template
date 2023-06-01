/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ORGANIZATION_ID: string
  readonly VITE_ACCESSKEY_ID: string
  readonly VITE_ACCESSKEY_SECRET: string
  readonly VITE_REGION_ID: string
  readonly VITE_ENDPOINT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

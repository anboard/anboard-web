/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_LOGIN_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly BEARER_TOKEN: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
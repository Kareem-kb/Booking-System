/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly AUTH_MAILGUN_KEY: string
    // Add other environment variables you're using
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_HELPLINE: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_MOMO_NUMBER: string;
  readonly VITE_MAP_EMBED_URL: string;
  readonly VITE_APP_STORE_URL: string;
  readonly VITE_PLAY_STORE_URL: string;
  readonly VITE_INSTAGRAM_URL: string;
  readonly VITE_TIKTOK_URL: string;
  readonly VITE_FACEBOOK_URL: string;
  readonly VITE_X_URL: string;
  readonly VITE_THREADS_URL: string;
  readonly VITE_YOUTUBE_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
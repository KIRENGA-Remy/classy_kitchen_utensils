const env = import.meta.env;

export const site = {
  name: 'Classy Kitchen Utensils',
  city: 'City Plaza Building, Kigali',
  helpline: env.VITE_HELPLINE ?? '+250 7XX XXX XXX',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? '',
  momoNumber: env.VITE_MOMO_NUMBER ?? '',
  mapEmbedUrl: env.VITE_MAP_EMBED_URL ?? 'https://www.google.com/maps?q=City+Plaza+Kigali&output=embed',
  appStoreUrl: env.VITE_APP_STORE_URL ?? '#',
  playStoreUrl: env.VITE_PLAY_STORE_URL ?? '#',
  socials: {
    instagram: env.VITE_INSTAGRAM_URL ?? '#',
    tiktok: env.VITE_TIKTOK_URL ?? '#',
    facebook: env.VITE_FACEBOOK_URL ?? '#',
    x: env.VITE_X_URL ?? '#',
    threads: env.VITE_THREADS_URL ?? '#',
    youtube: env.VITE_YOUTUBE_URL ?? '#',
  },
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

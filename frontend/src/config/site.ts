// All contact / social / map values come from env so nothing personal is
// hard-coded in the repo. Fill them in your local .env (see .env.example).
const env = import.meta.env;

export const site = {
  name: 'Classy Kitchen Utensils',
  city: 'Kigali, City Plaza',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? '',
  momoNumber: env.VITE_MOMO_NUMBER ?? '',
  mapEmbedUrl: env.VITE_MAP_EMBED_URL ?? '',
  socials: {
    instagram: env.VITE_INSTAGRAM_URL ?? '#',
    tiktok: env.VITE_TIKTOK_URL ?? '#',
    facebook: env.VITE_FACEBOOK_URL ?? '#',
    x: env.VITE_X_URL ?? '#',
    threads: env.VITE_THREADS_URL ?? '#',
  },
};

// Build a prefilled WhatsApp order link.
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WishlistCtx {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  count: number;
}

const Ctx = createContext<WishlistCtx | null>(null);
const KEY = 'cku_wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(slugs)); }, [slugs]);

  const toggle = (slug: string) =>
    setSlugs((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));
  const has = (slug: string) => slugs.includes(slug);

  return <Ctx.Provider value={{ slugs, toggle, has, count: slugs.length }}>{children}</Ctx.Provider>;
}

export const useWishlist = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useWishlist must be used within WishlistProvider');
  return c;
};

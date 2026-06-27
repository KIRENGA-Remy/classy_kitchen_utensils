import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
  slug: string;
  name: string;
  priceRwf: number;
  image: string;
  quantity: number;
}

interface CartCtx {
  items: CartItem[];
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  totalRwf: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = 'cku_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const add: CartCtx['add'] = (item, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.slug === item.slug);
      if (found) return prev.map((i) => (i.slug === item.slug ? { ...i, quantity: i.quantity + qty } : i));
      return [...prev, { ...item, quantity: qty }];
    });

  const remove = (slug: string) => setItems((p) => p.filter((i) => i.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setItems((p) => p.map((i) => (i.slug === slug ? { ...i, quantity: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const totalRwf = items.reduce((s, i) => s + i.priceRwf * i.quantity, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, totalRwf }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
};

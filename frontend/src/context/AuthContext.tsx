import { createContext, useContext, useState, ReactNode } from 'react';
import api from '../lib/api';

interface Admin { id: string; email: string; name: string; }
interface AuthCtx {
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; name: string; password: string; inviteCode?: string }) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const TOKEN_KEY = 'cku_admin_token';
const ADMIN_KEY = 'cku_admin';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState<Admin | null>(() => {
    try { return JSON.parse(localStorage.getItem(ADMIN_KEY) ?? 'null'); } catch { return null; }
  });

  const persist = (data: { token: string; admin: Admin }) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
    setToken(data.token);
    setAdmin(data.admin);
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    persist(data);
  };

  const register: AuthCtx['register'] = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persist(data);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setToken(null);
    setAdmin(null);
  };

  return <Ctx.Provider value={{ admin, token, login, register, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
};

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { count } = useCart();
  const [q, setQ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/shop', label: t('nav.shop') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/how-to-buy', label: t('nav.howToBuy') },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full px-8 sm:px-16 h-16 flex items-center justify-between gap-4">

        {/* LEFT: logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Classy Kitchen Utensils" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-bold hidden lg:block text-brand">Classy Kitchen</span>
        </Link>

        {/* CENTER: nav links */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) => `text-base font-semibold ${isActive ? 'text-brand-accent' : 'text-gray-700 hover:text-brand-accent'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT: search + cart + language + menu */}
        <div className="flex items-center gap-3">
          <form onSubmit={submit} className="relative hidden sm:block w-72 lg:w-96">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
            />
          </form>

          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-brand-accent">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <LanguageSelector />

          <button className="md:hidden p-2" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-gray-700">{l.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}


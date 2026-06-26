import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/shop', label: t('nav.shop') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Classy Kitchen Utensils" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-semibold hidden sm:block">Classy Kitchen Utensils</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-brand-accent' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-700"
            >
              {l.label}
            </NavLink>
          ))}
          <LanguageSwitcher />
        </nav>
      )}
    </header>
  );
}

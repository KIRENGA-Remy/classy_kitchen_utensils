import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Package, PlusCircle, LogOut, Store, FolderTree, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const out = () => { logout(); navigate('/admin/login'); };

  const item = (to: string, label: string, Icon: any, end = false) => (
    <NavLink to={to} end={end} onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-brand-accent text-white' : 'text-gray-300 hover:bg-white/10'}`}>
      <Icon size={18} /> {label}
    </NavLink>
  );

  const sidebar = (
    <>
      <Link to="/" className="flex items-center gap-2 font-bold mb-6"><Store size={20} /> Classy Admin</Link>
      <nav className="space-y-1 flex-1">
        {item('/admin', 'Products', Package, true)}
        {item('/admin/products/new', 'New product', PlusCircle)}
        {item('/admin/categories', 'Categories', FolderTree)}
      </nav>
      <div className="text-xs text-gray-400 mb-2 truncate">{admin?.email}</div>
      <button onClick={out} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white px-3 py-2">
        <LogOut size={18} /> Log out
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      {/* mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-brand text-white px-4 h-14">
        <Link to="/" className="flex items-center gap-2 font-bold"><Store size={18} /> Classy Admin</Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </div>

      {/* desktop sidebar */}
      <aside className="hidden md:flex w-60 bg-brand text-white flex-col p-4 shrink-0">
        {sidebar}
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-brand text-white flex flex-col p-4">
            <button onClick={() => setOpen(false)} className="self-end mb-2" aria-label="Close menu"><X /></button>
            {sidebar}
          </aside>
        </div>
      )}

      <main className="flex-1 p-4 sm:p-6 overflow-auto min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

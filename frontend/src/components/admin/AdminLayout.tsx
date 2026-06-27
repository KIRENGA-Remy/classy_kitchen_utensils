import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Package, PlusCircle, LogOut, Store } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const out = () => { logout(); navigate('/admin/login'); };

  const item = (to: string, label: string, Icon: any, end = false) => (
    <NavLink to={to} end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-brand-accent text-white' : 'text-gray-300 hover:bg-white/10'}`}>
      <Icon size={18} /> {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-60 bg-brand text-white flex flex-col p-4">
        <Link to="/" className="flex items-center gap-2 font-bold mb-6"><Store size={20} /> Classy Admin</Link>
        <nav className="space-y-1 flex-1">
          {item('/admin', 'Products', Package, true)}
          {item('/admin/products/new', 'New product', PlusCircle)}
        </nav>
        <div className="text-xs text-gray-400 mb-2 truncate">{admin?.email}</div>
        <button onClick={out} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white px-3 py-2">
          <LogOut size={18} /> Log out
        </button>
      </aside>
      <main className="flex-1 p-6 overflow-auto"><Outlet /></main>
    </div>
  );
}

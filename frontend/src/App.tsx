import { Routes, Route } from 'react-router-dom';
import StorefrontLayout from './components/StorefrontLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import HowToBuyPage from './pages/HowToBuyPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductForm from './pages/admin/AdminProductForm';

export default function App() {
  return (
    <Routes>
      {/* Storefront (with shop chrome) */}
      <Route element={<StorefrontLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/how-to-buy" element={<HowToBuyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* Admin (separate, protected) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products/new" element={<AdminProductForm />} />
          <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import api from '../../lib/api';
import { formatRwf } from '../../lib/format';

interface AdminProduct {
  id: string; slug: string; nameEn: string; priceRwf: number; stock: number;
  isActive: boolean; isFeatured: boolean;
  category?: { nameEn: string };
  images: { url: string }[];
}

export default function AdminDashboard() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => (await api.get<AdminProduct[]>('/admin/products')).data,
  });

  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/products/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-brand">Products</h1>
        <Link to="/admin/products/new" className="flex items-center gap-2 bg-brand-accent text-white font-semibold px-4 py-2 rounded-lg">
          <PlusCircle size={18} /> New product
        </Link>
      </div>

      {isLoading ? <p className="text-gray-400">…</p> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="p-3">Product</th><th className="p-3">Category</th>
                <th className="p-3">Price</th><th className="p-3">Stock</th>
                <th className="p-3">Status</th><th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]?.url ?? '/placeholder-product.jpg'} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                      <span className="font-medium">{p.nameEn}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">{p.category?.nameEn}</td>
                  <td className="p-3 font-semibold text-brand-accent">{formatRwf(p.priceRwf)}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                      {p.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/products/${p.id}/edit`} className="p-2 text-gray-500 hover:text-brand-accent"><Pencil size={16} /></Link>
                      <button onClick={() => { if (confirm(`Delete "${p.nameEn}"?`)) del.mutate(p.id); }}
                        className="p-2 text-gray-500 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

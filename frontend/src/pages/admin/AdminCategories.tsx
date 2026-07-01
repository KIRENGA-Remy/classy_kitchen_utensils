import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2, Plus, X, FolderTree, ArrowRightLeft } from 'lucide-react';
import api from '../../lib/api';

interface Cat { id: string; slug: string; nameEn: string; nameRw: string; position: number; productCount: number; }

export default function AdminCategories() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => (await api.get<Cat[]>('/admin/categories')).data,
  });

  const [editing, setEditing] = useState<Cat | null>(null);
  const [form, setForm] = useState({ nameEn: '', nameRw: '', slug: '' });
  const [error, setError] = useState('');
  const [reassign, setReassign] = useState<Cat | null>(null);
  const [target, setTarget] = useState('');

  const reset = () => { setEditing(null); setForm({ nameEn: '', nameRw: '', slug: '' }); };
  const refresh = () => qc.invalidateQueries({ queryKey: ['admin-categories'] });

  const save = useMutation({
    mutationFn: () => {
      const payload = { nameEn: form.nameEn, nameRw: form.nameRw, slug: form.slug || undefined };
      return editing ? api.put(`/admin/categories/${editing.id}`, payload) : api.post('/admin/categories', payload);
    },
    onSuccess: () => { refresh(); reset(); setError(''); },
    onError: (e: any) => setError(e.response?.data?.error ?? 'Save failed'),
  });

  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/categories/${id}`),
    onSuccess: refresh,
    onError: (e: any) => setError(e.response?.data?.error ?? 'Delete failed'),
  });

  const doReassign = useMutation({
    mutationFn: () => api.post(`/admin/categories/${reassign!.id}/reassign`, { toSlug: target }),
    onSuccess: async () => {
      if (reassign) await del.mutateAsync(reassign.id); // now empty -> delete it
      setReassign(null); setTarget(''); setError('');
      refresh();
    },
    onError: (e: any) => setError(e.response?.data?.error ?? 'Reassign failed'),
  });

  const startEdit = (c: Cat) => { setEditing(c); setForm({ nameEn: c.nameEn, nameRw: c.nameRw, slug: c.slug }); setError(''); };
  const tryDelete = (c: Cat) => {
    setError('');
    if (c.productCount > 0) { setReassign(c); setTarget(''); }
    else if (confirm(`Delete category "${c.nameEn}"?`)) del.mutate(c.id);
  };

  const field = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm';

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <FolderTree className="text-brand-accent" />
        <h1 className="text-2xl font-extrabold text-brand">Categories</h1>
      </div>

      {error && <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</p>}

      {/* add / edit */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 mb-6">
        <h2 className="font-bold text-brand mb-3">{editing ? `Edit "${editing.nameEn}"` : 'Add category'}</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <input className={field} placeholder="Name (English)" value={form.nameEn} onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))} />
          <input className={field} placeholder="Name (Kinyarwanda)" value={form.nameRw} onChange={(e) => setForm((f) => ({ ...f, nameRw: e.target.value }))} />
          <input className={field} placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={() => save.mutate()} disabled={!form.nameEn || !form.nameRw}
            className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-60">
            <Plus size={16} /> {editing ? 'Save changes' : 'Add category'}
          </button>
          {editing && <button onClick={reset} className="px-4 py-2 rounded-lg border border-gray-200 text-sm">Cancel</button>}
        </div>
      </div>

      {/* list */}
      {isLoading ? <p className="text-gray-400">Loading…</p> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr><th className="p-3">Category</th><th className="p-3">Slug</th><th className="p-3">Products</th><th className="p-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {data?.map((c) => (
                <tr key={c.id} className="border-t border-gray-100">
                  <td className="p-3"><div className="font-medium">{c.nameEn}</div><div className="text-gray-400 text-xs">{c.nameRw}</div></td>
                  <td className="p-3 text-gray-500">{c.slug}</td>
                  <td className="p-3">{c.productCount}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(c)} className="p-2 text-gray-500 hover:text-brand-accent"><Pencil size={16} /></button>
                      <button onClick={() => tryDelete(c)} className="p-2 text-gray-500 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* reassign-before-delete modal */}
      {reassign && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-brand flex items-center gap-2"><ArrowRightLeft size={18} /> Reassign products</h3>
              <button onClick={() => { setReassign(null); setError(''); }} className="text-gray-400"><X size={18} /></button>
            </div>
            <p className="text-sm text-gray-600">
              "{reassign.nameEn}" still has {reassign.productCount} product(s). Choose a category to move them to; then this
              category will be deleted.
            </p>
            <select className={`${field} mt-4`} value={target} onChange={(e) => setTarget(e.target.value)}>
              <option value="">Select target category…</option>
              {data?.filter((c) => c.id !== reassign.id).map((c) => (
                <option key={c.id} value={c.slug}>{c.nameEn}</option>
              ))}
            </select>
            <div className="flex gap-2 mt-5">
              <button disabled={!target} onClick={() => doReassign.mutate()}
                className="flex-1 bg-brand-accent text-white font-bold py-2.5 rounded-lg disabled:opacity-60">
                Move &amp; delete
              </button>
              <button onClick={() => { setReassign(null); setError(''); }} className="px-5 py-2.5 rounded-lg border border-gray-200">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

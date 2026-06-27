import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Upload, X } from 'lucide-react';
import api from '../../lib/api';

interface Cat { id: string; slug: string; nameEn: string; nameRw: string; }

const empty = {
  nameEn: '', nameRw: '', descriptionEn: '', descriptionRw: '',
  categorySlug: '', priceRwf: 0, oldPriceRwf: '' as number | '' ,
  colors: '', stock: 0, isActive: true, isFeatured: false,
};

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...empty });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => (await api.get<Cat[]>('/admin/categories')).data,
  });

  // load existing product when editing
  useEffect(() => {
    if (!isEdit) return;
    api.get(`/admin/products/${id}`).then(({ data }) => {
      setForm({
        nameEn: data.nameEn, nameRw: data.nameRw,
        descriptionEn: data.descriptionEn, descriptionRw: data.descriptionRw,
        categorySlug: data.category?.slug ?? '', priceRwf: data.priceRwf,
        oldPriceRwf: data.oldPriceRwf ?? '', colors: (data.colors ?? []).join(', '),
        stock: data.stock, isActive: data.isActive, isFeatured: data.isFeatured,
      });
      setImages((data.images ?? []).map((i: any) => i.url));
    });
  }, [id, isEdit]);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true); setError('');
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const { data } = await api.post('/uploads', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        setImages((prev) => [...prev, data.url]);
      }
    } catch {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      nameEn: form.nameEn, nameRw: form.nameRw,
      descriptionEn: form.descriptionEn, descriptionRw: form.descriptionRw,
      categorySlug: form.categorySlug,
      priceRwf: Number(form.priceRwf),
      oldPriceRwf: form.oldPriceRwf === '' ? null : Number(form.oldPriceRwf),
      colors: form.colors.split(',').map((c) => c.trim()).filter(Boolean),
      stock: Number(form.stock), isActive: form.isActive, isFeatured: form.isFeatured,
      images,
    };
    try {
      if (isEdit) await api.put(`/admin/products/${id}`, payload);
      else await api.post('/admin/products', payload);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const field = 'w-full border border-gray-200 rounded-lg px-3 py-2';

  return (
    <form onSubmit={submit} className="max-w-3xl">
      <h1 className="text-2xl font-extrabold text-brand mb-6">{isEdit ? 'Edit product' : 'New product'}</h1>
      {error && <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</p>}

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium">Name (English)</label>
            <input className={field} value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} required /></div>
          <div><label className="text-sm font-medium">Name (Kinyarwanda)</label>
            <input className={field} value={form.nameRw} onChange={(e) => set('nameRw', e.target.value)} required /></div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium">Description (EN)</label>
            <textarea className={field} rows={3} value={form.descriptionEn} onChange={(e) => set('descriptionEn', e.target.value)} /></div>
          <div><label className="text-sm font-medium">Description (RW)</label>
            <textarea className={field} rows={3} value={form.descriptionRw} onChange={(e) => set('descriptionRw', e.target.value)} /></div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="text-sm font-medium">Category</label>
            <select className={field} value={form.categorySlug} onChange={(e) => set('categorySlug', e.target.value)} required>
              <option value="">Select…</option>
              {categories?.map((c) => <option key={c.id} value={c.slug}>{c.nameEn}</option>)}
            </select></div>
          <div><label className="text-sm font-medium">Price (RWF)</label>
            <input type="number" className={field} value={form.priceRwf} onChange={(e) => set('priceRwf', e.target.value)} required /></div>
          <div><label className="text-sm font-medium">Old price (optional)</label>
            <input type="number" className={field} value={form.oldPriceRwf} onChange={(e) => set('oldPriceRwf', e.target.value)} /></div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium">Colours (comma-separated)</label>
            <input className={field} value={form.colors} onChange={(e) => set('colors', e.target.value)} placeholder="Black, Red" /></div>
          <div><label className="text-sm font-medium">Stock</label>
            <input type="number" className={field} value={form.stock} onChange={(e) => set('stock', e.target.value)} /></div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} /> Active (visible)</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} /> Featured</label>
        </div>

        {/* Images */}
        <div>
          <label className="text-sm font-medium">Images</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {images.map((url) => (
              <div key={url} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setImages((p) => p.filter((u) => u !== url))}
                  className="absolute top-0 right-0 bg-black/60 text-white rounded-bl p-0.5"><X size={12} /></button>
              </div>
            ))}
            <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:border-brand-accent">
              <Upload size={18} />
              <span className="text-[10px] mt-1">{uploading ? '…' : 'Upload'}</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onUpload(e.target.files)} />
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <button disabled={saving} className="bg-brand-accent text-white font-bold px-6 py-2.5 rounded-lg disabled:opacity-60">
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
        </button>
        <button type="button" onClick={() => navigate('/admin')} className="px-6 py-2.5 rounded-lg border border-gray-200">Cancel</button>
      </div>
    </form>
  );
}

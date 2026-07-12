import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { getBanners } from '../../services/contentService';
import api from '../../services/api';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';

const createBanner = (payload) => api.post('/admin/banners', payload);
const deleteBanner = (id) => api.delete(`/admin/banners/${id}`);

export default function Banners() {
  const { data: banners, loading, refetch } = useFetch(getBanners, []);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await createBanner(values);
      toast.success('Banner ditambahkan');
      setShowForm(false);
      reset();
      refetch();
    } catch (err) {
      toast.error('Gagal menambah banner');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus banner ini?')) return;
    await deleteBanner(id);
    toast.success('Banner dihapus');
    refetch();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kelola Banner</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2"><FiPlus /> Tambah</button>
      </div>

      {loading ? <p className="text-slate-400">Memuat...</p> : (
        <div className="grid sm:grid-cols-2 gap-6">
          {banners?.map((b) => (
            <div key={b.id} className="bg-white rounded-xl shadow-sm overflow-hidden relative">
              <img src={b.image} alt={b.title} className="w-full h-40 object-cover" />
              <button onClick={() => handleDelete(b.id)} className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-red-500"><FiTrash2 /></button>
              <div className="p-4">
                <p className="font-semibold text-slate-800">{b.title}</p>
                <p className="text-sm text-slate-500">{b.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Tambah Banner</h2>
              <button type="button" onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <input className="input" placeholder="Judul" {...register('title', { required: true })} />
            <input className="input" placeholder="Subjudul" {...register('subtitle')} />
            <input className="input" placeholder="URL Gambar" {...register('image', { required: true })} />
            <input className="input" placeholder="Teks Tombol" {...register('button')} />
            <input className="input" placeholder="Link Tombol" {...register('link')} />
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">Simpan</button>
          </form>
        </div>
      )}
    </div>
  );
}

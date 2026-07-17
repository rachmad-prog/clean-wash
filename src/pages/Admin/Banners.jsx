import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { getBanners } from '../../services/contentService';
import api from '../../services/api';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';

const createBanner = (formData) =>
  api.post('/admin/banners', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
const deleteBanner = (id) => api.delete(`/admin/banners/${id}`);

const SLOTS = [
  { value: 'hero', label: 'Hero (Banner Utama)' },
  { value: 'pickup', label: 'Ilustrasi Antar Jemput (gambar/GIF)' },
];

export default function Banners() {
  const { data: banners, loading, refetch } = useFetch(getBanners, []);
  const [showForm, setShowForm] = useState(false);
  const [fileName, setFileName] = useState('');
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title || '');
      formData.append('subtitle', values.subtitle || '');
      formData.append('button', values.button || '');
      formData.append('link', values.link || '');
      formData.append('slot', values.slot || 'hero');
      if (values.imageFile?.[0]) {
        formData.append('image', values.imageFile[0]);
      } else if (values.imageUrl) {
        formData.append('image', values.imageUrl);
      } else {
        toast.error('Isi URL gambar atau upload file');
        return;
      }
      await createBanner(formData);
      toast.success('Banner ditambahkan');
      setShowForm(false);
      setFileName('');
      reset();
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menambah banner');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus banner ini?')) return;
    await deleteBanner(id);
    toast.success('Banner dihapus');
    refetch();
  };

  const grouped = SLOTS.map((slot) => ({
    ...slot,
    items: banners?.filter((b) => (b.slot || 'hero') === slot.value) || [],
  }));

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kelola Banner</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2 justify-center"><FiPlus /> Tambah</button>
      </div>

      {loading ? <p className="text-slate-400">Memuat...</p> : (
        <div className="space-y-10">
          {grouped.map((group) => (
            <div key={group.value}>
              <h2 className="font-semibold text-slate-700 mb-3">{group.label}</h2>
              {group.items.length === 0 ? (
                <p className="text-sm text-slate-400 mb-2">
                  Belum ada. {group.value === 'pickup' && 'Kalau kosong, situs akan menampilkan animasi truk bawaan.'}
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((b) => (
                    <div key={b.id} className="bg-white rounded-xl shadow-sm overflow-hidden relative">
                      <img src={b.image} alt={b.title} className="w-full h-40 object-cover bg-slate-100" />
                      <button onClick={() => handleDelete(b.id)} className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-red-500"><FiTrash2 /></button>
                      <div className="p-4">
                        <p className="font-semibold text-slate-800">{b.title || '(tanpa judul)'}</p>
                        <p className="text-sm text-slate-500">{b.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 my-8 sm:my-0 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Tambah Banner</h2>
              <button type="button" onClick={() => setShowForm(false)}><FiX /></button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ditampilkan di</label>
              <select className="input" {...register('slot')}>
                {SLOTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            <input className="input" placeholder="Judul (opsional untuk ilustrasi antar jemput)" {...register('title')} />
            <input className="input" placeholder="Subjudul" {...register('subtitle')} />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Upload Gambar / GIF</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="input"
                {...register('imageFile', { onChange: (e) => setFileName(e.target.files?.[0]?.name || '') })}
              />
              {fileName && <p className="text-xs text-slate-500 mt-1">Terpilih: {fileName}</p>}
            </div>

            <p className="text-xs text-slate-400 text-center">— atau —</p>

            <input className="input" placeholder="URL Gambar / GIF (jika tidak upload file)" {...register('imageUrl')} />

            <input className="input" placeholder="Teks Tombol (khusus hero)" {...register('button')} />
            <input className="input" placeholder="Link Tombol (khusus hero)" {...register('link')} />

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { getTestimonials } from '../../services/contentService';
import api from '../../services/api';
import { FiPlus, FiTrash2, FiX, FiStar } from 'react-icons/fi';

const createTestimonial = (payload) => api.post('/admin/testimonials', payload);
const deleteTestimonial = (id) => api.delete(`/admin/testimonials/${id}`);

export default function Testimonials() {
  const { data: testimonials, loading, refetch } = useFetch(getTestimonials, []);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await createTestimonial(values);
      toast.success('Testimoni ditambahkan');
      setShowForm(false);
      reset();
      refetch();
    } catch (err) {
      toast.error('Gagal menambah testimoni');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus testimoni ini?')) return;
    await deleteTestimonial(id);
    toast.success('Testimoni dihapus');
    refetch();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kelola Testimoni</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2"><FiPlus /> Tambah</button>
      </div>

      {loading ? <p className="text-slate-400">Memuat...</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-sm p-5 relative">
              <button onClick={() => handleDelete(t.id)} className="absolute top-4 right-4 text-red-500"><FiTrash2 /></button>
              <p className="font-semibold text-slate-800">{t.customer}</p>
              <div className="flex text-yellow-400 text-sm my-1">
                {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} fill="currentColor" />)}
              </div>
              <p className="text-sm text-slate-600">{t.review}</p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Tambah Testimoni</h2>
              <button type="button" onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <input className="input" placeholder="Nama Pelanggan" {...register('customer', { required: true })} />
            <input type="number" min={1} max={5} className="input" placeholder="Rating (1-5)" {...register('rating', { required: true })} />
            <textarea className="input" rows={3} placeholder="Ulasan" {...register('review', { required: true })} />
            <input className="input" placeholder="URL Foto (opsional)" {...register('photo')} />
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">Simpan</button>
          </form>
        </div>
      )}
    </div>
  );
}

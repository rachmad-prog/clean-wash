import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { getFaqs } from '../../services/contentService';
import api from '../../services/api';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';

const createFaq = (payload) => api.post('/admin/faqs', payload);
const deleteFaq = (id) => api.delete(`/admin/faqs/${id}`);

export default function Faqs() {
  const { data: faqs, loading, refetch } = useFetch(getFaqs, []);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await createFaq(values);
      toast.success('FAQ ditambahkan');
      setShowForm(false);
      reset();
      refetch();
    } catch (err) {
      toast.error('Gagal menambah FAQ');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus FAQ ini?')) return;
    await deleteFaq(id);
    toast.success('FAQ dihapus');
    refetch();
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kelola FAQ</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2 justify-center"><FiPlus /> Tambah</button>
      </div>

      {loading ? <p className="text-slate-400">Memuat...</p> : (
        <div className="space-y-3">
          {faqs?.map((f) => (
            <div key={f.id} className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-800">{f.question}</p>
                <p className="text-sm text-slate-500 mt-1">{f.answer}</p>
              </div>
              <button onClick={() => handleDelete(f.id)} className="text-red-500"><FiTrash2 /></button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 my-8 sm:my-0 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Tambah FAQ</h2>
              <button type="button" onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <input className="input" placeholder="Pertanyaan" {...register('question', { required: true })} />
            <textarea className="input" rows={3} placeholder="Jawaban" {...register('answer', { required: true })} />
            <input type="number" className="input" placeholder="Urutan" {...register('order')} />
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">Simpan</button>
          </form>
        </div>
      )}
    </div>
  );
}

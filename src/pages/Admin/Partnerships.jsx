import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiEdit2, FiX, FiUsers } from 'react-icons/fi';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';

const getPartnerships = () => api.get('/admin/partnerships').then((r) => r.data.data);
const markRead = (id) => api.patch(`/admin/partnerships/${id}/read`);
const createPartnership = (payload) => api.post('/admin/partnerships', payload);
const updatePartnership = (id, payload) => api.put(`/admin/partnerships/${id}`, payload);
const deletePartnership = (id) => api.delete(`/admin/partnerships/${id}`);

export default function Partnerships() {
  const { data: partnerships, loading, error, refetch } = useFetch(getPartnerships, []);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const openAdd = () => {
    setEditing(null);
    reset({ fullname: '', phone: '', email: '', city: '', capital: '', message: '' });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    reset({
      fullname: p.fullname,
      phone: p.phone,
      email: p.email,
      city: p.city,
      capital: p.capital,
      message: p.message || '',
    });
    setShowForm(true);
  };

  const onSubmit = async (values) => {
    try {
      if (editing) {
        await updatePartnership(editing.id, values);
        toast.success('Data kemitraan diperbarui');
      } else {
        await createPartnership(values);
        toast.success('Kemitraan ditambahkan');
      }
      setShowForm(false);
      setEditing(null);
      reset();
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markRead(id);
      refetch();
    } catch (err) {
      toast.error('Gagal memperbarui status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus pengajuan kemitraan ini?')) return;
    try {
      await deletePartnership(id);
      toast.success('Data kemitraan dihapus');
      refetch();
    } catch (err) {
      toast.error('Gagal menghapus data');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Pengajuan Kemitraan</h1>
        <button onClick={openAdd} className="btn-primary text-sm py-2">
          <FiPlus /> Tambah Kemitraan
        </button>
      </div>

      {loading ? (
        <p className="text-slate-400">Memuat...</p>
      ) : error ? (
        <p className="text-red-500 bg-red-50 rounded-xl p-4">{error}</p>
      ) : !partnerships || partnerships.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center text-slate-400">
          <FiUsers className="mx-auto text-3xl mb-2" />
          <p>Belum ada pengajuan kemitraan.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {partnerships.map((p) => (
            <div key={p.id} className={`bg-white rounded-xl shadow-sm p-5 ${!p.isRead ? 'border-l-4 border-primary-500' : ''}`}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-slate-800">{p.fullname} - {p.city}</p>
                  <p className="text-sm text-slate-500">{p.email} • {p.phone}</p>
                  <p className="text-sm text-slate-500">Modal: {p.capital}</p>
                  {p.message && <p className="text-sm text-slate-600 mt-2">{p.message}</p>}
                  <p className="text-xs text-slate-400 mt-2">{formatDate(p.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!p.isRead && (
                    <button onClick={() => handleMarkRead(p.id)} className="text-xs btn-outline py-1 px-3">
                      Tandai Dibaca
                    </button>
                  )}
                  <button onClick={() => openEdit(p)} className="text-slate-500 hover:text-primary-600 p-2" title="Edit">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-slate-500 hover:text-red-500 p-2" title="Hapus">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{editing ? 'Edit Kemitraan' : 'Tambah Kemitraan'}</h2>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}><FiX /></button>
            </div>
            <input className="input" placeholder="Nama Lengkap" {...register('fullname', { required: true })} />
            <input className="input" placeholder="Nomor HP" {...register('phone', { required: true })} />
            <input type="email" className="input" placeholder="Email" {...register('email', { required: true })} />
            <input className="input" placeholder="Kota" {...register('city', { required: true })} />
            <select className="input" {...register('capital', { required: true })}>
              <option value="">-- Pilih Range Modal --</option>
              <option value="< 50 Juta">&lt; 50 Juta</option>
              <option value="50-100 Juta">50-100 Juta</option>
              <option value="> 100 Juta">&gt; 100 Juta</option>
            </select>
            <textarea className="input" rows={3} placeholder="Pesan (opsional)" {...register('message')} />
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

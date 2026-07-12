import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { getOutlets, createOutlet, updateOutlet, deleteOutlet } from '../../services/outletService';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

export default function Outlets() {
  const { data: outlets, loading, refetch } = useFetch(getOutlets, []);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const openCreate = () => { setEditing(null); reset({}); setShowForm(true); };
  const openEdit = (outlet) => { setEditing(outlet); reset(outlet); setShowForm(true); };

  const onSubmit = async (values) => {
    try {
      if (editing) {
        await updateOutlet(editing.id, values);
        toast.success('Outlet diperbarui');
      } else {
        await createOutlet(values);
        toast.success('Outlet ditambahkan');
      }
      setShowForm(false);
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan outlet');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus outlet ini?')) return;
    try {
      await deleteOutlet(id);
      toast.success('Outlet dihapus');
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menghapus outlet');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kelola Outlet</h1>
        <button onClick={openCreate} className="btn-primary text-sm py-2"><FiPlus /> Tambah Outlet</button>
      </div>

      {loading ? (
        <p className="text-slate-400">Memuat...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="p-4">Nama</th><th className="p-4">Kota</th><th className="p-4">Jam Buka</th><th className="p-4">Status</th><th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {outlets?.map((o) => (
                <tr key={o.id} className="border-t border-slate-100">
                  <td className="p-4 font-medium text-slate-800">{o.name}</td>
                  <td className="p-4">{o.city}</td>
                  <td className="p-4">{o.openTime} - {o.closeTime}</td>
                  <td className="p-4">{o.status}</td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => openEdit(o)} className="text-blue-500"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(o.id)} className="text-red-500"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 w-full max-w-lg space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{editing ? 'Edit Outlet' : 'Tambah Outlet'}</h2>
              <button type="button" onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <input className="input" placeholder="Nama Outlet" {...register('name', { required: true })} />
            <input className="input" placeholder="Kota" {...register('city', { required: true })} />
            <input className="input" placeholder="Alamat" {...register('address', { required: true })} />
            <input className="input" placeholder="Telepon" {...register('phone', { required: true })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="Jam Buka (07:00)" {...register('openTime', { required: true })} />
              <input className="input" placeholder="Jam Tutup (21:00)" {...register('closeTime', { required: true })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="Latitude" {...register('latitude')} />
              <input className="input" placeholder="Longitude" {...register('longitude')} />
            </div>
            <input className="input" placeholder="URL Gambar" {...register('image')} />
            <select className="input" {...register('status')}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="COMING_SOON">COMING_SOON</option>
            </select>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">Simpan</button>
          </form>
        </div>
      )}
    </div>
  );
}

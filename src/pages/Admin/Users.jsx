import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiEdit2, FiX, FiShield } from 'react-icons/fi';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';

const getUsers = () => api.get('/admin/users').then((r) => r.data.data);
const createUser = (payload) => api.post('/admin/users', payload);
const updateUser = (id, payload) => api.put(`/admin/users/${id}`, payload);
const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export default function Users() {
  const { admin } = useAuth();
  const { data: users, loading, error, refetch } = useFetch(getUsers, []);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const openAdd = () => {
    setEditing(null);
    reset({ name: '', email: '', password: '', role: 'ADMIN' });
    setShowForm(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    reset({ name: u.name, email: u.email, password: '', role: u.role });
    setShowForm(true);
  };

  const onSubmit = async (values) => {
    try {
      const payload = { ...values };
      if (editing && !payload.password) delete payload.password;
      if (editing) {
        await updateUser(editing.id, payload);
        toast.success('User diperbarui');
      } else {
        await createUser(payload);
        toast.success('User ditambahkan');
      }
      setShowForm(false);
      setEditing(null);
      reset();
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan user');
    }
  };

  const handleDelete = async (u) => {
    if (u.id === admin?.id) {
      toast.error('Tidak dapat menghapus akun sendiri');
      return;
    }
    if (!confirm(`Hapus user ${u.name}?`)) return;
    try {
      await deleteUser(u.id);
      toast.success('User dihapus');
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menghapus user');
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold text-slate-800">Kelola User</h1>
        <button onClick={openAdd} className="btn-primary text-sm py-2 justify-center">
          <FiPlus /> Tambah User
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        <span className="font-semibold">Owner</span> punya akses penuh termasuk Lisensi/Token & Kelola User.{' '}
        <span className="font-semibold">Admin</span> hanya bisa mengelola konten operasional (Outlet, Pesanan, Kemitraan, dll).
      </p>

      {loading ? (
        <p className="text-slate-400">Memuat...</p>
      ) : error ? (
        <p className="text-red-500 bg-red-50 rounded-xl p-4">{error}</p>
      ) : !users || users.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center text-slate-400">
          <FiShield className="mx-auto text-3xl mb-2" />
          <p>Belum ada user.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {users.map((u) => (
            <div key={u.id} className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800">
                  {u.name}{' '}
                  <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${u.role === 'OWNER' ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-600'}`}>
                    {u.role === 'OWNER' ? 'Owner' : 'Admin'}
                  </span>
                  {u.id === admin?.id && <span className="ml-2 text-xs text-slate-400">(Anda)</span>}
                </p>
                <p className="text-sm text-slate-500">{u.email}</p>
                <p className="text-xs text-slate-400 mt-1">Dibuat: {formatDate(u.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(u)} className="text-slate-500 hover:text-primary-600 p-2" title="Edit">
                  <FiEdit2 />
                </button>
                <button onClick={() => handleDelete(u)} className="text-slate-500 hover:text-red-500 p-2" title="Hapus">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 my-8 sm:my-0 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{editing ? 'Edit User' : 'Tambah User'}</h2>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}><FiX /></button>
            </div>
            <input className="input" placeholder="Nama Lengkap" {...register('name', { required: true })} />
            <input type="email" className="input" placeholder="Email" {...register('email', { required: true })} />
            <input
              type="password"
              className="input"
              placeholder={editing ? 'Password baru (opsional)' : 'Password'}
              {...register('password', { required: !editing })}
            />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <select className="input" {...register('role', { required: true })}>
                <option value="ADMIN">Admin</option>
                <option value="OWNER">Owner</option>
              </select>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { FiPlus, FiX, FiSlash } from 'react-icons/fi';

const getLicenses = () => api.get('/admin/licenses').then((r) => r.data.data);
const issueLicense = (payload) => api.post('/admin/licenses', payload);
const revokeLicense = (id) => api.patch(`/admin/licenses/${id}/revoke`);

// Default expiry: 1 year from now, formatted for <input type="datetime-local">
function defaultExpiry() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  d.setSeconds(0, 0);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function Licenses() {
  const { admin } = useAuth();
  const isOwner = admin?.role === 'OWNER';
  const { data: licenses, loading, refetch } = useFetch(getLicenses, []);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { expiresAt: defaultExpiry() },
  });

  const onSubmit = async (values) => {
    try {
      await issueLicense({ ...values, expiresAt: new Date(values.expiresAt).toISOString() });
      toast.success('License berhasil diterbitkan & dikirim via email');
      setShowForm(false);
      reset({ expiresAt: defaultExpiry() });
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menerbitkan license');
    }
  };

  const handleRevoke = async (id) => {
    if (!confirm('Cabut license ini?')) return;
    await revokeLicense(id);
    toast.success('License dicabut');
    refetch();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kelola License / Token API</h1>
        {isOwner && (
          <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2"><FiPlus /> Terbitkan License</button>
        )}
      </div>

      {loading ? <p className="text-slate-400">Memuat...</p> : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="p-4">License Key</th><th className="p-4">Pemilik</th><th className="p-4">Outlet</th><th className="p-4">Status</th><th className="p-4">Kadaluarsa</th>
                {isOwner && <th className="p-4">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {licenses?.map((l) => (
                <tr key={l.id} className="border-t border-slate-100">
                  <td className="p-4 font-mono text-xs">{l.licenseKey}</td>
                  <td className="p-4">{l.ownerName}<br /><span className="text-xs text-slate-400">{l.ownerEmail}</span></td>
                  <td className="p-4">{l.outletName || '-'}</td>
                  <td className="p-4">{l.status}</td>
                  <td className="p-4">{formatDate(l.expiresAt)}</td>
                  {isOwner && (
                    <td className="p-4">
                      {l.status === 'ACTIVE' && (
                        <button onClick={() => handleRevoke(l.id)} className="text-red-500"><FiSlash /></button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && isOwner && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Terbitkan License Baru</h2>
              <button type="button" onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <input className="input" placeholder="Nama Pemilik/Mitra" {...register('ownerName', { required: true })} />
            <input type="email" className="input" placeholder="Email Pemilik" {...register('ownerEmail', { required: true })} />
            <input className="input" placeholder="Nama Outlet (opsional)" {...register('outletName')} />
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Masa Berlaku Sampai (tanggal & jam)</label>
              <input
                type="datetime-local"
                className="input"
                {...register('expiresAt', { required: true })}
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">Terbitkan</button>
          </form>
        </div>
      )}
    </div>
  );
}

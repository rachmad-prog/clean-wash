import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { FiPlus, FiX, FiSlash, FiCopy, FiCheck } from 'react-icons/fi';

const getLicenses = () => api.get('/admin/licenses').then((r) => r.data.data);
const issueLicense = (payload) => api.post('/admin/licenses', payload).then((r) => r.data.data);
const revokeLicense = (id) => api.patch(`/admin/licenses/${id}/revoke`);

// Default expiry: 1 year from now, formatted for <input type="datetime-local">
function defaultExpiry() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  d.setSeconds(0, 0);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} disalin`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error('Gagal menyalin, salin manual ya');
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <div className="flex items-stretch gap-2">
        <div className="input font-mono text-xs break-all flex-1 select-all">{value}</div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 px-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          title={`Salin ${label}`}
        >
          {copied ? <FiCheck /> : <FiCopy />}
        </button>
      </div>
    </div>
  );
}

export default function Licenses() {
  const { admin } = useAuth();
  const isOwner = admin?.role === 'OWNER';
  const { data: licenses, loading, refetch } = useFetch(getLicenses, []);
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState(null); // holds generated { licenseKey, token, expiresAt } after issuing
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { expiresAt: defaultExpiry() },
  });

  const openForm = () => {
    setResult(null);
    reset({ expiresAt: defaultExpiry() });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setResult(null);
    refetch();
  };

  const onSubmit = async (values) => {
    try {
      const data = await issueLicense({ expiresAt: new Date(values.expiresAt).toISOString() });
      setResult(data);
      toast.success('License berhasil diterbitkan');
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
          <button onClick={openForm} className="btn-primary text-sm py-2"><FiPlus /> Terbitkan License</button>
        )}
      </div>

      {loading ? <p className="text-slate-400">Memuat...</p> : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="p-4">License Key</th><th className="p-4">Status</th><th className="p-4">Kadaluarsa</th>
                {isOwner && <th className="p-4">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {licenses?.map((l) => (
                <tr key={l.id} className="border-t border-slate-100">
                  <td className="p-4 font-mono text-xs">{l.licenseKey}</td>
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Terbitkan License Baru</h2>
              <button type="button" onClick={closeForm}><FiX /></button>
            </div>

            {!result ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Masa Berlaku Sampai (tanggal & jam)</label>
                  <input
                    type="datetime-local"
                    className="input"
                    {...register('expiresAt', { required: true })}
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                  {isSubmitting ? 'Membuat token...' : 'Terbitkan'}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-500">
                  Salin License Key dan Token di bawah ini sekarang untuk dikirim ke pengguna terkait.
                </p>
                <CopyField label="License Key" value={result.licenseKey} />
                <CopyField label="Token" value={result.token} />
                <p className="text-xs text-slate-400">Berlaku sampai: {formatDate(result.expiresAt)}</p>
                <button type="button" onClick={closeForm} className="btn-primary w-full">Selesai</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

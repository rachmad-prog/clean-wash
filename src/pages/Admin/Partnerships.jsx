import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';

const getPartnerships = () => api.get('/admin/partnerships').then((r) => r.data.data);
const markRead = (id) => api.patch(`/admin/partnerships/${id}/read`);

export default function Partnerships() {
  const { data: partnerships, loading, refetch } = useFetch(getPartnerships, []);

  const handleMarkRead = async (id) => {
    try {
      await markRead(id);
      refetch();
    } catch (err) {
      toast.error('Gagal memperbarui status');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Pengajuan Kemitraan</h1>
      {loading ? (
        <p className="text-slate-400">Memuat...</p>
      ) : (
        <div className="grid gap-4">
          {partnerships?.map((p) => (
            <div key={p.id} className={`bg-white rounded-xl shadow-sm p-5 ${!p.isRead ? 'border-l-4 border-primary-500' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-slate-800">{p.fullname} - {p.city}</p>
                  <p className="text-sm text-slate-500">{p.email} • {p.phone}</p>
                  <p className="text-sm text-slate-500">Modal: {p.capital}</p>
                  {p.message && <p className="text-sm text-slate-600 mt-2">{p.message}</p>}
                  <p className="text-xs text-slate-400 mt-2">{formatDate(p.createdAt)}</p>
                </div>
                {!p.isRead && (
                  <button onClick={() => handleMarkRead(p.id)} className="text-xs btn-outline py-1 px-3">
                    Tandai Dibaca
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

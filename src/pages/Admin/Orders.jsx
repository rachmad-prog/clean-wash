import { useState } from 'react';
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { getAdminOrders, updateOrderStatus } from '../../services/orderService';
import { formatDate } from '../../utils/formatDate';
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from '../../utils/statusMap';

const STATUSES = Object.keys(ORDER_STATUS_LABEL);

export default function Orders() {
  const [status, setStatus] = useState('');
  const { data, loading, refetch } = useFetch(() => getAdminOrders({ status: status || undefined }), [status]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      toast.success('Status pesanan diperbarui');
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal memperbarui status');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kelola Pesanan</h1>
        <select className="input w-56" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Semua Status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-slate-400">Memuat...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="p-4">Invoice</th><th className="p-4">Pelanggan</th><th className="p-4">Outlet</th><th className="p-4">Layanan</th><th className="p-4">Jadwal</th><th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((o) => (
                <tr key={o.id} className="border-t border-slate-100">
                  <td className="p-4 font-medium text-slate-800">{o.invoice}</td>
                  <td className="p-4">{o.customerName}<br /><span className="text-xs text-slate-400">{o.phone}</span></td>
                  <td className="p-4">{o.outlet?.name}</td>
                  <td className="p-4">{o.service?.name}</td>
                  <td className="p-4">{formatDate(o.pickupTime)}</td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${ORDER_STATUS_COLOR[o.status]}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import TrackingForm from '../../components/TrackingForm';
import { trackOrder } from '../../services/orderService';
import { formatDate } from '../../utils/formatDate';
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from '../../utils/statusMap';

export default function Tracking() {
  const [searchParams] = useSearchParams();
  const invoiceParam = searchParams.get('invoice');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (invoiceParam) {
      setLoading(true);
      trackOrder(invoiceParam)
        .then(setOrder)
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Pesanan tidak ditemukan');
          setOrder(null);
        })
        .finally(() => setLoading(false));
    }
  }, [invoiceParam]);

  return (
    <div>
      <div className="bg-primary-50 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Lacak Pesanan</h1>
        <p className="text-slate-500 mt-3">Masukkan nomor invoice untuk melihat status pesanan Anda</p>
      </div>

      <section className="section max-w-2xl">
        <TrackingForm />

        {loading && <p className="text-center text-slate-400 mt-8">Mencari pesanan...</p>}

        {order && (
          <div className="mt-10 card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-slate-400">No. Invoice</p>
                <p className="font-bold text-slate-800">{order.invoice}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${ORDER_STATUS_COLOR[order.status]}`}>
                {ORDER_STATUS_LABEL[order.status]}
              </span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p><strong>Nama:</strong> {order.customerName}</p>
              <p><strong>Layanan:</strong> {order.service?.name}</p>
              <p><strong>Outlet:</strong> {order.outlet?.name}</p>
              <p><strong>Waktu Jemput:</strong> {formatDate(order.pickupTime)}</p>
              {order.finishTime && <p><strong>Selesai:</strong> {formatDate(order.finishTime)}</p>}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

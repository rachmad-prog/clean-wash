import { useFetch } from '../../hooks/useFetch';
import { getDashboardStats } from '../../services/authService';
import { formatCurrency } from '../../utils/formatCurrency';
import { FiMapPin, FiPackage, FiUsers, FiDollarSign, FiClock, FiMail } from 'react-icons/fi';

const CARD_STYLE = 'bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4';

export default function Dashboard() {
  const { data: stats, loading } = useFetch(getDashboardStats, []);

  const cards = [
    { label: 'Total Outlet', value: stats?.totalOutlets, icon: FiMapPin, color: 'bg-blue-500' },
    { label: 'Total Pesanan', value: stats?.totalOrders, icon: FiPackage, color: 'bg-indigo-500' },
    { label: 'Pesanan Aktif', value: stats?.pendingOrders, icon: FiClock, color: 'bg-yellow-500' },
    { label: 'Total Pelanggan', value: stats?.totalCustomers, icon: FiUsers, color: 'bg-teal-500' },
    { label: 'Pengajuan Belum Dibaca', value: stats?.unreadPartnerships, icon: FiMail, color: 'bg-pink-500' },
    { label: 'Total Pendapatan', value: formatCurrency(stats?.totalRevenue || 0), icon: FiDollarSign, color: 'bg-green-500' },
  ];

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>
      {loading ? (
        <p className="text-slate-400">Memuat statistik...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.label} className={CARD_STYLE}>
              <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center text-xl ${c.color}`}>
                <c.icon />
              </div>
              <div>
                <p className="text-sm text-slate-500">{c.label}</p>
                <p className="text-xl font-bold text-slate-800">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

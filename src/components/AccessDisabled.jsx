import { FiShield, FiClock } from 'react-icons/fi';

function formatExpiry(dateStr) {
  if (!dateStr) return null;
  const formatted = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(dateStr));
  return formatted.replace(' pukul ', ', ');
}

export default function AccessDisabled({ expiresAt }) {
  return (
    <div className="min-h-screen bg-[#0f2e28] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-6 text-2xl">
          <FiShield />
        </div>
        <span className="text-xs font-bold tracking-widest text-orange-500">AKSES DINONAKTIFKAN</span>
        <h1 className="font-display text-3xl font-bold text-ink mt-3 mb-4 leading-snug">
          Situs ini sedang tidak dapat diakses
        </h1>
        <p className="text-slate-500 mb-6">
          Masa aktif situs telah berakhir. Silakan hubungi administrator untuk memperbarui masa aktif
          agar situs dapat diakses kembali.
        </p>
        {expiresAt && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <FiClock />
            <span>Berakhir pada {formatExpiry(expiresAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

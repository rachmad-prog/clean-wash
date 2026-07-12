import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="section text-center py-32">
      <h1 className="text-7xl font-extrabold text-primary-500 mb-4">404</h1>
      <p className="text-slate-600 mb-8">Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="btn-primary">Kembali ke Beranda</Link>
    </div>
  );
}

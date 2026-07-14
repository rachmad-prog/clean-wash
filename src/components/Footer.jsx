import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl font-bold text-primary-600 mb-3">
            Clean<span className="text-ink">Wash</span>
          </h3>
          <p className="text-sm text-slate-500">
            Layanan laundry kiloan, express, dan cuci sepatu terpercaya dengan puluhan outlet di berbagai kota.
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <span className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center"><FiInstagram /></span>
            <span className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center"><FiFacebook /></span>
            <span className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center"><FiTwitter /></span>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-ink mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link to="/tentang" className="hover:text-primary-600">Tentang Kami</Link></li>
            <li><Link to="/layanan" className="hover:text-primary-600">Layanan</Link></li>
            <li><Link to="/outlet" className="hover:text-primary-600">Cari Outlet</Link></li>
            <li><Link to="/partnership" className="hover:text-primary-600">Kemitraan</Link></li>
            <li><Link to="/terms" className="hover:text-primary-600">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-ink mb-3">Layanan</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link to="/tracking" className="hover:text-primary-600">Lacak Pesanan</Link></li>
            <li><Link to="/jadwal-penjemputan" className="hover:text-primary-600">Jadwal Penjemputan</Link></li>
            <li><Link to="/testimoni" className="hover:text-primary-600">Testimoni</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-ink mb-3">Kontak</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="flex items-center gap-2"><FiMapPin className="text-primary-600" /> Jl. Pajajaran No.10, Bogor</li>
            <li className="flex items-center gap-2"><FiPhone className="text-primary-600" /> 0812-3456-7890</li>
            <li className="flex items-center gap-2"><FiMail className="text-primary-600" /> hello@cleanwash.id</li>
          </ul>
        </div>
      </div>
      <div className="bg-primary-600 text-white py-4 text-center text-xs flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span>© {new Date().getFullYear()} CleanWash Laundry. All rights reserved.</span>
        <span className="hidden sm:inline opacity-60">·</span>
        <Link to="/admin/login" className="hover:text-primary-100 transition-colors underline underline-offset-2">Login Admin</Link>
      </div>
    </footer>
  );
}

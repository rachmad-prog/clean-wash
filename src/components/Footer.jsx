import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-extrabold text-white mb-3">CleanWash</h3>
          <p className="text-sm text-slate-400">
            Layanan laundry kiloan, express, dan cuci sepatu terpercaya dengan puluhan outlet di berbagai kota.
          </p>
          <div className="flex gap-4 mt-4 text-lg">
            <FiInstagram /> <FiFacebook /> <FiTwitter />
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tentang" className="hover:text-white">Tentang Kami</Link></li>
            <li><Link to="/layanan" className="hover:text-white">Layanan</Link></li>
            <li><Link to="/outlet" className="hover:text-white">Cari Outlet</Link></li>
            <li><Link to="/partnership" className="hover:text-white">Kemitraan</Link></li>
            <li><Link to="/terms" className="hover:text-white">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Layanan</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tracking" className="hover:text-white">Lacak Pesanan</Link></li>
            <li><Link to="/jadwal-penjemputan" className="hover:text-white">Jadwal Penjemputan</Link></li>
            <li><Link to="/testimoni" className="hover:text-white">Testimoni</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Kontak</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><FiMapPin /> Jl. Pajajaran No.10, Bogor</li>
            <li className="flex items-center gap-2"><FiPhone /> 0812-3456-7890</li>
            <li className="flex items-center gap-2"><FiMail /> hello@cleanwash.id</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} CleanWash Laundry. All rights reserved.
      </div>
    </footer>
  );
}

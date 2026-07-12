import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/layanan', label: 'Layanan' },
  { to: '/outlet', label: 'Outlet' },
  { to: '/partnership', label: 'Kemitraan' },
  { to: '/tracking', label: 'Lacak Pesanan' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-extrabold text-primary-600">
          Clean<span className="text-slate-800">Wash</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/jadwal-penjemputan" className="btn-primary text-sm px-5 py-2">
            Jadwalkan Jemput
          </Link>
        </nav>

        <button className="md:hidden text-2xl text-slate-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-slate-700 font-medium">
              {link.label}
            </NavLink>
          ))}
          <Link to="/jadwal-penjemputan" onClick={() => setOpen(false)} className="btn-primary text-center">
            Jadwalkan Jemput
          </Link>
        </div>
      )}
    </header>
  );
}

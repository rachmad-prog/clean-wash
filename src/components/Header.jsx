import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiLock, FiCalendar } from 'react-icons/fi';

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-2xl font-bold text-primary-600 leading-none">
          Clean<span className="text-ink">Wash</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-700' : 'text-slate-600 hover:text-primary-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/admin/login"
            title="Login Admin"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-primary-600 transition-colors"
          >
            <FiLock className="text-base" />
          </Link>
          <Link to="/jadwal-penjemputan" className="btn-primary text-sm px-5 py-2.5">
            <FiCalendar /> Jadwalkan Jemput
          </Link>
        </nav>

        <button className="md:hidden text-2xl text-primary-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-primary-100 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-slate-700 font-medium">
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/admin/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-slate-500 font-medium"
          >
            <FiLock /> Login Admin
          </Link>
          <Link to="/jadwal-penjemputan" onClick={() => setOpen(false)} className="btn-primary text-center">
            Jadwalkan Jemput
          </Link>
        </div>
      )}
    </header>
  );
}

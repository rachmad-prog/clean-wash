import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiMapPin, FiPackage, FiUsers, FiStar, FiHelpCircle, FiImage, FiKey, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const MENU = [
  { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/admin/outlets', label: 'Outlet', icon: FiMapPin },
  { to: '/admin/orders', label: 'Pesanan', icon: FiPackage },
  { to: '/admin/partnerships', label: 'Kemitraan', icon: FiUsers },
  { to: '/admin/testimonials', label: 'Testimoni', icon: FiStar },
  { to: '/admin/faqs', label: 'FAQ', icon: FiHelpCircle },
  { to: '/admin/banners', label: 'Banner', icon: FiImage },
  { to: '/admin/licenses', label: 'Lisensi', icon: FiKey, roles: ['OWNER'] },
  { to: '/admin/users', label: 'Kelola User', icon: FiSettings, roles: ['OWNER'] },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const visibleMenu = MENU.filter((item) => !item.roles || item.roles.includes(admin?.role));

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <span className="text-xl font-extrabold text-white">
            CleanWash <span className="text-primary-400">Admin</span>
          </span>
          <button
            className="md:hidden text-xl text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup menu"
          >
            <FiX />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {visibleMenu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-500 text-white' : 'hover:bg-slate-800'
                }`
              }
            >
              <item.icon /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 px-3 mb-2">{admin?.name} ({admin?.role})</p>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full hover:bg-slate-800">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto">
        <header className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 h-14 flex items-center gap-3">
          <button
            className="text-2xl text-slate-700"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka menu"
          >
            <FiMenu />
          </button>
          <span className="font-bold text-slate-800">CleanWash Admin</span>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

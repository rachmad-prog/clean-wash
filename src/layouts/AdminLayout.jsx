import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiMapPin, FiPackage, FiUsers, FiStar, FiHelpCircle, FiImage, FiKey, FiLogOut } from 'react-icons/fi';
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
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const visibleMenu = MENU.filter((item) => !item.roles || item.roles.includes(admin?.role));

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="px-6 py-5 text-xl font-extrabold text-white border-b border-slate-800">
          CleanWash <span className="text-primary-400">Admin</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {visibleMenu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
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
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

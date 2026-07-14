import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';

import Home from './pages/Home';
import Tentang from './pages/Tentang';
import Layanan from './pages/Layanan';
import JadwalPenjemputan from './pages/JadwalPenjemputan';
import Testimoni from './pages/Testimoni';
import Outlet from './pages/Outlet';
import OutletDetail from './pages/OutletDetail';
import Partnership from './pages/Partnership';
import Tracking from './pages/Tracking';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminOutlets from './pages/Admin/Outlets';
import AdminOrders from './pages/Admin/Orders';
import AdminPartnerships from './pages/Admin/Partnerships';
import AdminTestimonials from './pages/Admin/Testimonials';
import AdminFaqs from './pages/Admin/Faqs';
import AdminBanners from './pages/Admin/Banners';
import AdminLicenses from './pages/Admin/Licenses';
import AdminUsers from './pages/Admin/Users';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/jadwal-penjemputan" element={<JadwalPenjemputan />} />
        <Route path="/testimoni" element={<Testimoni />} />
        <Route path="/outlet" element={<Outlet />} />
        <Route path="/outlet/:slug" element={<OutletDetail />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin dashboard (protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="outlets" element={<AdminOutlets />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="partnerships" element={<AdminPartnerships />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="faqs" element={<AdminFaqs />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route
          path="licenses"
          element={
            <ProtectedRoute roles={['OWNER']}>
              <AdminLicenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute roles={['OWNER']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

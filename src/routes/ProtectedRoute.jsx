import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, admin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  if (roles && !roles.includes(admin?.role)) return <Navigate to="/admin" replace />;
  return children;
}

import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
  const { admin, accessToken, setAuth, logout } = useAuthStore();
  return { admin, isAuthenticated: !!accessToken, setAuth, logout };
}

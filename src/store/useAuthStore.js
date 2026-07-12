import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      admin: null,
      accessToken: null,
      refreshToken: null,
      setAuth: ({ admin, accessToken, refreshToken }) => set({ admin, accessToken, refreshToken }),
      setAccessToken: (accessToken) => set({ accessToken }),
      logout: () => set({ admin: null, accessToken: null, refreshToken: null }),
    }),
    { name: 'laundry-admin-auth' }
  )
);

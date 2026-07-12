import api from './api';

export const adminLogin = (payload) => api.post('/admin/auth/login', payload).then((r) => r.data.data);
export const getMe = () => api.get('/admin/auth/me').then((r) => r.data.data);
export const getDashboardStats = () => api.get('/admin/dashboard/stats').then((r) => r.data.data);

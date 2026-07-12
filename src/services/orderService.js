import api from './api';

export const createOrder = (payload) => api.post('/orders', payload).then((r) => r.data.data);
export const trackOrder = (invoice) => api.get(`/orders/${invoice}`).then((r) => r.data.data);
export const getAdminOrders = (params) => api.get('/admin/orders', { params }).then((r) => r.data);
export const updateOrderStatus = (id, status) => api.patch(`/admin/orders/${id}/status`, { status }).then((r) => r.data.data);

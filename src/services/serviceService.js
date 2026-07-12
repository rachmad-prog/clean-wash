import api from './api';

export const getServices = (params) => api.get('/services', { params }).then((r) => r.data.data);
export const createService = (payload) => api.post('/admin/services', payload).then((r) => r.data.data);
export const updateService = (id, payload) => api.put(`/admin/services/${id}`, payload).then((r) => r.data.data);
export const deleteService = (id) => api.delete(`/admin/services/${id}`).then((r) => r.data);

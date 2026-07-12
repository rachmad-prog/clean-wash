import api from './api';

export const getOutlets = (params) => api.get('/outlets', { params }).then((r) => r.data.data);
export const getOutletBySlug = (slug) => api.get(`/outlets/${slug}`).then((r) => r.data.data);
export const createOutlet = (payload) => api.post('/admin/outlets', payload).then((r) => r.data.data);
export const updateOutlet = (id, payload) => api.put(`/admin/outlets/${id}`, payload).then((r) => r.data.data);
export const deleteOutlet = (id) => api.delete(`/admin/outlets/${id}`).then((r) => r.data);

import api from './api';

export const getTestimonials = () => api.get('/testimonials').then((r) => r.data.data);
export const getFaqs = () => api.get('/faqs').then((r) => r.data.data);
export const getBanners = (params) => api.get('/banner', { params }).then((r) => r.data.data);
export const createPartnership = (payload) => api.post('/partnership', payload).then((r) => r.data.data);
export const getSiteStatus = () => api.get('/licenses/status').then((r) => r.data.data);

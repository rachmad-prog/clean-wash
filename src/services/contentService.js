import api from './api';

export const getTestimonials = () => api.get('/testimonials').then((r) => r.data.data);
export const getFaqs = () => api.get('/faqs').then((r) => r.data.data);
export const getBanners = () => api.get('/banner').then((r) => r.data.data);
export const createPartnership = (payload) => api.post('/partnership', payload).then((r) => r.data.data);

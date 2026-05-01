import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('tasfin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('tasfin_token');
      localStorage.removeItem('tasfin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const bookingsApi = {
  list: (params?: Record<string, string>) =>
    api.get('/bookings', { params }),
  get: (id: string) => api.get(`/bookings/${id}`),
  create: (data: Record<string, unknown>) => api.post('/bookings', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/bookings/${id}`, data),
  delete: (id: string) => api.delete(`/bookings/${id}`),
};

export const servicesApi = {
  list: () => api.get('/services'),
  create: (data: Record<string, unknown>) => api.post('/services', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

export const testimonialsApi = {
  list: () => api.get('/testimonials'),
  create: (data: Record<string, unknown>) => api.post('/testimonials', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete(`/testimonials/${id}`),
};

export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data: Record<string, unknown>) => api.put('/settings', data),
};

export const portfolioApi = {
  list: () => api.get('/portfolio'),
  create: (data: Record<string, unknown>) => api.post('/portfolio', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/portfolio/${id}`, data),
  delete: (id: string) => api.delete(`/portfolio/${id}`),
};

export const reelApi = {
  get: () => api.get('/reel'),
  update: (data: Record<string, unknown>) => api.put('/reel', data),
};

export const faqApi = {
  list: () => api.get('/faq'),
  create: (data: Record<string, unknown>) => api.post('/faq', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/faq/${id}`, data),
  delete: (id: string) => api.delete(`/faq/${id}`),
};

export const dashboardApi = {
  stats: () => api.get('/dashboard/stats'),
  chart: (days = 30) => api.get(`/dashboard/chart?days=${days}`),
};

export const usersApi = {
  list: () => api.get('/users'),
  create: (data: Record<string, unknown>) => api.post('/users', data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

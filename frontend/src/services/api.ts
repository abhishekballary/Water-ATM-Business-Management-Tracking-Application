import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export const authApi = {
  login: (payload: { username: string; password: string }) => api.post('/auth/login', payload)
};

export const customerApi = {
  list: (search = '') => api.get(`/customers?search=${encodeURIComponent(search)}`),
  create: (payload: unknown) => api.post('/customers', payload),
  update: (id: string, payload: unknown) => api.put(`/customers/${id}`, payload),
  remove: (id: string) => api.delete(`/customers/${id}`)
};

export const rechargeApi = {
  list: (params: Record<string, string> = {}) => api.get('/recharges', { params }),
  create: (payload: unknown) => api.post('/recharges', payload)
};

export const reportApi = {
  list: () => api.get('/reports'),
  create: (payload: unknown) => api.post('/reports', payload),
  update: (id: string, payload: unknown) => api.put(`/reports/${id}`, payload),
  monthly: (year: number, month: number) => api.get(`/reports/monthly?year=${year}&month=${month}`)
};

export const dashboardApi = {
  summary: () => api.get('/dashboard/summary'),
  analytics: () => api.get('/dashboard/analytics')
};

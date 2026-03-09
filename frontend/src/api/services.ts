import api from './client';

export const login = (payload: { username: string; password: string }) => api.post('/auth/login', payload);
export const fetchSummary = () => api.get('/dashboard/summary');
export const fetchAnalytics = () => api.get('/dashboard/analytics');
export const fetchCustomers = (search = '') => api.get(`/customers?search=${search}`);
export const fetchRecharges = () => api.get('/recharges');
export const fetchReports = () => api.get('/reports');
export const fetchMonthlyReport = (year: number, month: number) => api.get(`/reports/monthly?year=${year}&month=${month}`);

import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  // language for localized responses
  config.params = { ...config.params, lang: i18n.language?.startsWith('rw') ? 'rw' : 'en' };
  // admin token, if present
  const token = localStorage.getItem('cku_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

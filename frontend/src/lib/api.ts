import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api',
});

// Send the active language so the API returns localized text.
api.interceptors.request.use((config) => {
  config.params = { ...config.params, lang: i18n.language?.startsWith('rw') ? 'rw' : 'en' };
  return config;
});

export default api;

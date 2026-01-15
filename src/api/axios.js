import axios from 'axios';
import { getCookie } from './cookies';

export const backendUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8000';
    }
  }
  return 'https://server-kl7c.onrender.com';
};

const api = axios.create({
  baseURL: backendUrl(),
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add Telegram initData as fallback authentication
    if (window.Telegram?.WebApp?.initData) {
      config.headers['X-Telegram-Init-Data'] = window.Telegram.WebApp.initData;
    }
    
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    try {
      console.log('[api] response', {
        url: response.config?.url,
        status: response.status,
        data: response.data,
      });
    } catch (e) {}
    return response.data;
  },
  (error) => {
    try {
      console.error('[api] response error', {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
        responseData: error.response?.data,
        request: error.request,
      });
    } catch (e) {}
    return Promise.reject(error?.response?.data || error);
  },
);

export default api;

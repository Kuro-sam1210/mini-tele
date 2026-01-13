/**
 * API Services Index
 * Central export for all API services
 */

// Import all API services
import authApi from './auth';
import walletApi from './wallet';
import api from './axios';
import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from './config';

// Health check function
export const healthCheck = async () => {
  try {
    console.log('📡 API: Health check');
    const response = await api.get('/health');
    console.log('✅ API: Health check successful');
    return response;
  } catch (error) {
    console.error('❌ API Error - Health check:', error);
    throw error;
  }
};

// Export individual services
export { authApi, walletApi };

// Export configuration
export { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS };

// Export axios instance for custom requests
export { api };

// Default export with all services
export default {
  auth: authApi,
  wallet: walletApi,
  healthCheck,
  api
};
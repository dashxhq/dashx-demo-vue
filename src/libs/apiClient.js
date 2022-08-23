import axios from 'axios';
import { LOCAL_STORAGE_JWT_TOKEN } from '@/utils/constants';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const jwtToken = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN);
  if (jwtToken) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`;
  }

  return config;
});

export default apiClient;

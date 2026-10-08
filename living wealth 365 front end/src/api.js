import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
});

export const fetchHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

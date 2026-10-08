import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const fetchServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

export const submitConsultation = async (data) => {
  const response = await api.post('/consultations', data);
  return response.data;
};

export const fetchConsultations = async () => {
  const response = await api.get('/consultations');
  return response.data;
};

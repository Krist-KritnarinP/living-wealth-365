import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
});

// Interceptor สำหรับใส่ JWT Token อัตโนมัติในทุก Request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lw365_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Health check
export const fetchHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

// 🔐 Authentication APIs
export const authApi = {
  register: (data) => api.post('/auth/register', data).then((res) => res.data),
  login: (data) => api.post('/auth/login', data).then((res) => res.data),
  getMe: () => api.get('/auth/me').then((res) => res.data),
  updateProfile: (data) => api.patch('/auth/profile', data).then((res) => res.data),
  logout: () => api.post('/auth/logout').then((res) => res.data),
};

// 📋 Insurance Plans APIs (แผนประกันภัยและการเงิน)
export const insurancePlansApi = {
  getAll: (params) => api.get('/insurance-plans', { params }).then((res) => res.data.plans),
  getBySlug: (slug) => api.get(`/insurance-plans/${slug}`).then((res) => res.data.plan),
  create: (data) => api.post('/insurance-plans', data).then((res) => res.data.plan),
  update: (id, data) => api.patch(`/insurance-plans/${id}`, data).then((res) => res.data.plan),
  delete: (id) => api.delete(`/insurance-plans/${id}`).then((res) => res.data),
};

// 🤝 Leads APIs
export const leadsApi = {
  create: (data) => api.post('/leads', data).then((res) => res.data.lead),
  getAll: (params) => api.get('/leads', { params }).then((res) => res.data.leads),
  updateStatus: (id, data) => api.patch(`/leads/${id}`, data).then((res) => res.data.lead),
};

// 📰 Blog Posts APIs
export const postsApi = {
  getAll: () => api.get('/posts').then((res) => res.data.posts),
  getBySlug: (slug) => api.get(`/posts/${slug}`).then((res) => res.data.post),
  create: (data) => api.post('/posts', data).then((res) => res.data.post),
  update: (id, data) => api.patch(`/posts/${id}`, data).then((res) => res.data.post),
  delete: (id) => api.delete(`/posts/${id}`).then((res) => res.data),
};

// 💎 Products / Mu-Tae-Lu APIs
export const productsApi = {
  getAll: () => api.get('/products').then((res) => res.data.products),
  getById: (id) => api.get(`/products/${id}`).then((res) => res.data.product),
  create: (data) => api.post('/products', data).then((res) => res.data.product),
  update: (id, data) => api.patch(`/products/${id}`, data).then((res) => res.data.product),
  delete: (id) => api.delete(`/products/${id}`).then((res) => res.data),
};

// 💖 Wishlist APIs
export const wishlistApi = {
  getAll: () => api.get('/wishlist').then((res) => res.data),
  toggle: (productId) => api.post(`/wishlist/${productId}`).then((res) => res.data),
  delete: (productId) => api.delete(`/wishlist/${productId}`).then((res) => res.data),
};

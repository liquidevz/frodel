import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
};

// Product APIs
export const productAPI = {
  // GET /api/products - Get all active products
  getAll: () => api.get('/products'),
  
  // GET /api/products/{slug} - Get single product by slug
  getBySlug: (slug) => api.get(`/products/${slug}`),
  
  // POST /api/products - Create new product (admin only)
  create: (data) => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return api.post('/products', data, config);
  },
  
  // PUT /api/products/{slug} - Update product (admin only)
  update: (slug, data) => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return api.put(`/products/${slug}`, data, config);
  },
  
  // DELETE /api/products/{slug} - Delete product (admin only)
  delete: (slug) => api.delete(`/products/${slug}`),
};

// Enquiry APIs
export const enquiryAPI = {
  // GET /api/enquiries - Get all enquiries (admin only)
  getAll: () => api.get('/enquiries'),
  
  // GET /api/enquiries/{slug} - Get single enquiry (admin only)
  getBySlug: (slug) => api.get(`/enquiries/${slug}`),
  
  // POST /api/enquiries - Create new enquiry (public)
  create: (data) => api.post('/enquiries', data),
  
  // PUT /api/enquiries/{slug} - Update enquiry status (admin only)
  update: (slug, data) => api.put(`/enquiries/${slug}`, data),
  
  // POST /api/enquiries/{slug}/reply - Reply to enquiry via email (admin only)
  reply: (slug, data) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.post(`/enquiries/${slug}/reply`, data, config);
  },
  
  // DELETE /api/enquiries/{slug} - Delete enquiry (admin only)
  delete: (slug) => api.delete(`/enquiries/${slug}`),
};

// User APIs - Removed (admin only backend)

// Testimonial APIs
export const testimonialAPI = {
  // GET /api/testimonials - Get all active testimonials
  getAll: () => api.get('/testimonials'),
  
  // GET /api/testimonials/{id} - Get single testimonial
  getById: (id) => api.get(`/testimonials/${id}`),
  
  // POST /api/testimonials - Create testimonial (admin only)
  create: (data) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.post('/testimonials', data, config);
  },
  
  // PUT /api/testimonials/{id} - Update testimonial (admin only)
  update: (id, data) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.put(`/testimonials/${id}`, data, config);
  },
  
  // DELETE /api/testimonials/{id} - Delete testimonial (admin only)
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// Category APIs
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
  create: (data) => api.post('/categories', data),
  update: (slug, data) => api.put(`/categories/${slug}`, data),
  delete: (slug) => api.delete(`/categories/${slug}`),
};

export default api;

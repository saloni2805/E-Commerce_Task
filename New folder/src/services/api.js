import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  // Get all products with pagination
  getAllProducts: (limit = 20, offset = 0) => 
    api.get(`/products?limit=${limit}&offset=${offset}`),
  
  // Get product by ID
  getProductById: (id) => 
    api.get(`/products/${id}`),
  
  // Get products by category
  getProductsByCategory: (categoryId, limit = 20, offset = 0) => 
    api.get(`/categories/${categoryId}/products?limit=${limit}&offset=${offset}`),
  
  // Search products
  searchProducts: (title) => 
    api.get(`/products/?title=${title}`),
  
  // Get products with price range
  getProductsByPriceRange: (minPrice, maxPrice) => 
    api.get(`/products/?price_min=${minPrice}&price_max=${maxPrice}`),
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAllCategories: () => 
    api.get('/categories'),
  
  // Get category by ID
  getCategoryById: (id) => 
    api.get(`/categories/${id}`),
};

// Users API (for profile management)
export const usersAPI = {
  // Get user profile
  getUserProfile: (id) => 
    api.get(`/users/${id}`),
  
  // Update user profile
  updateUserProfile: (id, userData) => 
    api.put(`/users/${id}`, userData),
  
  // Create user
  createUser: (userData) => 
    api.post('/users/', userData),
};

export default api;

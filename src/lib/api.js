const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) => 
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (credentials) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  getCurrentUser: () => 
    apiRequest('/auth/me'),
  
  updateProfile: (userData) => 
    apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData) => 
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  
  getUserOrders: (page = 1, limit = 10) => 
    apiRequest(`/orders?page=${page}&limit=${limit}`),
  
  getOrder: (orderId) => 
    apiRequest(`/orders/${orderId}`),
  
  cancelOrder: (orderId) => 
    apiRequest(`/orders/${orderId}/cancel`, {
      method: 'PATCH',
    }),
};

// Payments API
export const paymentsAPI = {
  createPaymentIntent: (amount, orderId) => 
    apiRequest('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, orderId }),
    }),
  
  confirmPayment: (paymentIntentId) => 
    apiRequest('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId }),
    }),
};

// Store auth token
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};
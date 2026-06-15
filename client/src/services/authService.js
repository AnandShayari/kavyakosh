import api from './api.js';

const AUTH_STORAGE_KEY = 'kavyakosh_auth';

export const authService = {
  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.data.tokens));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.data.tokens));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // Get Current User
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/current-user');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  // Reset Password
  resetPassword: async (resetToken, newPassword, confirmPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        resetToken,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  // Update Password
  updatePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await api.put('/auth/update-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  // Refresh Token
  refreshToken: async () => {
    try {
      const auth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
      const response = await api.post('/auth/refresh-token', {
        refreshToken: auth.refreshToken,
      });
      if (response.data.success) {
        const updatedAuth = { ...auth, accessToken: response.data.tokens.accessToken };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedAuth));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  // Check Email Exists
  checkEmailExists: async (email) => {
    try {
      const response = await api.get('/auth/check-email', { params: { email } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  // Get Auth Token
  getAuthToken: () => {
    const auth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
    return auth.accessToken;
  },

  // Get Refresh Token
  getRefreshToken: () => {
    const auth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');
    return auth.refreshToken;
  },

  // Is Authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_STORAGE_KEY);
  },
};

export default authService;

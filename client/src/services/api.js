import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem('kavyakosh_auth') || '{}');
    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const auth = JSON.parse(localStorage.getItem('kavyakosh_auth') || '{}');
        if (auth.refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken: auth.refreshToken,
          });

          if (response.data.success) {
            const updatedAuth = {
              ...auth,
              accessToken: response.data.tokens.accessToken,
            };
            localStorage.setItem('kavyakosh_auth', JSON.stringify(updatedAuth));
            originalRequest.headers.Authorization = `Bearer ${response.data.tokens.accessToken}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem('kavyakosh_auth');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Service methods
export const apiService = {
  // Poems
  getPoems: (params) => api.get('/poems', { params }),
  getPoem: (id) => api.get(`/poems/${id}`),
  createPoem: (data) => api.post('/poems', data),
  updatePoem: (id, data) => api.put(`/poems/${id}`, data),
  deletePoem: (id) => api.delete(`/poems/${id}`),
  publishPoem: (id) => api.post(`/poems/${id}/publish`),
  likePoem: (id) => api.post(`/poems/${id}/like`),
  unlikePoem: (id) => api.post(`/poems/${id}/unlike`),
  savePoem: (id) => api.post(`/poems/${id}/save`),
  unsavePoem: (id) => api.post(`/poems/${id}/unsave`),
  getTrendingPoems: (limit) => api.get('/poems/trending', { params: { limit } }),
  searchPoems: (params) => api.get('/poems/search', { params }),

  // Comments
  addComment: (poemId, data) => api.post(`/poems/${poemId}/comments`, data),
  getComments: (poemId, params) => api.get(`/poems/${poemId}/comments`, { params }),
  updateComment: (commentId, data) => api.put(`/poems/comments/${commentId}`, data),
  deleteComment: (commentId) => api.delete(`/poems/comments/${commentId}`),
  likeComment: (commentId) => api.post(`/poems/comments/${commentId}/like`),
  replyComment: (commentId, data) => api.post(`/poems/comments/${commentId}/reply`, data),

  // Reviews
  addReview: (poemId, data) => api.post(`/poems/${poemId}/reviews`, data),
  getReviews: (poemId, params) => api.get(`/poems/${poemId}/reviews`, { params }),
  getReviewStats: (poemId) => api.get(`/poems/${poemId}/reviews/stats`),
  updateReview: (reviewId, data) => api.put(`/poems/reviews/${reviewId}`, data),
  deleteReview: (reviewId) => api.delete(`/poems/reviews/${reviewId}`),

  // Users
  getUserProfile: (userId) => api.get(`/users/${userId}/profile`),
  updateProfile: (data) => api.put('/users/profile', data),
  followUser: (userId) => api.post(`/users/${userId}/follow`),
  unfollowUser: (userId) => api.post(`/users/${userId}/unfollow`),
  getFollowers: (userId, params) => api.get(`/users/${userId}/followers`, { params }),
  getFollowing: (userId, params) => api.get(`/users/${userId}/following`, { params }),
  getSuggestedUsers: (params) => api.get('/users/suggested', { params }),
  getDashboardStats: () => api.get('/users/dashboard/stats'),
  searchUsers: (query) => api.get('/users/search', { params: { q: query } }),

  // AI
  generatePoem: (data) => api.post('/ai/generate', data),
  generateShayari: (data) => api.post('/ai/generate/shayari', data),
  generateGhazal: (data) => api.post('/ai/generate/ghazal', data),
  generateQuote: (data) => api.post('/ai/generate/quote', data),
  generateCaption: (data) => api.post('/ai/generate/caption', data),
  getChatHistory: (params) => api.get('/ai/history', { params }),
};

export default api;

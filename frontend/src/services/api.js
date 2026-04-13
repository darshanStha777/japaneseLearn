import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Vocabulary APIs
export const vocabAPI = {
  getAll: (page = 0, size = 20) => api.get(`/vocab?page=${page}&size=${size}`),
  getById: (id) => api.get(`/vocab/${id}`),
  getToday: () => api.get('/vocab/today'),
  getByCategory: (category) => api.get(`/vocab/category/${category}`),
  search: (keyword) => api.get(`/vocab/search?keyword=${keyword}`),
};

// Study APIs
export const studyAPI = {
  getPlan: () => api.get('/study/plan'),
  markLearned: (vocabularyId, result) => api.post('/study/mark-learned', { vocabularyId, result }),
  getDueForReview: () => api.get('/study/due-for-review'),
  submitCardResult: (data) => api.post('/study/submit-card-result', data),
  getTodayProgress: () => api.get('/study/today-progress'),
};

// Quiz APIs
export const quizAPI = {
  getQuestions: (type, category, count) => api.get(`/quiz/questions?type=${type || ''}&category=${category || ''}&count=${count || 10}`),
  submitAnswer: (data) => api.post('/quiz/submit-answer', data),
  getResults: (quizId) => api.get(`/quiz/results/${quizId}`),
  getHistory: () => api.get('/quiz/history'),
  generateMock: () => api.post('/quiz/generate-mock'),
};

// Progress APIs
export const progressAPI = {
  getDaily: () => api.get('/progress/daily'),
  getReadiness: () => api.get('/progress/readiness'),
  getWeakAreas: () => api.get('/progress/weak-areas'),
  getStatistics: () => api.get('/progress/statistics'),
  getHeatmap: () => api.get('/progress/heatmap'),
  getLearningVelocity: () => api.get('/progress/learning-velocity'),
};

export default api;

import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

export const vocabApi = {
  getToday: (userId = 1) => api.get(`/vocab/today?userId=${userId}`),
  getByCategory: (category, userId = 1) => api.get(`/vocab/category/${category}?userId=${userId}`),
  getById: (id, userId = 1) => api.get(`/vocab/${id}?userId=${userId}`),
  search: (query) => api.get(`/vocab/search?q=${encodeURIComponent(query)}`)
}

export const studyApi = {
  markLearned: (userId, vocabularyId, wasCorrect) =>
    api.post('/study/mark-learned', { userId, vocabularyId, wasCorrect }),
  getDueReview: (userId = 1) => api.get(`/study/due-review?userId=${userId}`),
  getDailyProgress: (userId = 1) => api.get(`/study/daily?userId=${userId}`)
}

export const quizApi = {
  generate: (userId = 1, type = 'multiple_choice', category = '', count = 10) =>
    api.get(`/quiz/generate?userId=${userId}&type=${type}&category=${category}&count=${count}`),
  submitAnswer: (userId, vocabularyId, answer, quizType) =>
    api.post('/quiz/submit-answer', { userId, vocabularyId, answer, quizType }),
  getStats: (userId = 1) => api.get(`/quiz/stats?userId=${userId}`)
}

export const progressApi = {
  getDaily: (userId = 1) => api.get(`/progress/daily?userId=${userId}`),
  getReadiness: (userId = 1) => api.get(`/progress/readiness?userId=${userId}`),
  getWeakAreas: (userId = 1) => api.get(`/progress/weak-areas?userId=${userId}`),
  getLearningVelocity: (userId = 1) => api.get(`/stats/learning-velocity?userId=${userId}`)
}

export default api

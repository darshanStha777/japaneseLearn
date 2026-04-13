import { useState, useCallback } from 'react'
import { progressApi } from '../services/api.js'

const FALLBACK_PROGRESS = {
  wordsLearnedToday: 12,
  wordsStudiedToday: 18,
  targetWordsToday: 50,
  totalWordsLearned: 87,
  totalWordsMastered: 34,
  currentStreak: 5,
  longestStreak: 12,
  accuracyRate: 78.5,
  readinessScore: 42.3,
  daysUntilExam: 45,
  dueForReview: 8,
  weekInPlan: 3,
  weeklyProgress: [
    { date: '2024-01-08', wordsStudied: 45, wordsMastered: 20 },
    { date: '2024-01-09', wordsStudied: 52, wordsMastered: 25 },
    { date: '2024-01-10', wordsStudied: 48, wordsMastered: 22 },
    { date: '2024-01-11', wordsStudied: 0, wordsMastered: 0 },
    { date: '2024-01-12', wordsStudied: 60, wordsMastered: 30 },
    { date: '2024-01-13', wordsStudied: 55, wordsMastered: 28 },
    { date: '2024-01-14', wordsStudied: 18, wordsMastered: 12 },
  ],
  categoryMastery: {
    business: 45.2,
    academic: 62.1,
    keigo: 23.5,
    daily_life: 71.8,
    idioms: 15.0,
    kanji_compounds: 38.9
  },
  weakAreas: [
    { category: 'idioms', masteryPercent: 15.0 },
    { category: 'keigo', masteryPercent: 23.5 },
    { category: 'kanji_compounds', masteryPercent: 38.9 },
    { category: 'business', masteryPercent: 45.2 },
    { category: 'academic', masteryPercent: 62.1 },
    { category: 'daily_life', masteryPercent: 71.8 },
  ],
  learningVelocity: 8.5
}

export function useProgress() {
  const [progress, setProgress] = useState(FALLBACK_PROGRESS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDailyProgress = useCallback(async (userId = 1) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await progressApi.getDaily(userId)
      setProgress(prev => ({ ...FALLBACK_PROGRESS, ...data }))
    } catch (err) {
      setError('Backend not available, using sample data')
      setProgress(FALLBACK_PROGRESS)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchReadiness = useCallback(async (userId = 1) => {
    try {
      const { data } = await progressApi.getReadiness(userId)
      return data
    } catch (err) {
      return { readinessScore: FALLBACK_PROGRESS.readinessScore }
    }
  }, [])

  const fetchWeakAreas = useCallback(async (userId = 1) => {
    try {
      const { data } = await progressApi.getWeakAreas(userId)
      return data
    } catch (err) {
      return FALLBACK_PROGRESS.weakAreas
    }
  }, [])

  return { progress, loading, error, fetchDailyProgress, fetchReadiness, fetchWeakAreas }
}

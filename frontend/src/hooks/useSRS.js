import { useState, useCallback } from 'react'
import { studyApi } from '../services/api.js'
import { calculateNextReview } from '../services/srsCalculator.js'

export function useSRS() {
  const [dueCards, setDueCards] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAnswer = useCallback(async (vocabId, wasCorrect, currentMastery = 0, userId = 1) => {
    try {
      const { data } = await studyApi.markLearned(userId, vocabId, wasCorrect)
      return data
    } catch (err) {
      const { nextDate, newMastery, intervalDays } = calculateNextReview(currentMastery, wasCorrect)
      return {
        masteryLevel: newMastery,
        nextReviewDate: nextDate.toISOString().split('T')[0],
        intervalDays,
        wasCorrect
      }
    }
  }, [])

  const loadDueCards = useCallback(async (userId = 1) => {
    setLoading(true)
    try {
      const { data } = await studyApi.getDueReview(userId)
      setDueCards(data)
    } catch (err) {
      setDueCards([])
    } finally {
      setLoading(false)
    }
  }, [])

  return { dueCards, loading, handleAnswer, loadDueCards }
}

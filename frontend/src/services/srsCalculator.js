export const MASTERY_LEVELS = {
  NEW: 0,
  LEARNING: 1,
  REVIEWING: 2,
  MATURE: 3,
  PERFECT: 4
}

export const INTERVALS = [1, 3, 7, 14, 30]

export function calculateNextReview(masteryLevel, wasCorrect) {
  const newMastery = wasCorrect
    ? Math.min(masteryLevel + 1, 4)
    : Math.max(masteryLevel - 1, 0)

  const intervalDays = wasCorrect ? INTERVALS[newMastery] || 30 : 1
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + intervalDays)

  return {
    nextDate,
    newMastery,
    intervalDays
  }
}

export function isDueForReview(nextReviewDate) {
  if (!nextReviewDate) return true
  const reviewDate = new Date(nextReviewDate)
  return reviewDate <= new Date()
}

export function getMasteryLabel(level) {
  const labels = ['New', 'Learning', 'Reviewing', 'Mature', 'Perfect']
  return labels[level] || 'New'
}

export function getMasteryColor(level) {
  const colors = [
    'bg-gray-200 text-gray-700',
    'bg-red-100 text-red-700',
    'bg-yellow-100 text-yellow-700',
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700'
  ]
  return colors[level] || colors[0]
}

export function getMasteryProgress(level) {
  return (level / 4) * 100
}

export function getEstimatedReviewInterval(masteryLevel) {
  return INTERVALS[masteryLevel] || 1
}

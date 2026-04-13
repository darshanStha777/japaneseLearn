// Spaced Repetition System Calculator
// Based on SM-2 algorithm variant

export const SRS_INTERVALS = {
  0: 1,   // New word: review in 1 day
  1: 3,   // After 1st correct: review in 3 days
  2: 7,   // After 2nd correct: review in 7 days
  3: 30,  // After 3rd correct: review in 30 days
  4: 90,  // Perfect: review in 90 days
};

export const MASTERY_LEVELS = {
  NEW: 0,
  LEARNING: 1,
  REVIEWING: 2,
  MATURE: 3,
  PERFECT: 4,
};

export const MASTERY_LABELS = {
  0: 'New',
  1: 'Learning',
  2: 'Reviewing',
  3: 'Mature',
  4: 'Perfect',
};

export const MASTERY_COLORS = {
  0: '#6b7280',
  1: '#ef4444',
  2: '#f59e0b',
  3: '#3b82f6',
  4: '#10b981',
};

export const calculateNextReview = (masteryLevel, wasCorrect) => {
  if (!wasCorrect) {
    return {
      newMasteryLevel: 0,
      nextReviewDays: 1,
    };
  }

  const newMasteryLevel = Math.min(masteryLevel + 1, 4);
  const nextReviewDays = SRS_INTERVALS[newMasteryLevel] || 1;

  return {
    newMasteryLevel,
    nextReviewDays,
  };
};

export const calculateReadinessScore = (masteredWords, totalWords) => {
  if (totalWords === 0) return 0;
  return Math.round((masteredWords / totalWords) * 100);
};

export const getDailyTarget = (daysRemaining, wordsRemaining) => {
  if (daysRemaining <= 0) return wordsRemaining;

  // Based on 2-month schedule
  if (daysRemaining > 42) return 15;
  if (daysRemaining > 28) return 20;
  if (daysRemaining > 14) return 20;
  return Math.max(15, Math.ceil(wordsRemaining / daysRemaining));
};

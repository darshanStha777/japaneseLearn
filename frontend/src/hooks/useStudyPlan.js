import { useState, useEffect } from 'react';
import { studyAPI } from '../services/api';
import { getDailyTarget } from '../services/srsCalculator';
import { differenceInDays, parseISO } from 'date-fns';

export const useStudyPlan = () => {
  const [plan, setPlan] = useState(null);
  const [todayProgress, setTodayProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const examDate = localStorage.getItem('examDate') || '2025-07-06';
  const daysUntilExam = differenceInDays(parseISO(examDate), new Date());

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        setError(null);
        const [planData, progressData] = await Promise.allSettled([
          studyAPI.getPlan(),
          studyAPI.getTodayProgress(),
        ]);

        if (planData.status === 'fulfilled') setPlan(planData.value);
        if (progressData.status === 'fulfilled') setTodayProgress(progressData.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  const markWordLearned = async (vocabularyId, result) => {
    try {
      await studyAPI.markLearned(vocabularyId, result);
    } catch (err) {
      console.error('Failed to mark word as learned:', err);
    }
  };

  return {
    plan,
    todayProgress,
    loading,
    error,
    daysUntilExam,
    dailyTarget: getDailyTarget(daysUntilExam, plan?.wordsRemaining || 1000),
    markWordLearned,
  };
};

import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { quizAPI } from '../services/api';

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await quizAPI.getHistory();
        setHistory(data || []);
      } catch (_err) {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">📝</div>
        <p className="text-gray-500 dark:text-gray-400">Loading history...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Quiz History</h1>

      {history.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          <div className="text-5xl mb-3">📊</div>
          <p className="text-lg font-medium">No quiz history yet</p>
          <p className="text-sm mt-1">Take your first quiz to see your history</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((attempt) => {
            const scoreColor = attempt.quizScore >= 80 ? 'text-green-600' : attempt.quizScore >= 60 ? 'text-yellow-600' : 'text-red-600';
            return (
              <div key={attempt.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {attempt.quizType?.replace(/_/g, ' ')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {attempt.attemptedAt ? format(parseISO(attempt.attemptedAt), 'MMM d, yyyy HH:mm') : 'Unknown date'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {attempt.correctAnswers}/{attempt.totalQuestions} correct
                    {attempt.durationSeconds && ` • ${attempt.durationSeconds}s`}
                  </p>
                </div>
                <div className={`text-2xl font-bold ${scoreColor}`}>
                  {Math.round(attempt.quizScore)}%
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;

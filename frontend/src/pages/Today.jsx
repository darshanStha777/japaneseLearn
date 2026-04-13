import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vocabAPI, studyAPI } from '../services/api';
import { MASTERY_COLORS, MASTERY_LABELS } from '../services/srsCalculator';
import { getCategoryLabel } from '../services/progressCalculator';

const Today = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ studied: 0, target: 60 });
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        setLoading(true);
        const [wordsData, progressData] = await Promise.allSettled([
          vocabAPI.getToday(),
          studyAPI.getTodayProgress(),
        ]);

        if (wordsData.status === 'fulfilled') {
          setWords(Array.isArray(wordsData.value) ? wordsData.value : wordsData.value?.content || []);
        }
        if (progressData.status === 'fulfilled' && progressData.value) {
          setProgress({
            studied: progressData.value.wordsStudied || 0,
            target: progressData.value.targetWords || 60,
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodayData();
  }, []);

  const categories = ['all', ...new Set(words.map(w => w.category).filter(Boolean))];
  const filteredWords = selectedCategory === 'all' ? words : words.filter(w => w.category === selectedCategory);
  const completionPct = Math.min(100, Math.round((progress.studied / progress.target) * 100));

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-bounce">📚</div>
        <p className="text-gray-500 dark:text-gray-400">Loading today's study plan...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📅 Today's Study Plan</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {words.length} words ready for study
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-900 dark:text-white">Daily Progress</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">{completionPct}%</span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-4 transition-all"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {progress.studied} / {progress.target} words studied
        </p>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/learn"
          className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 font-medium transition-colors"
        >
          <span>📚</span>
          <span>Start Flashcards</span>
        </Link>
        <Link
          to="/quiz"
          className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-4 font-medium transition-colors"
        >
          <span>✏️</span>
          <span>Take Quiz</span>
        </Link>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {cat === 'all' ? 'All' : getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Words list */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-xl">
          ⚠️ {error} - Showing offline data
        </div>
      )}

      <div className="grid gap-3">
        {filteredWords.map((word) => (
          <div
            key={word.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{word.kanji}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{word.furigana}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">{word.englishMeaning}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{word.partOfSpeech}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: MASTERY_COLORS[word.masteryLevel || 0] + '22',
                  color: MASTERY_COLORS[word.masteryLevel || 0]
                }}
              >
                {MASTERY_LABELS[word.masteryLevel || 0]}
              </span>
              {word.frequencyRank && (
                <span className="text-xs text-gray-400 dark:text-gray-500">#{word.frequencyRank}</span>
              )}
            </div>
          </div>
        ))}

        {filteredWords.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="text-5xl mb-3">🎉</div>
            <p className="text-lg font-medium">All caught up!</p>
            <p className="text-sm mt-1">No words to study in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Today;

import React, { useState, useEffect } from 'react';
import Flashcard from '../components/Flashcard';
import { vocabAPI, studyAPI } from '../services/api';

const Learn = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ know: 0, learning: 0, again: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('today'); // today | review

  useEffect(() => {
    fetchWords();
  }, [mode]);

  const fetchWords = async () => {
    try {
      setLoading(true);
      let data;
      if (mode === 'review') {
        data = await studyAPI.getDueForReview();
      } else {
        data = await vocabAPI.getToday();
      }
      setWords(Array.isArray(data) ? data : data?.content || []);
      setCurrentIndex(0);
      setSessionStats({ know: 0, learning: 0, again: 0 });
      setSessionComplete(false);
    } catch (err) {
      console.error('Error fetching words:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardResult = async (word, result) => {
    const resultKey = result.toLowerCase();
    setSessionStats(prev => ({
      ...prev,
      [resultKey]: (prev[resultKey] || 0) + 1,
    }));

    try {
      await studyAPI.submitCardResult({
        vocabularyId: word.id,
        result,
      });
    } catch (err) {
      console.error('Failed to submit card result:', err);
    }

    if (currentIndex + 1 >= words.length) {
      setSessionComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-bounce">🃏</div>
        <p className="text-gray-500 dark:text-gray-400">Loading flashcards...</p>
      </div>
    </div>
  );

  if (sessionComplete) {
    const total = sessionStats.know + sessionStats.learning + sessionStats.again;
    const accuracy = total > 0 ? Math.round((sessionStats.know / total) * 100) : 0;

    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Session Complete!</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{sessionStats.know}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">✅ Know</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-yellow-600">{sessionStats.learning}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">🤔 Learning</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-600">{sessionStats.again}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">😟 Again</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600">{accuracy}% Accuracy</div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => { fetchWords(); }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-medium transition-colors"
          >
            Study Again
          </button>
          <button
            onClick={() => setMode('review')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-xl py-3 font-medium transition-colors"
          >
            Review Due
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📚 Flashcards</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setMode('today')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${mode === 'today' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            Today
          </button>
          <button
            onClick={() => setMode('review')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${mode === 'review' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            Review
          </button>
        </div>
      </div>

      {/* Session stats */}
      <div className="flex justify-center space-x-6 text-sm">
        <span className="text-green-600">✅ {sessionStats.know}</span>
        <span className="text-yellow-600">🤔 {sessionStats.learning}</span>
        <span className="text-red-600">😟 {sessionStats.again}</span>
      </div>

      {words.length > 0 ? (
        <Flashcard
          key={words[currentIndex]?.id || currentIndex}
          word={words[currentIndex]}
          onResult={handleCardResult}
          currentIndex={currentIndex}
          totalWords={words.length}
        />
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <div className="text-5xl mb-3">🎉</div>
          <p className="text-lg font-medium">No cards to study!</p>
          <p className="text-sm mt-1">Come back tomorrow for new words</p>
        </div>
      )}

      {/* Skip button */}
      {words.length > 0 && currentIndex < words.length && (
        <div className="text-center">
          <button
            onClick={() => {
              if (currentIndex + 1 >= words.length) {
                setSessionComplete(true);
              } else {
                setCurrentIndex(prev => prev + 1);
              }
            }}
            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline"
          >
            Skip this card
          </button>
        </div>
      )}
    </div>
  );
};

export default Learn;

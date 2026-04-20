import React, { useMemo, useState } from 'react';
import { MASTERY_LABELS, MASTERY_COLORS } from '../services/srsCalculator';

const Flashcard = ({ word, onResult, currentIndex, totalWords }) => {
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);

  const relatedWordsSource = word?.relatedWords || '';
  const relatedWords = useMemo(() => {
    if (!relatedWordsSource) return [];
    return relatedWordsSource
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 3);
  }, [relatedWordsSource]);

  const handleFlip = () => {
    if (!animating) {
      setAnimating(true);
      setFlipped(!flipped);
      setTimeout(() => setAnimating(false), 300);
    }
  };

  const handleResult = (result) => {
    if (onResult) onResult(word, result);
  };

  if (!word) return null;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>Card {currentIndex + 1} of {totalWords}</span>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: MASTERY_COLORS[word.masteryLevel || 0] + '33', color: MASTERY_COLORS[word.masteryLevel || 0] }}>
          {MASTERY_LABELS[word.masteryLevel || 0]}
        </span>
      </div>

      {/* Card */}
      <div
        className={`relative h-64 cursor-pointer transition-transform duration-300 ${animating ? 'scale-95' : 'scale-100'}`}
        onClick={handleFlip}
        style={{ perspective: '1000px' }}
      >
        <div className={`w-full h-full transition-all duration-300 ${flipped ? 'hidden' : 'block'}`}>
          {/* Front */}
          <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl shadow-lg border border-red-200 dark:border-red-700 flex flex-col items-center justify-center p-6">
            <p className="text-5xl font-bold text-gray-900 dark:text-white mb-3">{word.kanji}</p>
            <p className="text-xl text-gray-600 dark:text-gray-300">{word.furigana}</p>
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                {word.partOfSpeech}
              </span>
              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                Rank #{word.frequencyRank}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">Click to reveal meaning</p>
          </div>
        </div>

        <div className={`w-full h-full transition-all duration-300 ${flipped ? 'block' : 'hidden'}`}>
          {/* Back */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700 flex flex-col items-center justify-center p-6">
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{word.englishMeaning}</p>
            {word.exampleSentence && (
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2 italic">
                {word.exampleSentence}
              </p>
            )}
            {word.sentenceEnglish && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {word.sentenceEnglish}
              </p>
            )}
            <div className="mt-3 space-y-1">
              <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium text-center">
                🧠 School method: Kanji → Hiragana → English (3 times aloud)
              </p>
              {relatedWords.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Similar words: {relatedWords.join(' ・ ')}
                </p>
              )}
              {word.wordFormation && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Pattern: {word.wordFormation}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {flipped && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={() => handleResult('AGAIN')}
            className="py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
          >
            😟 Again
          </button>
          <button
            onClick={() => handleResult('LEARNING')}
            className="py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-colors"
          >
            🤔 Learning
          </button>
          <button
            onClick={() => handleResult('KNOW')}
            className="py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
          >
            ✅ Know
          </button>
        </div>
      )}

      {!flipped && (
        <div className="mt-4 text-center">
          <button
            onClick={handleFlip}
            className="py-3 px-8 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
          >
            Show Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;

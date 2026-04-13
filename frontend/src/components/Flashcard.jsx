import { useState } from 'react'
import { getMasteryLabel, getMasteryColor } from '../services/srsCalculator.js'

export default function Flashcard({ vocab, onAnswer }) {
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(false)

  if (!vocab) return null

  const handleFlip = () => {
    if (!answered) setFlipped(f => !f)
  }

  const handleAnswer = (wasCorrect) => {
    setAnswered(true)
    setTimeout(() => {
      setFlipped(false)
      setAnswered(false)
      onAnswer(wasCorrect)
    }, 500)
  }

  const masteryLabel = getMasteryLabel(vocab.masteryLevel || 0)
  const masteryColor = getMasteryColor(vocab.masteryLevel || 0)

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flashcard-container" style={{ height: '300px' }}>
        <div
          className={`flashcard cursor-pointer w-full h-full ${flipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          style={{ height: '300px' }}
        >
          {/* Front */}
          <div className="flashcard-front w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center p-8">
            <div className="flex justify-between w-full mb-4">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${masteryColor}`}>
                {masteryLabel}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {vocab.category}
              </span>
            </div>
            <div className="text-center flex-1 flex flex-col items-center justify-center">
              <div className="text-6xl font-bold text-japanese-navy dark:text-white mb-3 japanese-text">
                {vocab.kanji}
              </div>
              <div className="text-2xl text-gray-400 dark:text-gray-400">
                {vocab.partOfSpeech}
              </div>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-4">Tap to reveal</p>
          </div>

          {/* Back */}
          <div className="flashcard-back w-full h-full bg-japanese-navy dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col">
            <div className="text-center mb-3">
              <div className="text-3xl font-bold text-white mb-1">{vocab.kanji}</div>
              <div className="text-xl text-blue-300">{vocab.furigana}</div>
            </div>
            <div className="text-center mb-3">
              <div className="text-lg font-semibold text-green-300">{vocab.englishMeaning}</div>
            </div>
            {vocab.exampleSentence && (
              <div className="bg-white/10 rounded-lg p-3 flex-1">
                <p className="text-white text-sm leading-relaxed">{vocab.exampleSentence}</p>
                <p className="text-gray-300 text-xs mt-1 italic">{vocab.sentenceEnglish}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {flipped && !answered && (
        <div className="flex gap-3 mt-6 justify-center">
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 max-w-32 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            😓 Forgot
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 max-w-32 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            😐 Hard
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 max-w-32 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            😊 Easy
          </button>
        </div>
      )}

      {!flipped && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleFlip}
            className="bg-japanese-navy dark:bg-gray-700 hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Reveal Answer
          </button>
        </div>
      )}
    </div>
  )
}

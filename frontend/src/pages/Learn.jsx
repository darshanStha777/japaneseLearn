import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useVocabulary } from '../hooks/useVocabulary.js'
import { useSRS } from '../hooks/useSRS.js'
import Flashcard from '../components/Flashcard.jsx'

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'business', label: '💼 Business' },
  { value: 'academic', label: '🎓 Academic' },
  { value: 'keigo', label: '🙇 Keigo' },
  { value: 'daily_life', label: '🏠 Daily Life' },
  { value: 'idioms', label: '📜 Idioms' },
  { value: 'kanji_compounds', label: '漢 Kanji Compounds' },
]

export default function Learn() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const [category, setCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 })
  const [sessionComplete, setSessionComplete] = useState(false)
  const [masteryUpdates, setMasteryUpdates] = useState({})

  const { vocabulary, loading, error, fetchByCategory, fetchTodayVocab, FALLBACK_VOCAB } = useVocabulary()
  const { dueCards, loadDueCards, handleAnswer } = useSRS()

  const isReviewMode = mode === 'review'

  useEffect(() => {
    if (isReviewMode) {
      loadDueCards(1)
    } else {
      if (category === 'all') {
        fetchTodayVocab(1)
      } else {
        fetchByCategory(category, 1)
      }
    }
    setCurrentIndex(0)
    setSessionStats({ correct: 0, incorrect: 0 })
    setSessionComplete(false)
    setMasteryUpdates({})
  }, [category, isReviewMode])

  const deck = isReviewMode ? dueCards : vocabulary
  const activeDeck = deck.length > 0 ? deck : FALLBACK_VOCAB

  const currentCard = activeDeck[currentIndex] ? {
    ...activeDeck[currentIndex],
    masteryLevel: masteryUpdates[activeDeck[currentIndex].id] ?? activeDeck[currentIndex].masteryLevel ?? 0
  } : null

  const handleCardAnswer = async (wasCorrect) => {
    if (!currentCard) return

    const result = await handleAnswer(currentCard.id, wasCorrect, currentCard.masteryLevel, 1)
    setMasteryUpdates(prev => ({ ...prev, [currentCard.id]: result.masteryLevel }))
    setSessionStats(prev => ({
      correct: prev.correct + (wasCorrect ? 1 : 0),
      incorrect: prev.incorrect + (wasCorrect ? 0 : 1)
    }))

    if (currentIndex + 1 >= activeDeck.length) {
      setSessionComplete(true)
    } else {
      setCurrentIndex(i => i + 1)
    }
  }

  const restartSession = () => {
    setCurrentIndex(0)
    setSessionStats({ correct: 0, incorrect: 0 })
    setSessionComplete(false)
    setMasteryUpdates({})
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isReviewMode ? '🔄 Review Due Cards' : '📖 Flashcard Study'}
        </h1>
      </div>

      {/* Category Selector */}
      {!isReviewMode && (
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat.value
                  ? 'bg-japanese-navy text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{currentIndex + 1} / {activeDeck.length} cards</span>
        <div className="flex gap-4">
          <span className="text-green-500">✓ {sessionStats.correct}</span>
          <span className="text-red-500">✗ {sessionStats.incorrect}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">
        <div
          className="bg-japanese-red h-1.5 rounded-full transition-all"
          style={{ width: `${(currentIndex / activeDeck.length) * 100}%` }}
        />
      </div>

      {loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">Loading vocabulary...</div>
      )}

      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-3 text-sm text-yellow-700 dark:text-yellow-300">
          ⚠️ {error}
        </div>
      )}

      {/* Session Complete */}
      {sessionComplete ? (
        <div className="card text-center py-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Session Complete!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            You practiced {activeDeck.length} cards
          </p>
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{sessionStats.correct}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{sessionStats.incorrect}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Needs Review</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">
                {activeDeck.length > 0 ? Math.round((sessionStats.correct / activeDeck.length) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
            </div>
          </div>
          <button onClick={restartSession} className="btn-primary px-8 py-3 rounded-xl">
            Study Again 🔄
          </button>
        </div>
      ) : currentCard ? (
        <Flashcard vocab={currentCard} onAnswer={handleCardAnswer} />
      ) : null}
    </div>
  )
}

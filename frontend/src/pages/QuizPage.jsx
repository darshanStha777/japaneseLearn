import { useState, useEffect, useCallback } from 'react'
import { quizApi } from '../services/api.js'
import QuizCard from '../components/QuizCard.jsx'

const QUIZ_TYPES = [
  { value: 'multiple_choice', label: '🎯 Multiple Choice' },
  { value: 'kanji_to_meaning', label: '漢→EN Kanji to Meaning' },
  { value: 'meaning_to_kanji', label: 'EN→漢 Meaning to Kanji' },
]

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'business', label: '💼 Business' },
  { value: 'academic', label: '🎓 Academic' },
  { value: 'keigo', label: '🙇 Keigo' },
  { value: 'daily_life', label: '🏠 Daily Life' },
  { value: 'idioms', label: '📜 Idioms' },
  { value: 'kanji_compounds', label: '漢 Kanji Compounds' },
]

const FALLBACK_QUESTIONS = [
  {
    vocabularyId: 1, question: 'What does 妥協 (だきょう) mean?', quizType: 'multiple_choice',
    options: ['compromise', 'proposal', 'facility', 'approval'], correctAnswer: 'compromise',
    kanji: '妥協', furigana: 'だきょう', englishMeaning: 'compromise'
  },
  {
    vocabularyId: 2, question: 'What does 把握 (はあく) mean?', quizType: 'multiple_choice',
    options: ['grasp; understand', 'confirmation', 'promotion', 'thoroughness'], correctAnswer: 'grasp; understand',
    kanji: '把握', furigana: 'はあく', englishMeaning: 'grasp; understand'
  },
  {
    vocabularyId: 3, question: 'What does 承認 (しょうにん) mean?', quizType: 'multiple_choice',
    options: ['proposal', 'approval; recognition', 'reference', 'overview'], correctAnswer: 'approval; recognition',
    kanji: '承認', furigana: 'しょうにん', englishMeaning: 'approval; recognition'
  },
  {
    vocabularyId: 4, question: 'What does 概要 (がいよう) mean?', quizType: 'multiple_choice',
    options: ['contract', 'deadline', 'overview; summary', 'policy'], correctAnswer: 'overview; summary',
    kanji: '概要', furigana: 'がいよう', englishMeaning: 'overview; summary'
  },
  {
    vocabularyId: 5, question: 'What does 複雑 (ふくざつ) mean?', quizType: 'multiple_choice',
    options: ['simple', 'complex; complicated', 'independent', 'possible'], correctAnswer: 'complex; complicated',
    kanji: '複雑', furigana: 'ふくざつ', englishMeaning: 'complex; complicated'
  },
]

export default function QuizPage() {
  const [quizType, setQuizType] = useState('multiple_choice')
  const [category, setCategory] = useState('')
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizDone, setQuizDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const generateQuiz = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await quizApi.generate(1, quizType, category, 10)
      setQuestions(data.length >= 4 ? data : FALLBACK_QUESTIONS)
    } catch (err) {
      setQuestions(FALLBACK_QUESTIONS)
    } finally {
      setLoading(false)
      setQuizStarted(true)
      setCurrentQ(0)
      setScore(0)
      setQuizDone(false)
      setResults([])
    }
  }, [quizType, category])

  const handleAnswer = async (selectedOption) => {
    const q = questions[currentQ]
    const correct = selectedOption === q.correctAnswer
    if (correct) setScore(s => s + 1)

    setResults(prev => [...prev, {
      question: q.question,
      selected: selectedOption,
      correct: q.correctAnswer,
      isCorrect: correct,
      kanji: q.kanji,
    }])

    try {
      await quizApi.submitAnswer(1, q.vocabularyId, selectedOption, quizType)
    } catch {}

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setQuizDone(true)
      } else {
        setCurrentQ(i => i + 1)
      }
    }, 1300)
  }

  const restart = () => {
    setQuizStarted(false)
    setQuizDone(false)
    setCurrentQ(0)
    setScore(0)
    setQuestions([])
    setResults([])
  }

  if (!quizStarted) {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">✍️ Practice Quiz</h1>

        <div className="card space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quiz Type</label>
            <div className="space-y-2">
              {QUIZ_TYPES.map(type => (
                <label key={type.value} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="quizType"
                    value={type.value}
                    checked={quizType === type.value}
                    onChange={e => setQuizType(e.target.value)}
                    className="text-japanese-red"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-japanese-navy"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={generateQuiz}
            disabled={loading}
            className="w-full btn-primary py-3 rounded-xl text-lg font-semibold"
          >
            {loading ? 'Generating Quiz...' : '🚀 Start Quiz (10 questions)'}
          </button>
        </div>
      </div>
    )
  }

  if (quizDone) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="card text-center py-8">
          <div className="text-6xl mb-4">{pct >= 80 ? '🎉' : pct >= 60 ? '😊' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Quiz Complete!</h2>
          <div className="text-5xl font-bold mb-2" style={{ color: pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444' }}>
            {pct}%
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{score}/{questions.length} correct</p>
          <div className="flex gap-3 justify-center">
            <button onClick={generateQuiz} className="btn-primary px-6 py-2 rounded-xl">New Quiz 🔄</button>
            <button onClick={restart} className="btn-secondary px-6 py-2 rounded-xl">Change Settings ⚙️</button>
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">📋 Results Review</h3>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`p-3 rounded-xl border ${r.isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' : 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-gray-800 dark:text-white">{r.kanji}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{r.question.slice(0, 40)}...</span>
                  </div>
                  <span className={r.isCorrect ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
                    {r.isCorrect ? '✓' : '✗'}
                  </span>
                </div>
                {!r.isCorrect && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Correct: <span className="font-medium text-green-600 dark:text-green-400">{r.correct}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQ]
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">✍️ Quiz</h1>
        <button onClick={restart} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          ✕ Exit
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Question {currentQ + 1} of {questions.length}</span>
        <span className="text-green-500 font-semibold">{score} correct</span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div
          className="bg-japanese-red h-1.5 rounded-full transition-all"
          style={{ width: `${(currentQ / questions.length) * 100}%` }}
        />
      </div>

      <QuizCard
        question={currentQuestion}
        options={currentQuestion?.options || []}
        onAnswer={handleAnswer}
        quizType={quizType}
      />
    </div>
  )
}

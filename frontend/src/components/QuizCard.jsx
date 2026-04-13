import { useState, useEffect } from 'react'

export default function QuizCard({ question, options, onAnswer, quizType, timeLimit = 30 }) {
  const [selected, setSelected] = useState(null)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setSelected(null)
    setTimeLeft(timeLimit)
    setRevealed(false)
  }, [question, timeLimit])

  useEffect(() => {
    if (revealed || selected !== null) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer)
          handleSelect(null)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [question, revealed, selected])

  const handleSelect = (option) => {
    if (revealed) return
    setSelected(option)
    setRevealed(true)
    setTimeout(() => {
      onAnswer(option)
    }, 1200)
  }

  const isCorrect = (option) => option === question?.correctAnswer
  const isWrong = (option) => selected === option && option !== question?.correctAnswer

  const optionLabels = ['A', 'B', 'C', 'D']
  const timerPercent = (timeLeft / timeLimit) * 100

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Timer */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
          <span>Time remaining</span>
          <span className={timeLeft <= 5 ? 'text-red-500 font-bold' : ''}>{timeLeft}s</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${timerPercent > 50 ? 'bg-green-500' : timerPercent > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wide">
          {quizType?.replace(/_/g, ' ')}
        </div>
        <p className="text-xl font-semibold text-gray-800 dark:text-white leading-relaxed">
          {question?.question}
        </p>
        {question?.kanji && quizType !== 'meaning_to_kanji' && (
          <div className="mt-3 text-4xl font-bold text-japanese-navy dark:text-blue-300">
            {question.kanji}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {(options || []).map((option, i) => {
          let bg = 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-japanese-navy dark:hover:border-blue-500'
          if (revealed) {
            if (isCorrect(option)) {
              bg = 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300'
            } else if (isWrong(option)) {
              bg = 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300'
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={revealed}
              className={`${bg} text-left px-5 py-4 rounded-xl text-gray-800 dark:text-white transition-all font-medium flex items-center gap-3 disabled:cursor-default`}
            >
              <span className="text-sm font-bold text-gray-400 dark:text-gray-500 w-6">{optionLabels[i]}</span>
              <span className="text-base">{option}</span>
              {revealed && isCorrect(option) && <span className="ml-auto text-green-500">✓</span>}
              {revealed && isWrong(option) && <span className="ml-auto text-red-500">✗</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

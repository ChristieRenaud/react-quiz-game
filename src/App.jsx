import { useState, useEffect } from 'react'
import Quiz from './components/Quiz'
import Results from './components/Results'
import './style.css'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

export default function App() {
  const [questions, setQuestions] = useState([])
  const [numberCorrect, setNumberCorrect] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizOver, setQuizOver] = useState(false)
  const [round, setRound] = useState(0)

  useEffect(() => {
    fetch(
      'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple',
    )
      .then((res) => res.json())
      .then((data) => setQuestions(getQuestions(data.results)))
      .then(console.log(questions))
  }, [round])

  useEffect(() => {
    if (quizOver) {
      displayAnswers()
    }
  }, [quizOver])

  function displayAnswers() {
    questions.forEach((question) => {
      const results = document.querySelector('.quiz-questions')
      console.log(results)
      results.childNodes.forEach((result) => {
        if (question.id === result.querySelector('.answers').id) {
          result.querySelector('.answers').childNodes.forEach((child) => {
            child.classList.add('unclickable')
            if (child.id === question.correctAnswer) {
              child.classList.add('correct-answer')
            } else if (child.id === question.userAnswer) {
              child.classList.remove('selected-answer')
              child.classList.add('user-answer')
            } else {
              child.classList.add('inactive-answer')
            }
          })
        }
      })
    })
  }

  function scrambleArray(array) {
    let j
    let scrambledArray = []
    let arrayCopy = [...array]
    for (j = array.length; j > 0; j--) {
      let randomIndex = Math.floor(Math.random() * j)
      scrambledArray.push(arrayCopy[randomIndex])
      arrayCopy.splice(randomIndex, 1)
    }
    return scrambledArray
  }

  function getQuestions(data1) {
    return data1.map((data) => {
      return {
        id: nanoid(),
        question: decode(data.question),
        answers: decodeArray(
          scrambleArray([...data.incorrect_answers, data.correct_answer]),
        ),
        correctAnswer: decode(data.correct_answer),
        isAnswered: false,
        userAnswer: '',
      }
    })
  }
  function decodeArray(array) {
    return array.map((element) => decode(element))
  }
  function calculateScore() {
    let count = 0
    questions.forEach((question) => {
      if (question.userAnswer === question.correctAnswer) {
        count += 1
      }
    })
    setNumberCorrect(() => count)
  }

  function allQuestionsAnswered() {
    return questions.every((question) => question.isAnswered)
  }

  function checkQuiz() {
    if (!allQuestionsAnswered()) {
      document.querySelector('.warning').style.display = 'block'
    } else {
      setQuizOver(true)
      calculateScore()
    }
  }

  function startQuiz() {
    setQuizStarted(true)
  }

  function restartGame() {
    setRound((prevRound) => prevRound + 1)
    setQuizOver(false)
  }

  return (
    <main>
      {!quizStarted && (
        <div className="start-page">
          <h1>Quiz Time</h1>
          <p className="description">A fun quiz game for cash and prizes.</p>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      )}
      {quizStarted && (
        <div className="quiz-page">
          <Quiz questions={questions} setQuestions={setQuestions} />
          {!quizOver && (
            <div className="quiz-bottom-container">
              <h2 className="warning">Please answer all questions</h2>
              <button className="check-answers-button" onClick={checkQuiz}>
                Check Answers
              </button>
            </div>
          )}
          {quizOver && (
            <div className="results-bottom-container">
              <h2>
                You scored {numberCorrect} correct answer
                {numberCorrect === 1 ? '' : 's'}
              </h2>
              <button className="new-game-button" onClick={restartGame}>
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  )
}

import React from 'react'

export default function Quiz(props) {
  function recordUserAnswer(event) {
    const questionId = event.currentTarget.parentNode.id
    let userAnswer = event.target.textContent
    props.setQuestions((oldQuestions) => {
      const newArray = []
      for (let i = 0; i < oldQuestions.length; i++) {
        if (i.toString() === questionId) {
          newArray.push({
            ...oldQuestions[i],
            isAnswered: true,
            userAnswer: userAnswer,
          })
        } else {
          newArray.push(oldQuestions[i])
        }
      }
      return newArray
    })
  }

  function handleSelection(event) {
    recordUserAnswer(event)
    event.currentTarget.parentNode.childNodes.forEach((child) =>
      child.classList.remove('selected-answer'),
    )
    event.currentTarget.classList.add('selected-answer')
  }

  return (
    <div className="quiz-questions">
      {props.questions.map((question, i) => (
        <div className="questions-and-answers" key={question.id}>
          <h2 className="questions">{question.question}</h2>
          <div className="answers" id={i}>
            {question.answers.map((answer) => (
              <div
                className="answer-button"
                key={answer}
                onClick={(event) => handleSelection(event)}
              >
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

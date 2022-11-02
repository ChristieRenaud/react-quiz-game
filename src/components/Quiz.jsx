import React from 'react'
import { useState } from 'react'

export default function Quiz(props) {
  function handleSelection(event) {
    const questionId = event.currentTarget.parentNode.id
    let userAnswer = event.currentTarget.childNodes[0].innerHTML
    console.log(event)
    props.setQuestions((oldQuestions) => {
      const newArray = []
      for (let i = 0; i < oldQuestions.length; i++) {
        if (oldQuestions[i].id === questionId) {
          newArray.push({
            ...oldQuestions[i],
            isAnswered: true,
            userAnswer: userAnswer,
          })
        } else {
          newArray.push(oldQuestions[i])
        }
      }
      console.log(newArray)
      return newArray
    })
    event.currentTarget.parentNode.childNodes.forEach((child) =>
      child.classList.remove('selected-answer'),
    )
    event.currentTarget.classList.add('selected-answer')
  }

  return (
    <div className="quiz-questions">
      {props.questions.map((question) => (
        <div className="questions-and-answers" key={question.id}>
          <h2 className="questions">{question.question}</h2>
          <div className="answers" id={question.id}>
            {question.answers.map((answer) => (
              <div
                className="answer-button"
                key={answer}
                id={answer}
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

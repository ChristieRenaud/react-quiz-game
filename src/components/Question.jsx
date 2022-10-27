import React from 'react'

export default function Question(props) {
  const answerElements = props.answers.map((answer) => {
    return (
      <div className="question-answer-button" id="answer">
        {answer}
      </div>
    )
  })
  return (
    <div>
      <h2 className="question-text" id={props.question.id}>
        {props.question}
      </h2>
      {answerElements}
    </div>
  )
}

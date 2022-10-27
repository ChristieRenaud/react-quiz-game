import React from 'react'

export default function Results(props) {
  return (
    <div className="results">
      {props.questions.map((question) => (
        <div className="questions-and-answers" key={question.id}>
          <h2 className="questions">{question.question}</h2>
          <div className="answers" id={question.id}>
            {question.answers.map((answer) => (
              <div className="answer-button" key={answer} id={answer}>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

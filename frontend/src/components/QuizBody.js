import { Button, Divider, Typography } from '@material-ui/core'
import React from 'react'

const QuizBody = ({
  classes,
  modalStyle,
  questions: { question, answers, correctAnswer },
  handleQuestions,
  showAnswer,
  handleAnswers,
}) => {
  return (
    <div>
      <div style={modalStyle} className={classes.paper}>
        <h4 style={{ marginBottom: 15 }}>{question}</h4>
        <div className={classes.questionAnswer}>
          {answers.map((answer, i) => (
            <button
              key={i}
              className={`
              ${classes.buttonAnswer} 
              ${
                showAnswer
                  ? answer === correctAnswer
                    ? classes.bgCorrect
                    : classes.bgWrong
                  : ''
              }
              `}
              onClick={() => handleAnswers(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
        <Divider />
        <Button
          variant='outlined'
          style={{ float: 'right', marginTop: 7 }}
          onClick={handleQuestions}
          disabled={showAnswer ? false : true}
        >
          Next Question
        </Button>
      </div>
    </div>
  )
}

export default QuizBody

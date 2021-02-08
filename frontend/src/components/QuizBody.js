import { Button, Divider } from '@material-ui/core'

const QuizBody = ({
  classes,
  modalStyle,
  questions: { question, answers, correctAnswer },
  handleQuestions,
  showAnswer,
  handleAnswers,
  setClickIndex,
  clickIndex,
}) => {
  const handleClickAnswer = (answer, i) => {
    handleAnswers(answer)
    setClickIndex(i)
  }

  return (
    <div>
      <div style={modalStyle} className={classes.paper}>
        <h2 style={{ marginBottom: 15 }}>{question}</h2>
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
              ${clickIndex === i && classes.selectedAnswerClick}
              `}
              onClick={() => handleClickAnswer(answer, i)}
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

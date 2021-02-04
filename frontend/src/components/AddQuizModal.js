import { useState, useEffect } from 'react'
import { Button, Grid, makeStyles, Modal, TextField } from '@material-ui/core'
import FormContainer from './FormContainer'

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 750,
    height: 630,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const AddQuizModal = ({ openQuiz, setOpenQuiz, quizzes }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('')
  const [currentIncorrectAnswer1, setCurrentIncorrectAnswer1] = useState('')
  const [currentIncorrectAnswer2, setCurrentIncorrectAnswer2] = useState('')
  const [currentIncorrectAnswer3, setCurrentIncorrectAnswer3] = useState('')
  const [questionLists, setQuestionLists] = useState(quizzes)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (questionLists.length > 0) {
      setCurrentIndex(0)
      setCurrentQuestion(questionLists[0].question)
      setCurrentCorrectAnswer(questionLists[0].correctAnswer)
      setCurrentIncorrectAnswer1(questionLists[0].incorrectAnswers[0])
      setCurrentIncorrectAnswer2(questionLists[0].incorrectAnswers[1])
      setCurrentIncorrectAnswer3(questionLists[0].incorrectAnswers[2])
    }
  }, [questionLists])

  const showCurrentSet = (list, i) => {
    setCurrentIndex(i)
    setCurrentQuestion(list.question)
    setCurrentCorrectAnswer(list.correctAnswer)
    setCurrentIncorrectAnswer1(list.incorrectAnswers[0])
    setCurrentIncorrectAnswer2(list.incorrectAnswers[1])
    setCurrentIncorrectAnswer3(list.incorrectAnswers[2])
  }

  const reset = () => {
    setCurrentQuestion('')
    setCurrentCorrectAnswer('')
    setCurrentIncorrectAnswer1('')
    setCurrentIncorrectAnswer2('')
    setCurrentIncorrectAnswer3('')
  }

  const addNewSet = () => {
    if (currentIndex > 4 || questionLists.length > 4) {
      alert('Maximum questions limit at 5')
    } else {
      setCurrentIndex(currentIndex + 1)
      setQuestionLists([
        ...questionLists,
        {
          question: '',
          correctAnswer: '',
          incorrectAnswers: ['', '', ''],
        },
      ])
      reset()
    }
  }

  //   const deleteCurrentSet = () => {
  //     if (currentIndex <= 0) {
  //       if (window.confirm('Do you want to remove quiz for this chapter?')) {
  //         alert('Quiz removed')
  //       }
  //     } else {
  //       setCurrentIndex(currentIndex - 1)
  //     }
  //   }

  const updateQuestion = () => {
    if (
      currentQuestion === '' &&
      currentCorrectAnswer === '' &&
      currentIncorrectAnswer1 === '' &&
      currentIncorrectAnswer2 === '' &&
      currentIncorrectAnswer3 === ''
    ) {
      alert('Connot submit empty field')
    } else {
      const newQuestion = {
        question: currentQuestion,
        correctAnswer: currentCorrectAnswer,
        incorrectAnswers: [
          currentIncorrectAnswer1,
          currentIncorrectAnswer2,
          currentIncorrectAnswer3,
        ],
      }
      if (currentIndex < 0 || questionLists.length < 0) {
        setQuestionLists([newQuestion])
      }
      let temp = questionLists
      let i = temp.indexOf(currentIndex)
      temp.splice(i, 1)
      const newList = [...temp, newQuestion]
      setQuestionLists(newList)
      alert(`Question ${currentIndex + 1} has been update.`)
    }
  }

  const questionForm = () => (
    <Grid container style={modalStyle} className={classes.paper} spacing={3}>
      <Grid item xs={12}>
        <h2>Question : {currentIndex + 1}</h2>
        <form>
          <FormContainer>
            <TextField
              required
              fullWidth
              type='text'
              label='Question'
              placeholder=''
              variant='filled'
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
          </FormContainer>
          <FormContainer>
            <TextField
              required
              fullWidth
              type='text'
              label='Correct Answer'
              placeholder=''
              variant='filled'
              value={currentCorrectAnswer}
              onChange={(e) => setCurrentCorrectAnswer(e.target.value)}
            />
          </FormContainer>
          <FormContainer>
            <TextField
              required
              fullWidth
              type='text'
              label='Incorrect Answer 1'
              placeholder=''
              variant='filled'
              value={currentIncorrectAnswer1}
              onChange={(e) => setCurrentIncorrectAnswer1(e.target.value)}
            />
          </FormContainer>
          <FormContainer>
            <TextField
              required
              fullWidth
              type='text'
              label='Incorrect Answer 2'
              placeholder=''
              variant='filled'
              value={currentIncorrectAnswer2}
              onChange={(e) => setCurrentIncorrectAnswer2(e.target.value)}
            />
          </FormContainer>
          <FormContainer>
            <TextField
              required
              fullWidth
              type='text'
              label='Incorrect Answer 3'
              placeholder=''
              variant='filled'
              value={currentIncorrectAnswer3}
              onChange={(e) => setCurrentIncorrectAnswer3(e.target.value)}
            />
          </FormContainer>
          <Button
            variant='contained'
            onClick={() => updateQuestion()}
            type='submit'
          >
            Comfirm
          </Button>
          <Button
            style={{ marginLeft: 7 }}
            variant='contained'
            onClick={() => reset()}
          >
            Reset
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        <h3>Question List</h3>
        {questionLists.length !== 0
          ? questionLists.map((list, i) => (
              <Button
                variant='outlined'
                key={i}
                onClick={() => showCurrentSet(list, i)}
              >
                {i + 1}
              </Button>
            ))
          : ''}
        {questionLists.length > 4 ? (
          ''
        ) : (
          <Button
            style={{ marginLeft: 7 }}
            variant='outlined'
            onClick={() => addNewSet()}
          >
            Add new
          </Button>
        )}

        <Button style={{ marginLeft: 7 }} variant='outlined'>
          Done
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Modal open={openQuiz} onClose={() => setOpenQuiz(false)}>
      {questionForm()}
    </Modal>
  )
}

export default AddQuizModal

import { useState, useEffect } from 'react'
import { Button, Grid, makeStyles, Modal, TextField } from '@material-ui/core'
import FormContainer from './FormContainer'
import { updateSingleQuiz } from '../actions/instructorActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'

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
  bgActive: {
    background: '#457B9D',
    color: '#fff',
  },
}))

const AddQuizModal = ({
  contentId,
  courseId,
  openQuiz,
  setOpenQuiz,
  quizzes,
}) => {
  const dispatch = useDispatch()
  const instructorContentQuizUpdate = useSelector(
    (state) => state.instructorContentQuizUpdate
  )
  const {
    success,
    error,
    loading,
    quizzes: newQuizzes,
  } = instructorContentQuizUpdate

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('')
  const [currentIncorrectAnswer1, setCurrentIncorrectAnswer1] = useState('')
  const [currentIncorrectAnswer2, setCurrentIncorrectAnswer2] = useState('')
  const [currentIncorrectAnswer3, setCurrentIncorrectAnswer3] = useState('')
  const [questionLists, setQuestionLists] = useState(quizzes)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentQuizId, setCurrentQuizId] = useState('')

  useEffect(() => {
    if (success) {
      if (newQuizzes) {
        setQuestionLists(newQuizzes)
        setCurrentIndex(0)
      } else {
        setQuestionLists(quizzes)
      }
    }

    if (questionLists.length > 0) {
      setCurrentIndex(0)
      setCurrentQuizId(questionLists[0]._id)
      setCurrentQuestion(questionLists[0].question)
      setCurrentCorrectAnswer(questionLists[0].correctAnswer)
      setCurrentIncorrectAnswer1(questionLists[0].incorrectAnswers[0])
      setCurrentIncorrectAnswer2(questionLists[0].incorrectAnswers[1])
      setCurrentIncorrectAnswer3(questionLists[0].incorrectAnswers[2])
    }
  }, [questionLists, success, newQuizzes])

  const showCurrentSet = (list, i) => {
    setCurrentIndex(i)
    setCurrentQuizId(list._id)
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
    if (questionLists.length > 4) {
      alert('Maximum questions limit at 5')
    } else {
      questionLists.push({
        quizId: questionLists.length - 1,
        question: questionLists.length - 1,
        correctAnswer: '',
        incorrectAnswers: ['', '', ''],
      })
      setCurrentIndex(questionLists.length - 1)
      setCurrentQuizId(questionLists.length - 1)
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

  const updateSingleQuestion = () => {
    if (
      currentQuestion === '' ||
      currentCorrectAnswer === '' ||
      currentIncorrectAnswer1 === '' ||
      currentIncorrectAnswer2 === '' ||
      currentIncorrectAnswer3 === ''
    ) {
      alert('Connot submit empty field')
    } else {
      let qid = currentQuizId === '' ? 'new' : currentQuizId

      dispatch(
        updateSingleQuiz(courseId, {
          contentId,
          quizId: qid,
          question: currentQuestion,
          correctAnswer: currentCorrectAnswer,
          incorrectAnswers: [
            currentIncorrectAnswer1,
            currentIncorrectAnswer2,
            currentIncorrectAnswer3,
          ],
        })
      )
    }
  }

  const questionForm = () => (
    <Grid container style={modalStyle} className={classes.paper} spacing={3}>
      <Grid item xs={12}>
        <h2>Question : {currentIndex + 1}</h2>
        {loading ? (
          <Loader />
        ) : (
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
            <Button variant='contained' onClick={() => updateSingleQuestion()}>
              Update
            </Button>
            <Button
              style={{ marginLeft: 7 }}
              variant='contained'
              onClick={() => reset()}
            >
              Reset
            </Button>
          </form>
        )}
      </Grid>
      <Grid item xs={12}>
        <h3>Question List</h3>
        {!questionLists || questionLists.length < 0 ? (
          <Loader left />
        ) : questionLists.length !== 0 ? (
          questionLists.map((list, i) => (
            <Button
              className={currentIndex === i ? classes.bgActive : ''}
              variant='outlined'
              key={i}
              onClick={() => showCurrentSet(list, i)}
            >
              {i + 1}
            </Button>
          ))
        ) : (
          ''
        )}

        {!questionLists || questionLists.length < 0 ? (
          <Loader left />
        ) : questionLists.length > 4 ? (
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

        <Button
          style={{ marginLeft: 7 }}
          variant='outlined'
          onClick={() => setOpenQuiz(false)}
        >
          Done
        </Button>
      </Grid>
    </Grid>
  )

  const closeModal = () => {
    reset()
    setOpenQuiz(false)
  }

  return (
    <Modal open={openQuiz} onClose={() => closeModal()}>
      {questionForm()}
    </Modal>
  )
}

export default AddQuizModal

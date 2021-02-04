import React, { useState, useEffect } from 'react'
import {
  Typography,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  makeStyles,
  Checkbox,
  Modal,
  Divider,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { useDispatch } from 'react-redux'
import { updateWatched } from '../actions/courseActions'
import Loader from './Loader'
import QuizBody from './QuizBody'

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: 'transparent',
    width: '100%',
    color: '#eee',
    border: '1px solid #eee',
  },
  accordionBody: {
    background: '#eee',
    color: '#090b2f',
  },
  materials: {
    borderTop: '1px solid #090b2f',
    background: '#eee',
    color: '#090b2f',
    paddingTop: 2,
    paddingBottom: 10,
  },
  quiz: {
    paddingTop: 10,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: 30,
  },
  questionAnswer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonAnswer: {
    textAlign: 'start',
    padding: 8,
    marginBottom: 7,
    background: '#eee',
    border: 'none',
    outline: 0,
  },
  bgWrong: {
    background: 'red',
    color: '#fff',
  },
  bgCorrect: {
    background: 'green',
    color: '#fff',
  },
}))

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const CourseContentList = ({
  content,
  selectTopicHandler,
  setSelectedVideoName,
  expanded,
  handleAccordion,
  courseId,
  watched,
}) => {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const shuffledQuestions = content.quizzes.map((questions) => ({
      ...questions,
      answers: [questions.correctAnswer, ...questions.incorrectAnswers].sort(
        () => Math.random() - 0.5
      ),
    }))
    setQuestions(shuffledQuestions)
    console.log(shuffledQuestions)
  }, [])

  const handleAnswers = (answer) => {
    if (!showAnswer) {
      if (answer === questions[currentIndex].correctAnswer) {
        setScore(score + 1)
      }
    }
    setShowAnswer(true)
  }

  const handleQuestions = () => {
    setShowAnswer(false)
    setCurrentIndex(currentIndex + 1)
  }

  const handleModalClose = () => {
    setOpen(false)
    setScore(0)
    setCurrentIndex(0)
    setShowAnswer(false)
  }

  const handleRetry = () => {
    setScore(0)
    setCurrentIndex(0)
    setShowAnswer(false)
  }

  const body =
    questions.length !== 0 ? (
      questions.length <= currentIndex ? (
        <div style={modalStyle} className={classes.paper}>
          <div style={{ textAlign: 'center' }}>
            <h3>Your Score: {score}</h3>
            <Button onClick={handleRetry}>Retry</Button>
            <Button onClick={handleModalClose}>Exit</Button>
          </div>
        </div>
      ) : (
        <QuizBody
          classes={classes}
          modalStyle={modalStyle}
          questions={questions[currentIndex]}
          handleQuestions={handleQuestions}
          handleAnswers={handleAnswers}
          showAnswer={showAnswer}
        />
      )
    ) : (
      <div style={modalStyle} className={classes.paper}>
        <Loader />
      </div>
    )

  const checkWatched = () => {
    if (checked === true) {
      setChecked(false)
      dispatch(
        updateWatched(courseId, {
          id: content._id,
          watch: false,
        })
      )
    } else {
      setChecked(true)
      dispatch(
        updateWatched(courseId, {
          id: content._id,
          watch: true,
        })
      )
    }
  }

  useEffect(() => {
    setChecked(watched)
  }, [watched])

  return (
    <ListItemText key={content._id}>
      <Accordion
        className={classes.accordion}
        expanded={expanded === content.chapter}
        onChange={handleAccordion(content.chapter)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: '#eee' }} />}
          aria-controls='course-content'
          id='course-content-panel-header'
        >
          <Typography variant='body1' component='span'>
            Chapter {content.chapter}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionBody}>
          <Checkbox checked={checked} onChange={checkWatched} color='primary' />
          <Button
            size='small'
            onClick={() => {
              selectTopicHandler(content._id)
              setSelectedVideoName({
                name: content.name,
                chapter: content.chapter,
              })
            }}
          >
            <h4
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'start',
              }}
            >
              <PlayCircleFilledIcon />
              <div style={{ marginLeft: 7 }}>{content.name}</div>
            </h4>
          </Button>
        </AccordionDetails>
        <div className={`${classes.materials} ${classes.quiz}`}>
          <strong style={{ margin: 7 }}>Quiz</strong>
          <Button variant='contained' onClick={() => setOpen(true)}>
            Take Quiz
          </Button>

          <Modal open={open} onClose={handleModalClose}>
            {body}
          </Modal>
        </div>
        <div className={classes.materials}>
          <h4 style={{ margin: 7 }}>Supporting Materials</h4>
          <ul>
            <li>PDF File</li>
            <li>Slides File</li>
          </ul>
        </div>
      </Accordion>
    </ListItemText>
  )
}

export default CourseContentList

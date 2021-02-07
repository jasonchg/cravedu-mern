import React, { useState } from 'react'
import {
  makeStyles,
  Modal,
  Backdrop,
  Button,
  Typography,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import Message from '../components/Message'

import FormContainer from './FormContainer'
import ProgressBar from '../components/ProgressBar'
import { updateContent } from '../actions/instructorActions'
import { useDispatch, useSelector } from 'react-redux'
import { myTrim } from '../utils'
import axios from 'axios'
import { INSTRUCTOR_UPDATE_CONTENT_FAIL } from '../constants/instructorConstants'
import AddQuizModal from './AddQuizModal'
import Loader from './Loader'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    pading: '20px',
    width: '400px',
    marginTop: 20,
    flexDirection: 'column',
  },
}))

const Modals = ({ modalOpen = false, modalClose, content, courseId }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const classes = useStyles()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [videoUploading, setVideoUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [name, setName] = useState(content.name)
  const [video, setVideo] = useState('')

  const [isPublished, setIsPublished] = useState(content.isPublished)

  const [openQuiz, setOpenQuiz] = useState(false)

  const uploadVideoHandler = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append(myTrim(name), file)
    setVideoUploading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data, progress } = await axios.post(
        `/api/upload/${courseId}/course-content`,
        formData,
        config
      )
      setError(false)
      setProgress(progress)
      setVideo(myTrim(data))
      setVideoUploading(false)
    } catch (err) {
      setVideoUploading(false)
      setError(err.message)
      dispatch({ type: INSTRUCTOR_UPDATE_CONTENT_FAIL })
      alert('Please Retry.')
    }
  }

  const updateContentHandler = (e) => {
    e.preventDefault()
    if (content.name === name && content.video === video) {
      modalClose()
    } else {
      dispatch(
        updateContent(courseId, {
          contentId: content._id,
          name,
          isPublished,
          video,
        })
      )
      modalClose()
    }
  }

  const handlePublishedCheck = (e, isChecked) => {
    setIsPublished(isChecked)
  }

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={modalClose}
      BackdropComponent={Backdrop}
    >
      {!content ? (
        <Loader />
      ) : (
        <div className={classes.paper}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Typography variant='caption'>
                Chapter {content.chapter}
              </Typography>
              <Typography variant='h4'>{content.name}</Typography>
            </div>
            <div style={{ marginTop: 10 }}>
              <FormContainer>
                <FormControlLabel
                  label='Published'
                  control={
                    <Checkbox
                      checked={isPublished}
                      onChange={handlePublishedCheck}
                      name='isPublished'
                      color='primary'
                    />
                  }
                />
              </FormContainer>
            </div>
          </div>

          <Divider />
          <form
            onSubmit={updateContentHandler}
            method='post'
            encType='multipart/form-data'
          >
            <div className={classes.form}>
              <FormContainer>
                <TextField
                  required
                  fullWidth
                  type='text'
                  label='Content Name'
                  placeholder=''
                  variant='filled'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormContainer>

              <FormContainer>
                {content.quizzes.length > 0 ? (
                  <Button variant='contained' onClick={() => setOpenQuiz(true)}>
                    Edit Quizzes
                  </Button>
                ) : (
                  <Button variant='contained' onClick={() => setOpenQuiz(true)}>
                    Add Quiz
                  </Button>
                )}

                <AddQuizModal
                  openQuiz={openQuiz}
                  setOpenQuiz={setOpenQuiz}
                  quizzes={content.quizzes ? content.quizzes : []}
                  courseId={courseId}
                  contentId={content._id}
                />
              </FormContainer>

              <FormContainer>
                <Typography>Video Resource</Typography>
                <input
                  type='file'
                  name={myTrim(video)}
                  placeholder='Enter Image Url'
                  onChange={uploadVideoHandler}
                />

                <p style={{ background: '#eee', padding: 7 }}>
                  <small>New path name:</small>{' '}
                  {content.video ? content.video.substr(34) : '/'}
                </p>
                {videoUploading && <ProgressBar progress={progress} />}
                {error && <Message>{error}</Message>}
              </FormContainer>

              <FormContainer>
                <Button
                  variant='outlined'
                  type='submit'
                  disabled={error ? true : false}
                >
                  Done
                </Button>
                <Button size='small' onClick={() => modalClose()}>
                  Close
                </Button>
              </FormContainer>
            </div>
          </form>
        </div>
      )}
    </Modal>
  )
}
export default Modals

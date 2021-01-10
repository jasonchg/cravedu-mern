import React, { useState } from 'react'
import {
  makeStyles,
  Modal,
  Backdrop,
  Menu,
  MenuItem,
  Button,
  Typography,
  Divider,
  TextField,
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FormContainer from './FormContainer'
import ProgressBar from '../components/ProgressBar'
import { updateContent } from '../actions/instructorActions'
import { useDispatch, useSelector } from 'react-redux'
import { myTrim } from '../utils'
import axios from 'axios'

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

const Modals = ({ modalOpen, modalClose, content, courseId }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const classes = useStyles()
  const dispatch = useDispatch()
  const [videoUploading, setVideoUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [name, setName] = useState(content.name)
  const [chapter, setChapter] = useState(content.chapter)
  const [optionOpen, setOptionOpen] = useState(null)
  const [video, setVideo] = useState('')

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
      const { data } = await axios.post(
        `/api/upload/${courseId}/course-content`,
        formData,
        config
      )
      setVideo(myTrim(data))
      setVideoUploading(false)
    } catch (e) {
      console.error(e)
      setVideoUploading(false)
    }
  }

  const updateContentHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateContent(courseId, {
        contentId: content._id,
        name,
        chapter,
        video,
      })
    )
    modalClose()
  }

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={modalClose}
      BackdropComponent={Backdrop}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <div className={classes.paper}>
        <Typography variant='caption'>{content.chapter}</Typography>
        <Typography variant='h4'>
          {content.name}{' '}
          <Button size='small' onClick={() => modalClose()}>
            Close
          </Button>
        </Typography>

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
              <Typography>Video</Typography>
              <input
                type='file'
                name={myTrim(video)}
                placeholder='Enter Image Url'
                onChange={uploadVideoHandler}
              />

              <p style={{ background: '#eee', padding: 7 }}>
                {content && content.video !== '' && content.video.length !== 0
                  ? content.video.substr(34)
                  : '/'}
              </p>
              {videoUploading && <ProgressBar progress={progress} />}
            </FormContainer>

            <FormContainer>
              <Button variant='outlined' type='submit'>
                Done
              </Button>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={(e) => setOptionOpen(e.currentTarget)}
              >
                <MoreVertIcon />
              </Button>
              <Menu
                anchorEl={optionOpen}
                keepMounted
                open={Boolean(optionOpen)}
                onClose={() => setOptionOpen(null)}
              >
                <MenuItem onClick={() => setOptionOpen(null)}>
                  Delete Video
                </MenuItem>
                <Divider />
                <MenuItem
                  style={{ color: 'red' }}
                  onClick={() => setOptionOpen(null)}
                >
                  Delete Topic
                </MenuItem>
              </Menu>
            </FormContainer>
          </div>
        </form>
      </div>
    </Modal>
  )
}
export default Modals

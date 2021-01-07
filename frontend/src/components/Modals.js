import React, { useState, useEffect } from 'react'
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
import { myTrim } from '../utils'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FormContainer from './FormContainer'
import ProgressBar from '../components/ProgressBar'
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

const Modals = ({
  modalOpen,
  modalClose,
  content,
  uploadVideoHandler,
  videoUploading,
  progress,
}) => {
  const classes = useStyles()
  const [optionOpen, setOptionOpen] = useState(null)
  const [contentName, setContentName] = useState('')
  const [contentChapter, setContentChapter] = useState('')
  const [videoPath, setVideoPath] = useState('')

  useEffect(() => {
    if (content) {
      setContentName(content.name)
      setVideoPath(content.video)
    } else {
      modalClose()
    }
  }, [content])

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
        <Typography variant='caption'>{contentChapter}</Typography>
        <Typography variant='h4'>{contentName}</Typography>
        <Divider />

        <form
          onSubmit={uploadVideoHandler}
          method='post'
          encType='multipart/form-data'
        >
          <div className={classes.form}>
            <FormContainer>
              <TextField
                required
                fullWidth
                id='name'
                type='text'
                label='Content Name'
                placeholder=''
                variant='filled'
                value={contentName}
                autoComplete='text'
                onChange={(e) => setContentName(e.target.value)}
              />
            </FormContainer>

            <FormContainer>
              <Typography>Video</Typography>
              <input
                type='file'
                name={myTrim(contentName)}
                placeholder='Enter Image Url'
              />

              <p style={{ background: '#eee', padding: 7 }}>
                {videoPath !== '' && videoPath.length == 0
                  ? videoPath.substr(34)
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

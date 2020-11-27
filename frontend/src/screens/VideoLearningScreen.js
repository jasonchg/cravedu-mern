import React, { useEffect, useState } from 'react'

import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Box,
  Paper,
  Button,
  Avatar,
  ListItemAvatar,
  Modal,
  TextField,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { makeStyles } from '@material-ui/core/styles'
import { addQanda, listCourseDetails } from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import VideoPlayer from '../components/VideoPlayer'
import PropTypes from 'prop-types'
import FormContainer from '../components/FormContainer'
import { COURSE_QANDA_RESET } from '../constants/courseConstants'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`course-${index}`}
      aria-labelledby={`course-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}
const a11yProps = (index) => {
  return {
    id: `course-tab-${index}`,
    'aria-controls': `course-tabpanel-${index}`,
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  upperSection: {
    background: '#1d2747',
    padding: 20,
  },
  paper: {
    background: '#f0f0f0',
    margin: 'auto',
    marginTop: 10,
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPaper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #777',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
  },
  qandaSection: {
    background: '#fff',
    maxHeight: 700,
    overflow: 'scroll',
    overflowX: 'hidden',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  description: {
    textAlign: 'justify',
  },
  button: {
    margin: 12,
    width: 175,
    padding: 15,
  },
  accordion: {
    background: 'transparent',
    width: '100%',
    color: '#eee',
    border: '1px solid #eee',
  },
  player: {
    height: 1500,
  },
  courseContents: {
    padding: 20,
    minHeight: 443,
    maxHeight: 1500,
    overflow: 'visible',
    overflowX: 'hidden',
  },
  titleHead: {
    marginBottom: 10,
    color: '#eee',
    padding: 7,
    fontStyle: 'bold',
  },
  contentChapter: {
    color: '#eee',
  },
  tabPanelArea: {
    minHeight: 500,
  },
}))

const VideoLearningScreen = ({ match, history, location }) => {
  const courseId = match.params.id
  const dispatch = useDispatch()

  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState('')
  const [selectedVideoName, setSelectedVideoName] = useState({
    name: '',
    chapter: '',
  })
  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const courseQanda = useSelector((state) => state.courseQanda)
  const {
    loading: qandaLoading,
    error: qandaError,
    success: qandaSuccess,
  } = courseQanda
  const [value, setValue] = useState(0)
  const [question, setQuestion] = useState('')
  const tabHandler = (event, newValue) => {
    setValue(newValue)
  }

  // func : get the actual video path
  const getVideoPath = (content, id) => {
    return (
      content &&
      String(
        content.filter(function (item) {
          return item._id === id
        })[0].video
      )
    )
  }

  useEffect(() => {
    if (qandaSuccess) {
      setQuestion('')
      dispatch({ type: COURSE_QANDA_RESET })
      alert('Question Submitted')
    }
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!course || !course.name || course._id !== courseId) {
        dispatch(listCourseDetails(courseId))
        setSelectedVideo('')
      } else {
        history.push(
          `/course/${courseId}/learn?chapter=${course.courseContents[0]._id}`
        )
        setSelectedVideoName({
          name: course.courseContents[0].name,
          chapter: course.courseContents[0].chapter,
        })
        setSelectedVideo(
          getVideoPath(course.courseContents, course.courseContents[0]._id)
        )
      }
    }
  }, [userInfo, history, dispatch, courseId, course, qandaSuccess])

  // 2 func : set video to the video player
  const selectTopicHandler = (chapterId) => {
    setSelectedVideo(getVideoPath(course.courseContents, chapterId))
    history.push(`/course/${courseId}/learn?chapter=${chapterId}`)
  }

  // 3 func : add qanda handler

  const qandaHandler = (e) => {
    e.preventDefault()
    dispatch(addQanda(courseId, { question }))
    setModalOpen(false)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div className={classes.upperSection}>
            <Container className={classes.root}>
              <span className={classes.titleHead}>
                <Typography variant='h4' component='p'>
                  {selectedVideoName.chapter} - {selectedVideoName.name}
                </Typography>
                <Typography variant='subtitle1' component='p'>
                  From {course.name} by {course.instructor}
                </Typography>
              </span>

              <Grid container spacing={0}>
                <Grid item xs={9}>
                  <VideoPlayer
                    className={classes.player}
                    videoPath={selectedVideo}
                  />
                </Grid>

                <Grid item xs={3}>
                  <div className={classes.courseContents}>
                    <Typography
                      variant='h6'
                      component='p'
                      className={classes.contentChapter}
                    >
                      {course.courseContents && course.courseContents.length}{' '}
                      Chapters
                    </Typography>

                    <List>
                      {course.courseContents ? (
                        course.courseContents.map((content) => (
                          <ListItemText key={content._id}>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={
                                  <ExpandMoreIcon style={{ color: '#eee' }} />
                                }
                                aria-controls='course-content'
                                id='course-content-panel-header'
                              >
                                <Typography variant='body1' component='span'>
                                  {content.chapter}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Button
                                  onClick={() => {
                                    selectTopicHandler(content._id)
                                    setSelectedVideoName({
                                      name: content.name,
                                      chapter: content.chapter,
                                    })
                                  }}
                                >
                                  <Typography
                                    variant='body1'
                                    component='span'
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      color: '#eee',
                                    }}
                                  >
                                    <PlayCircleFilledIcon />
                                    <div style={{ marginLeft: 7 }}>
                                      {content.name}
                                    </div>
                                  </Typography>
                                </Button>
                              </AccordionDetails>
                            </Accordion>
                          </ListItemText>
                        ))
                      ) : (
                        <Loader />
                      )}
                    </List>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
          <Container>
            <Grid container>
              <Grid item xs={12} className={classes.tabPanelArea}>
                <Paper>
                  <Tabs
                    onChange={tabHandler}
                    aria-label='course tabs'
                    value={value}
                  >
                    <Tab label='About this Course' {...a11yProps(0)} />
                    <Tab label='Q&A' {...a11yProps(1)} />
                    <Tab label='Annoucement' {...a11yProps(2)} />
                  </Tabs>
                </Paper>

                <TabPanel value={value} index={0}>
                  <List>
                    <ListItem className={classes.description}>
                      <ListItemText
                        primary={`Description: ${course.description}`}
                      />
                    </ListItem>
                    <Divider />
                  </List>
                </TabPanel>

                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  aria-labelledby='qanda'
                  aria-describedby='qanda-pool'
                  className={classes.modalContainer}
                >
                  <div className={classes.modalPaper}>
                    <form onSubmit={qandaHandler}>
                      <FormContainer>
                        <TextField
                          required
                          fullWidth
                          id='question'
                          type='text'
                          label='Your Question'
                          placeholder=''
                          variant='filled'
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                      </FormContainer>
                      <Button type='submit' variant='contained' color='primary'>
                        Post
                      </Button>
                      <Button onClick={() => setModalOpen(false)}>
                        Cancel
                      </Button>
                    </form>
                  </div>
                </Modal>

                <TabPanel value={value} index={1}>
                  <List>
                    <ListItem style={{ display: 'flex' }}>
                      <h3 style={{ flex: 1 }}>
                        {course.courseQASection
                          ? course.courseQASection.length
                          : 0}{' '}
                        questions in this course
                      </h3>
                      <Button
                        onClick={() => setModalOpen(true)}
                        size='medium'
                        style={{
                          padding: 15,
                          fontSize: 12,
                        }}
                        color='inherit'
                        variant='text'
                      >
                        Ask a new question?
                      </Button>
                    </ListItem>
                    <Divider />

                    {qandaError && <Message>{qandaError}</Message>}
                    <div className={classes.qandaSection}>
                      {course &&
                      course.courseQASection &&
                      course.courseQASection.length !== 0 ? (
                        course.courseQASection.map((qanda) => (
                          <div
                            key={qanda._id}
                            className={classes.questionBlock}
                          >
                            <ListItem alignItems='flex-start'>
                              <ListItemAvatar>
                                <Avatar style={{ marginRight: 10 }}>
                                  {qanda.userName.charAt(0)}
                                </Avatar>
                              </ListItemAvatar>
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '7fr .7fr',
                                }}
                              >
                                <div>
                                  <ListItemText
                                    primary={<strong>{qanda.question}</strong>}
                                    secondary={
                                      <span>
                                        <Typography
                                          component='span'
                                          variant='body2'
                                          color='textPrimary'
                                        >
                                          {qanda.userName}
                                        </Typography>{' '}
                                        {qanda.createdAt.substring(10, 0)}
                                      </span>
                                    }
                                  />
                                </div>
                                <div>
                                  <Button size='small'>
                                    I know the answer
                                  </Button>
                                </div>
                              </div>
                            </ListItem>
                            <Divider variant='inset' component='li' />
                          </div>
                        ))
                      ) : (
                        <ListItem>No any question just yet.</ListItem>
                      )}
                    </div>
                  </List>
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <List>
                    <ListItem className={classes.description}>
                      <ListItemText primary={`There is no any annoucement.`} />
                    </ListItem>
                    <Divider />
                  </List>
                </TabPanel>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  )
}

export default VideoLearningScreen

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
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { makeStyles } from '@material-ui/core/styles'
import { listCourseDetails } from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import VideoPlayer from '../components/VideoPlayer'
import PropTypes from 'prop-types'
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
  },
  paper: {
    background: '#f0f0f0',
    margin: 'auto',
    marginTop: 10,
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
    background: '#f0f0f0',
    width: '100%',
  },
  player: {
    height: 1500,
  },
  courseContents: {
    padding: 10,
    minHeight: 443,
  },
  questionBlock: {},
  titleHead: {
    marginBottom: 10,
    padding: 7,
  },
}))

const VideoLearningScreen = ({ match, history, location }) => {
  const courseId = match.params.id
  const dispatch = useDispatch()

  const classes = useStyles()

  const [selectedVideo, setSelectedVideo] = useState('')
  const [selectedVideoName, setSelectedVideoName] = useState({
    name: '',
    chapter: '',
  })

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course, success: courseSuccess } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [value, setValue] = useState(0)

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

  // URL
  // to store the last video that user watched
  // let getVideoId = ''
  // let param = new URLSearchParams(location.search)
  // getVideoId = param.get('chapter')

  // useEffect : redirect to respective video
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (courseSuccess) {
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
      } else {
        dispatch(listCourseDetails(courseId))
        setSelectedVideo('')
      }
    }
  }, [userInfo, history, dispatch, courseId, courseSuccess, course])

  // 2 func : set video to the video player
  const selectTopicHandler = (chapterId) => {
    setSelectedVideo(getVideoPath(course.courseContents, chapterId))
    history.push(`/course/${courseId}/learn?chapter=${chapterId}`)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
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
              <div>
                <VideoPlayer
                  className={classes.player}
                  videoPath={selectedVideo}
                />
              </div>

              <div>
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

                <TabPanel value={value} index={1}>
                  <List>
                    <ListItem style={{ display: 'flex' }}>
                      <h3 style={{ flex: 1 }}>3 questions in this course</h3>
                      <Button
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
                    <div className={classes.questionBlock}>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar style={{ marginRight: 10 }}>S</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <strong>
                              Can you please update your course to the latest
                              version? I dont understand the new Docs that
                              published recently!
                            </strong>
                          }
                          secondary={
                            <span>
                              <Typography
                                component='span'
                                variant='body2'
                                color='textPrimary'
                              >
                                Sam Smith
                              </Typography>
                              {' - 2020/11/10 1:10AM'}
                            </span>
                          }
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </div>
                    <div className={classes.questionBlock}>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar style={{ marginRight: 10 }}>K</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <strong>I don't understand at all...</strong>
                          }
                          secondary={
                            <span>
                              <Typography
                                component='span'
                                variant='body2'
                                color='textPrimary'
                              >
                                Kiki
                              </Typography>
                              {' - 2020/10/10 2:10PM'}
                            </span>
                          }
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </div>
                    <div className={classes.questionBlock}>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar style={{ marginRight: 10 }}>R</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<strong>Why need so many classes?</strong>}
                          secondary={
                            <span>
                              <Typography
                                component='span'
                                variant='body2'
                                color='textPrimary'
                              >
                                Roger Liew
                              </Typography>
                              {' - 2020/11/10 1:10AM'}
                            </span>
                          }
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </div>
                  </List>
                </TabPanel>

                <TabPanel value={value} index={2}>
                  There is no any annnouce just yet
                </TabPanel>
              </div>
            </Grid>

            <Grid item xs={3}>
              <Paper className={classes.courseContents}>
                <h2>Course Contents</h2>

                <List>
                  {course.courseContents ? (
                    course.courseContents.map((content) => (
                      <ListItemText key={content._id}>
                        <Accordion className={classes.accordion}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='course-content'
                            id='course-content-panel-header'
                          >
                            <Typography variant='body1' component='span'>
                              {content.chapter}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            style={{
                              background: '#eaeaea',
                            }}
                          >
                            <Button
                              onClick={() => {
                                selectTopicHandler(content._id)
                                setSelectedVideoName({
                                  name: content.name,
                                  chapter: content.chapter,
                                })
                              }}
                            >
                              <Typography variant='body1' component='span'>
                                <PlayCircleFilledIcon /> {content.name}
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
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default VideoLearningScreen

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
import { saveVideoCurrent } from '../actions/userActions'
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
          <Typography>{children}</Typography>
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

const VideoLearningScreen = ({ match, history, location }) => {
  const courseId = match.params.id
  const dispatch = useDispatch()

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
  }))
  const classes = useStyles()

  const [selectedVideo, setSelectedVideo] = useState('')

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCourses = useSelector((state) => state.userCourses)
  const { userPaidCourses } = userCourses

  const [value, setValue] = useState(0)
  const tabHandler = (event, newValue) => {
    setValue(newValue)
  }

  const selectTopicHandler = (chapterId) => {
    dispatch(saveVideoCurrent(chapterId))
    history.push(`/course/${courseId}/learn?chapter=${chapterId}`)
  }

  let param = new URLSearchParams(location.search)
  let getVideoId = param.get('chapter')

  // check if user already logged in
  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      dispatch(listCourseDetails(courseId))
    }
  }, [history, courseId])

  const getVideoPath = (content, id) => {
    return (
      content &&
      content.filter(function (item) {
        return item._id === id
      })[0].video
    )
  }

  // Check if the link doenst carrying any video ids
  useEffect(() => {
    if (course) {
      if (
        getVideoId !== '' &&
        typeof getVideoId !== 'undefined' &&
        getVideoId !== null
      ) {
        history.push(`/course/${courseId}/learn?chapter=${getVideoId}`)
      } else {
        if (course) {
          getVideoId = course.courseContents[0]._id
          setSelectedVideo(getVideoPath(course.courseContents, getVideoId))
        }
      }
    }
  }, [course, history, getVideoId])

  useEffect(() => {
    let videoPath

    if (course) {
      videoPath = getVideoPath(course.courseContents, getVideoId)
      if (videoPath !== '') {
        setSelectedVideo(videoPath)
      }
    }
  }, [course, getVideoId])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Container className={classes.root}>
          <div style={{ marginBottom: 10 }}>
            <Typography variant='h4'>{course.name}</Typography>
            <Typography variant='subtitle1'>
              {`Created by ${course.instructor}`}
            </Typography>
          </div>

          <Grid container spacing={0}>
            <Grid item xs={8}>
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
                    <p className={classes.questionBlock}>
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
                            <p>
                              <Typography
                                component='span'
                                variant='body2'
                                color='textPrimary'
                              >
                                Sam Smith
                              </Typography>
                              {' - 2020/11/10 1:10AM'}
                            </p>
                          }
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </p>
                    <p className={classes.questionBlock}>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar style={{ marginRight: 10 }}>K</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <strong>I don't understand at all...</strong>
                          }
                          secondary={
                            <p>
                              <Typography
                                component='span'
                                variant='body2'
                                color='textPrimary'
                              >
                                Kiki
                              </Typography>
                              {' - 2020/10/10 2:10PM'}
                            </p>
                          }
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </p>
                    <p className={classes.questionBlock}>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar style={{ marginRight: 10 }}>R</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<strong>Why need so many classes?</strong>}
                          secondary={
                            <p>
                              <Typography
                                component='span'
                                variant='body2'
                                color='textPrimary'
                              >
                                Roger Liew
                              </Typography>
                              {' - 2020/11/10 1:10AM'}
                            </p>
                          }
                        />
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </p>
                  </List>
                </TabPanel>

                <TabPanel value={value} index={2}>
                  There is no any annnouce just yet
                </TabPanel>
              </div>
            </Grid>

            <Grid item xs={4}>
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
                            <Typography>{content.chapter}</Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            style={{
                              background: '#eaeaea',
                            }}
                          >
                            <Button
                              onClick={() => selectTopicHandler(content._id)}
                            >
                              <Typography>
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

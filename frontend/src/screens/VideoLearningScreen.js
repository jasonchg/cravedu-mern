import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  Box,
  Paper,
  Button,
  Modal,
  TextField,
  makeStyles,
} from '@material-ui/core'
import {
  addQanda,
  createReview,
  listCourseDetails,
} from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import VideoPlayer from '../components/VideoPlayer'
import PropTypes from 'prop-types'
import FormContainer from '../components/FormContainer'
import {
  COURSE_QANDA_RESET,
  COURSE_REVIEW_RESET,
} from '../constants/courseConstants'
import ReactStars from 'react-rating-stars-component'
import CourseContentList from '../components/CourseContentList'
import { getUserCourses, updateUserCourses } from '../actions/userActions'
import { USER_WATCHED_CONTENT_RESET } from '../constants/userConstants'
import QuestionThread from '../components/QuestionThread'
import InsturctorCard from '../components/InsturctorCard'
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
  paper: {
    background: '#f1faee',
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
    height: 240,
    backgroundColor: '#f1faee',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
  },
  qandaSection: {
    marginTop: 3,
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
const VideoLearningScreen = ({ history }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState('')
  const [selectedVideoName, setSelectedVideoName] = useState({
    name: '',
    chapter: '',
  })
  const [selectedVideoId, setSelectedVideoId] = useState('')
  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const courseQanda = useSelector((state) => state.courseQanda)
  const { error: qandaError, success: qandaSuccess } = courseQanda
  const courseReview = useSelector((state) => state.courseReview)
  const {
    error: reviewError,
    success: reviewSuccess,
    loading: reviewLoading,
  } = courseReview
  const [value, setValue] = useState(0)
  const [question, setQuestion] = useState('')
  const [ratingStars, setRatingStars] = useState(5)
  const [comment, setComment] = useState('')
  const [alreadyReview, setAlreadyReview] = useState(false)
  const { course_slug } = useParams()
  const userCourses = useSelector((state) => state.userCourses)
  const { userPaidCourses } = userCourses
  const contentWatched = useSelector((state) => state.contentWatched)
  const { success: contentWatchedSuccess } = contentWatched
  const [currentUserPaidCourse, setCurrentUserPaidCourse] = useState(null)
  const [newCourseContent, setNewCourseContent] = useState([])
  const userUpdateContent = useSelector((state) => state.userUpdateContent)
  const {
    error: userUpdateContentError,
    success: userUpdateContentSuccess,
    loading: userUpdateContentLoading,
  } = userUpdateContent

  const tabHandler = (event, newValue) => {
    setValue(newValue)
  }

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
    const getCertify = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        await axios.put(`/api/users/${course._id}/course-completed`, {}, config)

        alert(
          `Congratulation! You've completed this course. A certificate will be send to your mailbox soon.`
        )
      } catch (err) {
        console.log(err)
      }
    }

    const checkReview = (reviews, userId) => {
      return reviews.some((revItem) => {
        if (revItem.user === userId) {
          return true
        } else {
          return null
        }
      })
    }

    if (contentWatchedSuccess || userUpdateContentSuccess) {
      dispatch({ type: USER_WATCHED_CONTENT_RESET })
      history.go(0)
    }

    if (qandaSuccess || reviewSuccess) {
      setQuestion('')
      setComment('')
      setAlreadyReview(true)
      dispatch({ type: COURSE_QANDA_RESET })
      dispatch({ type: COURSE_REVIEW_RESET })
    }

    if (!userInfo) {
      history.push('/login')
    } else {
      if (!course || !course.name || course.slug !== course_slug) {
        dispatch(listCourseDetails(course_slug))
        dispatch(getUserCourses())
        setSelectedVideo('')
      } else {
        setNewCourseContent(
          course.courseContents.filter(
            (content) => content.isPublished === true
          )
        )

        if (
          userPaidCourses ||
          (userPaidCourses && userPaidCourses.length !== 0) ||
          (userPaidCourses && userPaidCourses !== [])
        ) {
          let currentCourse = userPaidCourses.find((x) => x._id === course._id)

          if (currentCourse) {
            setCurrentUserPaidCourse(currentCourse)
            setAlreadyReview(checkReview(course.reviews, userInfo._id))

            if (currentUserPaidCourse && currentUserPaidCourse.courseContents) {
              let notYetWatchContent = currentUserPaidCourse.courseContents.find(
                (x) => x.watched !== true
              )

              if (
                !notYetWatchContent ||
                notYetWatchContent.length === 0 ||
                notYetWatchContent === []
              ) {
                if (
                  currentUserPaidCourse &&
                  currentUserPaidCourse.completedCertificate === ''
                ) {
                  getCertify()
                } else {
                  console.log('Has Cert')
                }
              } else {
                let courseContentsPublishCheck = course.courseContents.find(
                  (x) => x._id === notYetWatchContent.chapterId
                )

                if (
                  notYetWatchContent &&
                  courseContentsPublishCheck.isPublished !== false
                ) {
                  history.push(
                    `/course/${course_slug}/learn?chapter=${notYetWatchContent.chapterId}`
                  )
                  setSelectedVideoName({
                    name: course.courseContents.find(
                      (x) => x._id === notYetWatchContent.chapterId
                    ).name,
                    chapter: course.courseContents.find(
                      (x) => x._id === notYetWatchContent.chapterId
                    ).chapter,
                  })
                  setSelectedVideoId(notYetWatchContent.chapterId)
                  setSelectedVideo(
                    getVideoPath(
                      course.courseContents,
                      notYetWatchContent.chapterId
                    )
                  )
                } else {
                  if (
                    currentUserPaidCourse &&
                    currentUserPaidCourse.completedCertificate === ''
                  ) {
                    getCertify()
                  } else {
                    console.log('Has Cert')
                  }
                }
              }
            } else {
              history.push(
                `/course/${course_slug}/learn?chapter=${course.courseContents[0]._id}`
              )

              setSelectedVideoName({
                name: course.courseContents[0].name,
                chapter: course.courseContents[0].chapter,
              })

              setSelectedVideoId(course.courseContents[0]._id)
              setSelectedVideo(
                getVideoPath(
                  course.courseContents,
                  course.courseContents[0]._id
                )
              )
            }
          } else {
            history.push('/')
          }
        }
      }
    }
  }, [
    contentWatchedSuccess,
    currentUserPaidCourse,
    userPaidCourses,
    userInfo,
    history,
    dispatch,
    course_slug,
    course,
    qandaSuccess,
    reviewSuccess,
  ])

  const selectTopicHandler = (chapterId) => {
    setSelectedVideo(getVideoPath(course.courseContents, chapterId))
    setSelectedVideoId(chapterId)
    history.push(`/course/${course_slug}/learn?chapter=${chapterId}`)
  }

  const qandaHandler = (e) => {
    dispatch(addQanda(course._id, { question }))
    setModalOpen(false)
  }

  const reviewSubmitHandler = (e) => {
    dispatch(createReview(course._id, { ratingStars, comment }))
  }

  const [expanded, setExpanded] = useState(false)

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      {loading || !course ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div className='upperSection'>
            <Container className={classes.root}>
              <span className={classes.titleHead}>
                <Typography variant='h4' component='p'>
                  Chapter {selectedVideoName.chapter} - {selectedVideoName.name}
                </Typography>
                <Typography variant='subtitle1' component='p'>
                  From {course.name} by {course.instructor}
                </Typography>
              </span>

              <Grid container spacing={0}>
                <Grid item md={9} xs={12}>
                  <VideoPlayer
                    className={classes.player}
                    videoPath={selectedVideo}
                    selectedVideoId={selectedVideoId}
                    courseId={course && course._id}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <div className={classes.courseContents}>
                    <Typography
                      variant='h6'
                      component='p'
                      className={classes.contentChapter}
                    >
                      {newCourseContent.length} Chapters
                    </Typography>

                    <List>
                      {newCourseContent ? (
                        newCourseContent.map((content) => {
                          return content.isPublished ? (
                            <CourseContentList
                              key={content._id}
                              courseId={course._id}
                              content={content}
                              expanded={expanded}
                              handleAccordion={handleAccordion}
                              setSelectedVideoName={setSelectedVideoName}
                              selectTopicHandler={selectTopicHandler}
                              watched={
                                currentUserPaidCourse &&
                                currentUserPaidCourse.courseContents.find(
                                  (x) => x.chapterId === content._id
                                ).watched
                              }
                            />
                          ) : (
                            ''
                          )
                        })
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

                    {alreadyReview === false ? (
                      <Tab label='Review This Course' {...a11yProps(3)} />
                    ) : (
                      <Tab label='Alraedy Reviewed' disabled />
                    )}
                  </Tabs>
                </Paper>

                <TabPanel value={value} index={0}>
                  <div className={classes.description}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: course.description,
                      }}
                    />

                    {!course || !course.instructor ? (
                      ''
                    ) : (
                      <InsturctorCard instructor={course.instructor} />
                    )}
                  </div>
                </TabPanel>

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
                          <QuestionThread
                            key={qanda._id}
                            qanda={qanda}
                            courseId={course._id}
                            currentUser={userInfo.name}
                          />
                        ))
                      ) : (
                        <ListItem>No any question just yet.</ListItem>
                      )}
                    </div>
                  </List>

                  <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby='qanda'
                    aria-describedby='qanda-pool'
                    className={classes.modalContainer}
                  >
                    <div className={classes.modalPaper}>
                      <div>
                        <FormContainer>
                          <TextField
                            required
                            id='question'
                            type='text'
                            label='Your Question'
                            placeholder=''
                            variant='filled'
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            fullWidth
                          />
                        </FormContainer>
                        <br />
                        <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                          onClick={() => qandaHandler()}
                        >
                          Post
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                      <br />
                      <Message severity='info'>
                        Some your instructor might not answer your question but
                        other people will.
                      </Message>
                    </div>
                  </Modal>
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <List>
                    <Paper>
                      <ListItem className={classes.description}>
                        <ListItemText
                          primary={`There is no any annoucement.`}
                        />
                      </ListItem>
                    </Paper>
                    <Divider />
                  </List>
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <h2>Tell us what you think? </h2>
                  {reviewLoading && <Loader left />}
                  {reviewError && <Message>{reviewError}</Message>}
                  <form
                    onSubmit={reviewSubmitHandler}
                    style={{ width: '500px' }}
                  >
                    Your rating:
                    <ReactStars
                      className={classes.ratingStar}
                      count={5}
                      value={ratingStars}
                      onChange={(newRating) => setRatingStars(newRating)}
                      size={24}
                      activeColor='#ffd700'
                      isHalf
                    />
                    <FormContainer>
                      <TextField
                        required
                        id='review'
                        label='Review'
                        type='text'
                        variant='filled'
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FormContainer>
                    <Button variant='contained' type='submit'>
                      Submit
                    </Button>
                  </form>
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

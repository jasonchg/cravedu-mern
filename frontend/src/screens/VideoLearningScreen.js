import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { makeStyles } from '@material-ui/core/styles'
import { listCourseDetails } from '../actions/courseActions'
import { getUserCourses } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import VideoPlayer from '../components/VideoPlayer'

const VideoLearningScreen = ({ match, history }) => {
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
  }))
  const classes = useStyles()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCourses = useSelector((state) => state.userCourses)
  const { courses: userCurrentCourses } = userCourses

  const [bought, setBought] = useState(false)

  const checkBought = (currentCourse, courseHere) => {
    return (
      currentCourse &&
      courseHere &&
      currentCourse.some((curCourse) => {
        if (curCourse._id === courseHere._id) {
          return true
        }
      })
    )
  }

  useEffect(() => {
    dispatch(listCourseDetails(courseId))
    if (userInfo) {
      dispatch(getUserCourses())
    }
  }, [dispatch, courseId, userInfo])

  useEffect(() => {
    if (userCurrentCourses && course)
      setBought(checkBought(userCurrentCourses, course))
  }, [userCurrentCourses, course])

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

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div>
                <VideoPlayer
                  className={classes.player}
                  videoPath={
                    'https://www.youtube.com/watch?v=rRgD1yVwIvE&t=24s&ab_channel=TraversyMedia'
                  }
                />
              </div>

              <div className={classes.titleBox}>
                <List>
                  <ListItem>
                    <h2>About this course</h2>
                  </ListItem>
                  <ListItem className={classes.description}>
                    <ListItemText
                      secondary={`Description: ${course.description}`}
                    />
                  </ListItem>

                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary={
                        <Rating
                          value={course.rating}
                          text={`${course.numReviews} reviews`}
                        />
                      }
                    />
                  </ListItem>
                  <Divider />
                </List>
              </div>
            </Grid>

            <Grid item xs={4}>
              <List>
                <ListItemText>
                  <h2>Course Contents</h2>
                </ListItemText>
                {/*
                 * loops video path as argument
                 * when click any of the child
                 * change the path of the VideoPlayer component
                 */}
                {course.courseContents ? (
                  course.courseContents.map((content, index) => (
                    <ListItemText key={index}>
                      <Accordion className={classes.accordion}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='course-content'
                          id='course-content-panel-header'
                        >
                          <Typography>{content.chapter}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{content.name}</Typography>{' '}
                          <PlayCircleFilledIcon />
                        </AccordionDetails>
                      </Accordion>
                    </ListItemText>
                  ))
                ) : (
                  <Loader />
                )}
              </List>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default VideoLearningScreen

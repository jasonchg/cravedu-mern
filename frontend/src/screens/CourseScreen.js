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

const CourseScreen = ({ match, history }) => {
  const courseId = match.params.id
  const dispatch = useDispatch()

  const goBack = () => {
    history.push('/')
  }
  const addToCartHandler = () => {
    history.push(`/cart/${courseId}`)
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
    image: {
      width: 325,
      margin: 10,
      padding: 10,
      paddingRight: 10,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    titleBox: {
      paddingLeft: 40,
      paddingRight: 40,
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    description: {
      textAlign: 'justify',
    },
    priceTable: {
      paddingLeft: 10,
    },
    button: {
      margin: 12,
      width: 175,
      padding: 15,
    },
    accordion: {
      background: '#f0f0f0',
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
    if (bought) {
      history.push(`/course/${courseId}/learn`)
    } else {
    }
  }, [history, bought])

  useEffect(() => {
    dispatch(listCourseDetails(courseId))
    if (userInfo) {
      dispatch(getUserCourses())
    }
  }, [dispatch, courseId, userInfo])

  useEffect(() => {
    if (userCurrentCourses && course) {
      setBought(checkBought(userCurrentCourses, course))
    }
  }, [userCurrentCourses, course])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Container className={classes.root}>
          <Button onClick={goBack}>Go Back</Button>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={6}>
                    <div className='image'>
                      <img
                        src={course.image}
                        alt={course.name}
                        className={classes.image}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={6} className={classes.titleBox}>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant='h4'>{course.name}</Typography>
                          }
                          secondary={`Created by ${course.instructor}`}
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
                      <ListItem className={classes.description}>
                        <ListItemText
                          secondary={`Description: ${course.description}`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={3} className={classes.priceTable}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>RM</TableCell>
                    <TableCell>{course.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Update</TableCell>
                    <TableCell>
                      {course.updatedAt && course.updatedAt.substring(0, 10)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {bought ? null : (
                <>
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    size='medium'
                    startIcon={<AddShoppingCartIcon />}
                    onClick={addToCartHandler}
                    disabled={bought}
                  >
                    Add To Cart
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <h2>Course Content</h2>
            <Grid item xs={12}>
              {course.courseContents ? (
                course.courseContents.map((content, index) => (
                  <Accordion key={index} className={classes.accordion}>
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
                ))
              ) : (
                <Loader />
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default CourseScreen

import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Box,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import ArchiveIcon from '@material-ui/icons/Archive'
import PeopleIcon from '@material-ui/icons/People'
import { makeStyles } from '@material-ui/core/styles'
import { listCourseDetails } from '../actions/courseActions'
import { getUserCourses } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Breadcrumbs from '../components/Breadcrumbs'
import PropTypes from 'prop-types'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

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

const CourseScreen = ({ history }) => {
  const { course_slug } = useParams()

  const dispatch = useDispatch()

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
      // width: 325,
      width: 375,
      margin: 10,
      padding: 10,
      paddingRight: 10,
      [theme.breakpoints.down('sm')]: {
        width: 265,
        objectFit: 'cover',
      },
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
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 20,
        paddingRight: 20,
      },
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
    blurBackground: {
      opacity: 0.7,
      background: '#111',
    },
    reviewSection: {
      background: '#fff',
      maxHeight: 400,
      overflow: 'scroll',
      overflowX: 'hidden',
    },
  }))

  const [courseId, setCourseId] = useState('')

  const [value, setValue] = useState(0)
  const tabHandler = (event, newValue) => {
    setValue(newValue)
  }

  const classes = useStyles()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCourses = useSelector((state) => state.userCourses)
  const { userPaidCourses } = userCourses

  const [bought, setBought] = useState(false)

  const checkBought = (currentCourse, courseHere) => {
    return (
      currentCourse &&
      courseHere &&
      currentCourse.some((curCourse) => {
        if (curCourse._id === courseHere._id) {
          return true
        } else {
          return null
        }
      })
    )
  }

  useEffect(() => {
    if (course) {
      setCourseId(course._id)
    }

    if (userPaidCourses && course) {
      setBought(checkBought(userPaidCourses, course))
    }
  }, [userPaidCourses, course])

  useEffect(() => {
    const redirectToLearningScreen = () => {
      alert(
        'You have already bought this course. Redirect to the learning screen now.',
        history.push(`/course/${courseId}/learn`)
      )
    }

    dispatch(listCourseDetails(course_slug))

    if (userInfo) {
      if (bought) {
        redirectToLearningScreen()
      } else {
        dispatch(getUserCourses())
      }
    }
  }, [history, bought, userInfo, dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Breadcrumbs
            previousPage={[
              {
                name: 'Information Technology',
                link: '/',
              },
            ]}
            currentPage={'Javascript'}
            courseScreen
          />
          <Container className={classes.root}>
            <Grid container spacing={2}>
              <Grid item md={9} xs={12}>
                <Paper className={classes.paper}>
                  <Grid container>
                    <Grid item md={6} xs={12}>
                      <div className='image'>
                        <img
                          src={course.image}
                          alt={course.name}
                          className={classes.image}
                        />
                      </div>
                    </Grid>

                    <Grid item md={6} xs={12} className={classes.titleBox}>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography variant='h4'>
                                {course.name}
                              </Typography>
                            }
                            secondary={`Created by ${course.instructor}`}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <AccessTimeIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${Math.round(
                              course.totalDuration / 60
                            )} hours`}
                          />
                          <ListItemIcon>
                            <ArchiveIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${
                              course && course.courseContents
                                ? course.courseContents.length
                                : 0
                            } Chapters`}
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
                        <ListItem>
                          <ListItemIcon>
                            <PeopleIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${course.totalSold} students`}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item md={3} xs={12} className={classes.priceTable}>
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
                {bought || course.isPublished === false ? null : (
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
              <Grid item xs={12} className={classes.tabPanelArea}>
                <div>
                  <Tabs
                    onChange={tabHandler}
                    aria-label='course tabs'
                    value={value}
                  >
                    <Tab label='About this Course' {...a11yProps(0)} />
                    <Tab label='Instructor ' {...a11yProps(1)} />
                    <Tab label='Reviews' {...a11yProps(2)} />
                  </Tabs>
                </div>

                <TabPanel value={value} index={0}>
                  <div className={classes.description}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: course.description,
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {course.instructor}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <p>
                    {course && course.reviews ? course.reviews.length : 0}{' '}
                    reviews for this course
                  </p>
                  <div className={classes.reviewSection}>
                    {course && course.reviews && course.reviews.length !== 0 ? (
                      course.reviews.map((review) => (
                        <div key={review._id}>
                          <ListItem
                            alignItems='flex-start'
                            style={{
                              textDecoration: 'none',
                              listStyle: 'none',
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar style={{ marginRight: 10 }}>
                                {review.name.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                              primary={<strong>{review.comment}</strong>}
                              secondary={
                                <span>
                                  <Rating value={review.ratingStars} text='' />
                                  <Typography
                                    component='span'
                                    variant='body2'
                                    color='textPrimary'
                                  >
                                    {review.name}
                                  </Typography>{' '}
                                  {review.createdAt.substring(10, 0)}
                                </span>
                              }
                            />
                          </ListItem>
                          <Divider />
                        </div>
                      ))
                    ) : (
                      <ListItem>No review yet.</ListItem>
                    )}
                  </div>
                </TabPanel>
              </Grid>

              <Grid item xs={12}>
                <h2>Course Content</h2>
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
        </>
      )}
    </>
  )
}

export default CourseScreen

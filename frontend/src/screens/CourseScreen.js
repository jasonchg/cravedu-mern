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
import { listCategories, listCourseDetails } from '../actions/courseActions'
import { getUserCourses } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Breadcrumbs from '../components/Breadcrumbs'
import PropTypes from 'prop-types'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { addToCart } from '../actions/cartActions'
import { getParentCategory } from '../customHooks'
import { getTotalDuration } from '../utils'
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
  },
  paper: {
    background: '#f0f0f0',
  },
  leftBox: {
    background: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: theme.shadows[1],
  },
  courseLeftContainer: {
    padding: 10,
    alignItems: 'center',
    margin: 20,
    width: '100%',
    [theme.breakpoints.down('sm')]: {},
  },
  imageContainer: {
    width: '80%',
    height: '30%',
  },
  image: {
    objectFit: 'cover',
    maxWidth: '100%',
    maxHeight: '100%',
    marginLeft: 10,
    marginRight: 10,
    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },
  },
  rightBox: {
    width: '80%',
  },
  titleBox: {
    maxWidth: '100%',
    maxHeight: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },
  },
  divider: {},
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

const CourseScreen = ({ history }) => {
  const { course_slug } = useParams()

  const dispatch = useDispatch()

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

  const addToCartHandler = () => {
    dispatch(addToCart(course.slug))
    if (window.confirm('Course added to cart. View your cart?')) {
      history.push('/cart')
    }
  }

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

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const newContentLists = (courseContent) => {
    if (courseContent) {
      const result = courseContent.filter(
        (content) => content.isPublished === true
      )
      return result.length
    } else {
      return 0
    }
  }

  useEffect(() => {
    if (userPaidCourses && course) {
      setBought(checkBought(userPaidCourses, course))
    }
  }, [userPaidCourses, course])

  useEffect(() => {
    const redirectToLearningScreen = () => {
      alert(
        'You have already bought this course. Redirect to the learning screen now.',
        history.push(`/course/${course_slug}/learn`)
      )
    }

    dispatch(listCourseDetails(course_slug))
    dispatch(listCategories())

    if (userInfo) {
      if (bought) {
        redirectToLearningScreen()
      } else {
        dispatch(getUserCourses())
      }
    }
  }, [history, bought, userInfo, dispatch, course_slug])

  return loading || !course ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Breadcrumbs
        previousPage={[
          {
            name: `home`,
            link: '/',
          },
          {
            name: `${getParentCategory(
              categories,
              course ? course.category : 'Programming Language'
            )}`,
            link: '/',
          },
        ]}
        currentPage={course.category}
        categoryUrl={`/category/${course.category}`}
        courseScreen
      />
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <div className={classes.leftBox}>
              <Grid
                container
                spacing={3}
                className={classes.courseLeftContainer}
                style={{ width: '900px' }}
              >
                <Grid item md={4} xs={12} className={classes.imageContainer}>
                  <img
                    src={course.image}
                    alt={course.name}
                    className={classes.image}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </Grid>

                <Grid item md={8} xs={12} className={classes.rightBox}>
                  <List className={classes.titleBox}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant='h4'>{course.name}</Typography>
                        }
                        secondary={`Created by ${course.instructor}`}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${getTotalDuration(
                          course.courseContents
                        )} hours`}
                      />
                      <ListItemIcon>
                        <ArchiveIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${newContentLists(
                          course.courseContents
                        )} Chapters`}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${course.totalSold} students`} />
                    </ListItem>

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
                  </List>
                </Grid>
              </Grid>
            </div>
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
                <TableRow>
                  <TableCell>Created At</TableCell>
                  <TableCell>
                    {course.createdAt && course.createdAt.substring(0, 10)}
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
        <Grid container style={{ marginTop: 10 }}>
          <Grid item md={8} xs={12} className={classes.tabPanelArea}>
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
              <InsturctorCard instructor={course.instructor} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <p>
                {course && course.reviews ? course.reviews.length : 0} reviews
                for this course
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

          <Grid item md={4} xs={12}>
            <h2>Course Content</h2>
            {course.courseContents ? (
              course.courseContents.map((content, index) => {
                return content.isPublished ? (
                  <Accordion key={index} className={classes.accordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='course-content'
                      id='course-content-panel-header'
                    >
                      <Typography>Chapter {content.chapter}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{content.name}</Typography>{' '}
                      <PlayCircleFilledIcon />
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  ''
                )
              })
            ) : (
              <Loader />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default CourseScreen

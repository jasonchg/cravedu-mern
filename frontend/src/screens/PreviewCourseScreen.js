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
  Tab,
  Tabs,
  Box,
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { makeStyles } from '@material-ui/core/styles'
import { listCourseDetails } from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Breadcrumbs from '../components/Breadcrumbs'
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

const PreviewCourseScreen = ({ match, history }) => {
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
    blurBackground: {
      opacity: 0.7,
      background: '#111',
    },
  }))

  const [value, setValue] = useState(0)
  const tabHandler = (event, newValue) => {
    setValue(newValue)
  }

  const classes = useStyles()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (
      (!userInfo && !userInfo.isAdmin) ||
      (!userInfo && !userInfo.isInstructor)
    ) {
      history.push('/')
    } else {
      dispatch(listCourseDetails(courseId))
    }
  }, [history, courseId, userInfo, dispatch])

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
                              <Typography variant='h4'>
                                {course.name}
                              </Typography>
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
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary={`${course.totalSold} students`}
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
                <Button
                  className={classes.button}
                  variant='contained'
                  color='primary'
                  size='medium'
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => alert('Add to cart')}
                  disabled={true}
                >
                  Add To Cart
                </Button>
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
                  {course.numReviews}
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

export default PreviewCourseScreen

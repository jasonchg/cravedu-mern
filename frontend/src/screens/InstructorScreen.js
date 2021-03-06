import React, { useEffect, useState } from 'react'
import {
  Grid,
  Button,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Typography,
  Card,
  CardContent,
  makeStyles,
  Modal,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core'
import {
  createCourse,
  listCourses,
  makeAnnouncement,
} from '../actions/instructorActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { INSTRUCTOR_COURSE_CREATE_RESET } from '../constants/instructorConstants'
import Breadcrumbs from '../components/Breadcrumbs'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import CreateCourseGuide from '../components/CreateCourseGuide'
import Paginate from '../components/Paginate'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import FormContainer from '../components/FormContainer'

const useStyle = makeStyles((theme) => ({
  cardContainer: { marginTop: 10, marginBottom: 15 },
  bestCard: {
    background: '#cfdbff',
    margin: 10,
    padding: 10,
    color: '#222',
    boxShadow: theme.shadows[6],
    height: 225,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardTitle: {
    color: '#444',
    fontSize: 24,
  },
  cardQuantity: {
    fontSize: 32,
  },
  instructorButtonHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const InstructorScreen = ({ history, match }) => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword || ''
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const instructorCourseList = useSelector(
    (state) => state.instructorCourseList
  )
  const { courses, loading, error, page, pages } = instructorCourseList
  const instructorCourseCreate = useSelector(
    (state) => state.instructorCourseCreate
  )
  const {
    courseId: newCourseId,
    error: createCourseError,
    success: createCourseSuccess,
    loading: createCourseLoading,
  } = instructorCourseCreate

  const goToEdit = (id) => {
    history.push(`/instructor/${id}/edit`)
  }

  const getTotalSold = (courses) => {
    const reducer = (acc, cur) => acc + cur
    if (courses.length !== 0) {
      const allCourse = courses.map((x) => {
        return x.totalSold
      })
      return allCourse.reduce(reducer)
    } else {
      return 0
    }
  }

  const getHighest = (courses) => {
    if (courses.length !== 0) {
      const lists = courses.map((x) => {
        return x.totalSold
      })

      const highest = Math.max(...lists)

      const getHighest = courses.find((x) => x.totalSold === highest)
      return `${getHighest.name} ( ${getHighest.totalSold} sold )`
    } else {
      return ''
    }
  }

  const makeNewAnnouncement = () => {
    setOpen(true)
  }

  const [modalStyle] = React.useState(getModalStyle)

  const [announcementMessage, setAnnouncementMessage] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])

  const instructorAnnouncement = useSelector(
    (state) => state.instructorAnnouncement
  )
  const { success: announcementSuccess } = instructorAnnouncement

  const handleAnnouncement = () => {
    dispatch(makeAnnouncement(selectedCourse, { announcementMessage }))
    setAnnouncementMessage('')
    setOpen(false)
  }

  useEffect(() => {
    if (announcementSuccess) {
      const msg = 'Announcement has posted and sent to all students.'
      alert(msg)
    }

    if (createCourseSuccess) {
      dispatch({ type: INSTRUCTOR_COURSE_CREATE_RESET })
      history.push(`/instructor/${newCourseId}/edit`)
    }

    if (!userInfo && !userInfo.isInstructor) {
      history.push('/login')
    } else {
      dispatch(listCourses('', pageNumber))
    }
  }, [
    userInfo,
    dispatch,
    history,
    createCourseSuccess,
    announcementSuccess,
    newCourseId,
    pageNumber,
  ])

  useEffect(() => {
    if (courses && courses.length > 0) {
      const publishedCourses = courses.filter((x) => {
        return x.isPublished === true
      })
      const filtered = publishedCourses.map((y) => {
        return {
          _id: y._id,
          name: y.name,
        }
      })
      setFilteredCourses(filtered)
    }
  }, [courses])

  return (
    <>
      <Breadcrumbs
        previousPage={[
          {
            name: 'Home',
            link: '/',
          },
        ]}
        currentPage='Instructor'
      />

      <Grid container style={{ marginTop: 10 }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : courses && courses.length !== 0 ? (
          <>
            <Grid container spacing={2} className={classes.cardContainer}>
              <Grid item xs={12}>
                <Card className={classes.bestCard} style={{ maxHeight: 150 }}>
                  <CardContent>
                    <h5 className={classes.cardTitle}>
                      <b>Best Selling Course</b>
                    </h5>
                    <h1>
                      <b>{getHighest(courses)}</b>
                    </h1>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={4} xs={12}>
                <Card className={classes.bestCard}>
                  <CardContent>
                    <h5 className={classes.cardTitle}>
                      <b>Total Course Sold</b>
                    </h5>
                    <h2 className={classes.cardQuantity}>
                      {getTotalSold(courses)}
                    </h2>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={4} xs={12}>
                <Card className={classes.bestCard}>
                  <CardContent>
                    <h5 className={classes.cardTitle}>
                      <b>Total Overall Students</b>
                    </h5>
                    <h2 className={classes.cardQuantity}>
                      {' '}
                      {getTotalSold(courses)}
                    </h2>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={4} xs={12}>
                <Card className={classes.bestCard}>
                  <CardContent>
                    <h5 className={classes.cardTitle}>
                      <b>Total Courses</b>
                    </h5>
                    <h2 className={classes.cardQuantity}>{courses.length}</h2>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.instructorButtonHeader}>
                <div>
                  <Button
                    style={{ marginRight: 10 }}
                    onClick={() => history.push('/')}
                  >
                    Go Back
                  </Button>
                  <Button
                    startIcon={<CreateNewFolderIcon />}
                    variant='contained'
                    color='primary'
                    onClick={() => dispatch(createCourse())}
                  >
                    Create New Course
                  </Button>

                  {createCourseError && <Message>{createCourseError}</Message>}
                  {createCourseLoading && <Loader left />}
                </div>
                <div>
                  <Button
                    variant='outlined'
                    startIcon={<AnnouncementIcon />}
                    onClick={makeNewAnnouncement}
                  >
                    Make New Annoucement
                  </Button>
                  <Modal open={open} onClose={() => setOpen(false)}>
                    <div style={modalStyle} className={classes.paper}>
                      <FormControl>
                        <h4>Choorse a course to announce</h4>
                        <Select
                          value={selectedCourse}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                          {filteredCourses.map((course) => (
                            <MenuItem value={course._id}>
                              {course.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormContainer>
                        <TextField
                          required
                          fullWidth
                          label='New Announcement'
                          type='text'
                          variant='filled'
                          value={announcementMessage}
                          onChange={(e) =>
                            setAnnouncementMessage(e.target.value)
                          }
                        />
                      </FormContainer>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleAnnouncement}
                      >
                        Announce Now
                      </Button>
                    </div>
                  </Modal>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align='center'>Published</TableCell>
                      <TableCell align='center'>Price (MYR)</TableCell>
                      <TableCell align='center'>Instructor</TableCell>
                      <TableCell align='center'>Chapters </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses.map((course, index) => (
                      <TableRow key={course._id}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell>
                          <b>{course.name}</b> <br />
                          <Typography variant='caption' component='span'>
                            ({course._id})
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          {course.isPublished ? (
                            <span>Yes</span>
                          ) : (
                            <span>No</span>
                          )}
                        </TableCell>
                        <TableCell align='center'>{course.price}</TableCell>
                        <TableCell align='center'>
                          {course.instructor}
                        </TableCell>
                        <TableCell align='center'>
                          {course.courseContents.length}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => goToEdit(course._id)}
                            variant='outlined'
                          >
                            Edit Info
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Paginate
                page={page}
                pages={pages}
                keyword={keyword ? keyword : ''}
              />
            </Grid>
          </>
        ) : (
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 10,
                  padding: '50px 20px',
                }}
              >
                <div>
                  <CreateNewFolderIcon
                    color='inherit'
                    style={{
                      fontSize: 180,
                      opacity: 0.7,
                      transform: 'rotate(-8deg)',
                    }}
                  />
                  <p>You don't have any course. Create a new course?</p>
                </div>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => dispatch(createCourse())}
                >
                  Create Now
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
      <CreateCourseGuide />
    </>
  )
}

export default InstructorScreen

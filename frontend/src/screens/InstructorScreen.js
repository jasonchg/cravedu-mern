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
} from '@material-ui/core'
import { createCourse, listCourses } from '../actions/instructorActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  INSTRUCTOR_COURSE_CREATE_RESET,
  INSTRUCTOR_COURSE_LIST_RESET,
} from '../constants/instructorConstants'
import Breadcrumbs from '../components/Breadcrumbs'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import CreateCourseGuide from '../components/CreateCourseGuide'
import Paginate from '../components/Paginate'

const InstructorScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const [keyword, setKeyword] = useState('')

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

  useEffect(() => {
    dispatch({ type: INSTRUCTOR_COURSE_CREATE_RESET })

    if (createCourseSuccess) {
      history.push(`/instructor/${newCourseId}/edit`)
    } else {
      if (userInfo && userInfo.isInstructor) {
        dispatch({ type: INSTRUCTOR_COURSE_LIST_RESET })
        dispatch(listCourses('', pageNumber))
      } else {
        history.push('/login')
      }
    }
  }, [
    userInfo,
    dispatch,
    history,
    createCourseSuccess,
    newCourseId,
    pageNumber,
  ])

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
            <Grid item xs={12}>
              <Button
                style={{ marginRight: 10 }}
                onClick={() => history.push('/')}
              >
                Go Back
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => dispatch(createCourse())}
              >
                Create New Course{' '}
                <CreateNewFolderIcon style={{ marginLeft: 10 }} />
              </Button>

              {createCourseError && <Message>{createCourseError}</Message>}
              {createCourseLoading && <Loader left />}
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

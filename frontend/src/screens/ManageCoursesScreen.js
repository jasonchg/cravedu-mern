import React, { useEffect } from 'react'
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
import { listCourses } from '../actions/adminCourseActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ADMIN_COURSE_LIST_RESET } from '../constants/adminConstants'
import Breadcrumbs from '../components/Breadcrumbs'

const ManageCourseScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminCourseList = useSelector((state) => state.adminCourseList)
  const { courses, loading, error } = adminCourseList

  const goToEdit = (id) => {
    history.push(`/admin/${id}/edit`)
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch({ type: ADMIN_COURSE_LIST_RESET })
      dispatch(listCourses())
    } else {
      history.push('/login')
    }
  }, [userInfo, dispatch, history])

  return (
    <>
      <Breadcrumbs
        previousPage={[
          {
            name: 'Home',
            link: '/',
          },
        ]}
        currentPage='Courses'
      />

      <Grid container style={{ marginTop: 10 }}>
        <Grid item xs={12}>
          <Button onClick={() => history.push('/')}>Home</Button> |
          <Button onClick={() => history.push('/admin/users')}>
            Go To Manage Users
          </Button>
        </Grid>

        <Grid item xs={12}>
          {error ? (
            <Message>{error}</Message>
          ) : loading ? (
            <Loader />
          ) : (
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
                      <TableCell align='center'>{course.instructor}</TableCell>
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
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default ManageCourseScreen

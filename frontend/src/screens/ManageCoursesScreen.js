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

const ManageCourseScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminCourseList = useSelector((state) => state.adminCourseList)
  const { courses, loading, error } = adminCourseList

  const goToEdit = (id) => {
    history.push(`/admin/courses/${id}/edit`)
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
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={() => history.push('/')}>Go Back</Button> |
        <Button onClick={() => history.push('/admin/users')}>
          Go To Manage Users
        </Button>
      </Grid>

      <Grid item xs={12}>
        <h1>Courses</h1>
        {error ? (
          <Message>{error}</Message>
        ) : loading ? (
          <Loader />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Publish</TableCell>
                  <TableCell>Price (MYR)</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell width={60}>Total Chapters </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={course._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <b>{course.name}</b> <br />
                      <Typography variant='caption' component='span'>
                        ({course._id})
                      </Typography>
                    </TableCell>
                    <TableCell>{course.isPublished}</TableCell>
                    <TableCell>{course.price}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell width={60}>
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
  )
}

export default ManageCourseScreen

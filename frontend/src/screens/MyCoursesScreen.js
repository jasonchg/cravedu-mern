import React, { useEffect } from 'react'
import { Grid, Container, Link } from '@material-ui/core'
import Course from '../components/Course'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserCourses } from '../actions/userActions'

const MyCoursesScreen = ({ history }) => {
  // list all user bought courses, not from the course it self

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCourses = useSelector((state) => state.userCourses)
  const { error, loading, courses } = userCourses

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getUserCourses())
    }
  }, [dispatch, history, userInfo])

  return (
    <Container maxWidth='md'>
      <h1>My Courses</h1>
      {console.log(courses)}

      {courses === 0 ? (
        <Message severity='info'>
          No course in your list.
          <Link href='/'> Start Study?</Link>
        </Message>
      ) : error ? (
        <Message>{error}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <Grid container wrap='nowrap'>
          {courses.map((courseItem, index) => (
            <Grid item key={index} xs={12} md={6} lg={3}>
              <Course course={courseItem} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default MyCoursesScreen

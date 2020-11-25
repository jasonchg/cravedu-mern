import React, { useEffect } from 'react'
import { Grid, Container, Link } from '@material-ui/core'
import Course from '../components/Course'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserCourses } from '../actions/userActions'

const MyCoursesScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCourses = useSelector((state) => state.userCourses)
  const { error, loading, userPaidCourses } = userCourses

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

      {userPaidCourses ? (
        userPaidCourses.length === 0 ? (
          <Message severity='info'>
            No course in your list.
            <Link href='/course'> Start Study?</Link>
          </Message>
        ) : error ? (
          <Message>{error}</Message>
        ) : loading ? (
          <Loader />
        ) : (
          <Grid container wrap='nowrap'>
            {userPaidCourses.map((courseItem, index) => (
              <Grid key={index} item xs={12} sm={4} md={3}>
                <Link href={`/course/${courseItem._id}/learn`}>
                  <div style={{ pointerEvents: 'none' }}>
                    <Course course={courseItem} />
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        )
      ) : null}
    </Container>
  )
}

export default MyCoursesScreen

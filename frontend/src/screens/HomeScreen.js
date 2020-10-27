import React, { useEffect } from 'react'
import { Grid, Container } from '@material-ui/core'
import Course from '../components/Course'
import { listCourses } from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses } = courseList

  useEffect(() => {
    dispatch(listCourses())
  }, [dispatch])

  return (
    <Container maxWidth='md'>
      <h1>Latest Courses</h1>

      {error ? (
        <Message>{error}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <Grid container wrap='nowrap'>
          {courses.map((course) => (
            <Grid item key={course._id} xs={12} md={6} lg={3}>
              <Course course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default HomeScreen

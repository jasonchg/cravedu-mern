import React, { useState, useEffect } from 'react'
import { Grid, Container } from '@material-ui/core'
import Course from '../components/Course'
import { listCourses } from '../actions/courseActions'
import { getUserCourses } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Category from '../components/Category'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses } = courseList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCourses = useSelector((state) => state.userCourses)
  const { courses: userCurrentCourses } = userCourses

  useEffect(() => {
    dispatch(listCourses())

    if (userInfo) {
      dispatch(getUserCourses())
    }
  }, [dispatch, userInfo])

  const [category, setCategory] = useState([
    {
      name: 'Software',
      link: '#',
    },
    {
      name: 'Design',
      link: '#',
    },
    {
      name: 'Mathematic',
      link: '#',
    },
    {
      name: 'Science',
      link: '#',
    },
    {
      name: 'Electrical',
      link: '#',
    },
    {
      name: 'Personal Development',
      link: '#',
    },
    {
      name: 'Health',
      link: '#',
    },
    {
      name: 'Fitness',
      link: '#',
    },
  ])

  return (
    <Container maxWidth='md' style={{ padding: 20 }}>
      <Grid container style={{ marginBottom: 30 }}>
        {category &&
          category.map((item, index) => (
            <Category key={index} category={item} />
          ))}

        {userInfo && userCurrentCourses && userCurrentCourses.length !== 0 ? (
          <>
            <Grid item xs={12}>
              <h2> Let's start learning, {userInfo.name}</h2>
            </Grid>

            {userCurrentCourses.map((currentCourse, index) => (
              <Grid item key={currentCourse._id} xs={6}>
                <Course course={currentCourse} learning />
              </Grid>
            ))}
          </>
        ) : null}
      </Grid>

      {error ? (
        <Message>{error}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <Grid container style={{ marginBottom: 30 }}>
          <Grid item xs={12}>
            <h2>What to learn next</h2>
          </Grid>
          {courses.map((course) => (
            <Grid item key={course._id} xs={12} sm={4} md={3}>
              <Course course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default HomeScreen

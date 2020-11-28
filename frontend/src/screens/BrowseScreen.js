import React, { useEffect, useState } from 'react'
import { Grid, Container, Divider } from '@material-ui/core'
import Course from '../components/Course'
import { listCourses } from '../actions/courseActions'
import { getUserCourses } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Category from '../components/Category'
import Carousels from '../components/Carousels'

const BrowseScreen = ({ history }) => {
  const dispatch = useDispatch()

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses } = courseList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listCourses())

    if (userInfo) {
      dispatch(getUserCourses())
    }
  }, [dispatch, userInfo, history])

  const category = [
    { name: 'All Courses', link: '#' },
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
  ]

  const [currentCategory, setCurrentCategory] = useState('All Courses')

  const setCatHandler = (selectCategory) => {
    setCurrentCategory(selectCategory)
  }

  return (
    <Container maxWidth='md'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div style={{ fontSize: '20px' }}>
            <h1>{currentCategory}</h1>
            <Divider />
          </div>
        </Grid>
        <Grid item xs={12}>
          {category &&
            category.map((item, index) => (
              <span key={index} onClick={() => setCatHandler(item.name)}>
                <Category category={item} color='primary' />
              </span>
            ))}
        </Grid>
        <Grid item xs={12}>
          <Grid container wrap='wrap'>
            {error ? (
              <Grid item xs={12}>
                <Message>{error}</Message>
              </Grid>
            ) : loading ? (
              <Loader />
            ) : (
              courses.map((course, i) => (
                <Grid key={i} item style={{ marginTop: 7 }}>
                  <Course course={course} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} className='homeHeaderText'>
          <h2>Trending</h2>
          <Carousels courses={courses} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default BrowseScreen

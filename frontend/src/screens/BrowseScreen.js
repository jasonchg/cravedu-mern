import React, { useEffect, useState } from 'react'
import {
  Grid,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import Course from '../components/Course'
import { listCourses } from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Category from '../components/Category'
import Carousels from '../components/Carousels'

const BrowseScreen = () => {
  const dispatch = useDispatch()

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses } = courseList

  useEffect(() => {
    dispatch(listCourses())
  }, [dispatch])

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
  const theme = useTheme()
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Container>
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
              <Message>{error}</Message>
            ) : loading ? (
              <Loader />
            ) : (
              courses.map((course, i) => (
                <Grid item key={i} style={{ marginTop: 7 }}>
                  <Course course={course} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>

        {matchesLG === true ? (
          <Grid item xs={12} className='homeHeaderText'>
            <h2>Trending</h2>
            <Carousels courses={courses} />
          </Grid>
        ) : null}
      </Grid>
    </Container>
  )
}

export default BrowseScreen

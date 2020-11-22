import React, { useEffect, useState } from 'react'
import { Grid, Container, Divider } from '@material-ui/core'
import Course from '../components/Course'
import { listCourses } from '../actions/courseActions'
import { getUserCourses } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Category from '../components/Category'

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
      <div
        style={{ marginBottom: '30px', marginLeft: '25%', fontSize: '20px' }}
      >
        <h1>{currentCategory}</h1>
        <Divider />
      </div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          {category &&
            category.map((item, index) => (
              <span key={index} onClick={() => setCatHandler(item.name)}>
                <Category category={item} color='primary' />
              </span>
            ))}
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            {error ? (
              <Message>{error}</Message>
            ) : loading ? (
              <Loader />
            ) : (
              courses.map((course) => (
                <Grid item key={course._id} xs={12} sm={4}>
                  <Course course={course} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default BrowseScreen

import React, { useEffect } from 'react'
import {
  Grid,
  Container,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import Course from '../components/Course'
import { listCourses } from '../actions/courseActions'
import { getUserCourses } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Category from '../components/Category'
import Carousels from '../components/Carousels'
import { default as CourseScroll, consts } from 'react-elastic-carousel'
import Banner from '../components/Banner'

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch()

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses } = courseList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCourses = useSelector((state) => state.userCourses)
  const { userPaidCourses } = userCourses

  useEffect(() => {
    dispatch(listCourses())

    if (userInfo) {
      dispatch(getUserCourses())
    }
  }, [dispatch, userInfo, history])

  const category = [
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

  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  let itemToShow = matchesSM ? 2 : matchesMD ? 4 : matchesLG ? 5 : 4
  let itemToShowLeaning = matchesSM ? 1 : matchesMD ? 2 : matchesLG ? 3 : 2

  return (
    <>
      <Container>
        <Grid container>
          <Banner
            text='To keep us available in this valuable platform '
            subText='Enjoy up to 90% discount. Shop now, some of the courses only MYR10.'
          />

          {userInfo && userPaidCourses && userPaidCourses.length !== 0 ? (
            <>
              <Grid item xs={12} className='homeHeaderText'>
                <h2> Let's start learning, {userInfo.name}</h2>
              </Grid>

              <CourseScroll
                itemsToShow={itemToShowLeaning}
                pagination={false}
                itemPosition={consts.START}
              >
                {userPaidCourses.map((currentCourse, index) => (
                  <Course
                    key={currentCourse._id}
                    course={currentCourse}
                    learning
                  />
                ))}
              </CourseScroll>
            </>
          ) : null}
        </Grid>

        {error ? (
          <Message>{error}</Message>
        ) : loading ? (
          <Loader />
        ) : (
          <Grid container style={{ marginBottom: 30 }}>
            {matchesLG === true ? (
              <Grid item xs={12} className='homeHeaderText'>
                <h2>Trending</h2>
                <Carousels courses={courses} />
              </Grid>
            ) : null}

            <Grid item xs={12} style={{ marginTop: 20 }}>
              {category &&
                category.map((item, index) => (
                  <Category key={index} category={item} color='primary' />
                ))}
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: 'flex' }} className='homeHeaderText'>
                <div style={{ flex: 1 }}>
                  <h2>What to learn next</h2>
                </div>
                <div>
                  <Button
                    style={{ margin: 10, maxHeight: 35 }}
                    size='small'
                    onClick={() => history.push('/course')}
                  >
                    View More
                  </Button>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <CourseScroll
                itemsToShow={itemToShow}
                pagination={false}
                itemPosition={consts.START}
              >
                {courses.map((course, i) => (
                  <Course key={i} course={course} />
                ))}
              </CourseScroll>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  )
}

export default HomeScreen

import React, { useEffect } from 'react'
import {
  Grid,
  Container,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import Course from '../components/Course'
import {
  listCourses,
  bestSoldCourses,
  listCategories,
} from '../actions/courseActions'
import { getUserCourses } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Category from '../components/Category'
import Carousels from '../components/Carousels'
import { default as CourseScroll, consts } from 'react-elastic-carousel'
import Banner from '../components/Banner'

const HomeScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses } = courseList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCourses = useSelector((state) => state.userCourses)
  const { userPaidCourses } = userCourses

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const courseBestSold = useSelector((state) => state.courseBestSold)
  const {
    loading: courseBestLoading,
    error: courseBestError,
    courses: courseBestList,
  } = courseBestSold

  useEffect(() => {
    dispatch(listCourses('', pageNumber))
    dispatch(bestSoldCourses())
    dispatch(listCategories())

    if (userInfo) {
      dispatch(getUserCourses())
    }
  }, [dispatch, userInfo, pageNumber])

  const theme = useTheme()
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  let itemToShow = matchesXS
    ? 1
    : matchesSM
    ? 2
    : matchesMD
    ? 3
    : matchesLG
    ? 5
    : 4

  let itemToShowLeaning = matchesSM ? 1 : matchesMD ? 2 : matchesLG ? 2 : 2

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
                {userPaidCourses.map((currentCourse) => (
                  <Course
                    key={currentCourse._id}
                    course={
                      currentCourse._id !== ''
                        ? courses.find((x) => x._id === currentCourse._id)
                        : currentCourse
                    }
                    currentCourse={currentCourse}
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
            {matchesLG ? (
              courseBestLoading ? (
                <Loader />
              ) : courseBestError ? (
                <Message>{courseBestError}</Message>
              ) : (
                <Grid item xs={12} className='homeHeaderText'>
                  <h2>Trending</h2>
                  <Carousels courses={courseBestList} />
                </Grid>
              )
            ) : null}

            <Grid item xs={12} style={{ marginTop: 20 }}>
              <h2>Categories</h2>
              {categories &&
                categories.map((category, index) => (
                  <Category key={index} category={category} />
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

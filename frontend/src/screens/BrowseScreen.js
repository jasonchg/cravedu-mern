import React, { useEffect, useState } from 'react'
import {
  Grid,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import Course from '../components/Course'
import {
  bestSoldCourses,
  listCategories,
  listCourses,
  listCoursesByCategory,
} from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Category from '../components/Category'
import Carousels from '../components/Carousels'
import Paginate from '../components/Paginate'

const BrowseScreen = ({ match }) => {
  const dispatch = useDispatch()
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber
  const category = match.params.category
  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses, pages, page } = courseList
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList
  const courseBestSold = useSelector((state) => state.courseBestSold)
  const {
    loading: courseBestLoading,
    error: courseBestError,
    courses: courseBestList,
  } = courseBestSold

  useEffect(() => {
    dispatch(listCategories())

    if (match.params.category) {
      dispatch(listCoursesByCategory(category))
    } else {
      dispatch(listCourses(keyword, pageNumber))
      dispatch(bestSoldCourses())
    }
  }, [dispatch, keyword])

  const [currentCategory, setCurrentCategory] = useState(
    category ? category : 'All Courses'
  )

  const setCatHandler = (selectCategory) => {
    setCurrentCategory(selectCategory)
  }
  const theme = useTheme()
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Container>
      <Grid container spacing={3}>
        {keyword ? (
          <div style={{ margin: '10px 0' }}>
            <h2>Search terms : {keyword}</h2> <br />
          </div>
        ) : (
          <>
            <Grid item xs={12}>
              <div style={{ fontSize: '20px' }}>
                <h1>{currentCategory}</h1>
                <Divider />
              </div>
            </Grid>
            <Grid item xs={2}>
              {categories &&
                categories.map((category, index) => (
                  <span key={index}>
                    <Category category={category} color='primary' />
                  </span>
                ))}
            </Grid>
          </>
        )}
        <Grid item xs={10}>
          <Grid container wrap='wrap'>
            {error ? (
              <Message>{error}</Message>
            ) : loading ? (
              <Loader />
            ) : courses.length === 0 ? (
              <div
                style={{
                  minHeight: '70vh',
                  width: '100%',
                }}
              >
                <div style={{ marginTop: 10 }}>
                  <Message severity='info'>Nothing found</Message>
                </div>
              </div>
            ) : (
              courses.map((course, i) => (
                <Grid item key={i} style={{ marginTop: 7 }}>
                  <Course course={course} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
        {matchesLG && !keyword ? (
          <Grid item xs={12} className='homeHeaderText'>
            <h2>Trending</h2>
            {courseBestLoading ? (
              <Loader />
            ) : courseBestError ? (
              <Message>{courseBestError}</Message>
            ) : (
              <Carousels courses={courseBestList} />
            )}
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Paginate page={page} pages={pages} keyword='' />
        </Grid>
      </Grid>
    </Container>
  )
}

export default BrowseScreen

import React, { useEffect } from 'react'
import { Grid, Container, Link } from '@material-ui/core'
import Course from '../components/Course'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserCourses } from '../actions/userActions'
import { listCourses } from '../actions/courseActions'
import Breadcrumbs from '../components/Breadcrumbs'
import Banner from '../components/Banner'

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
      dispatch(listCourses())
      dispatch(getUserCourses())
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Breadcrumbs
        previousPage={[
          {
            name: 'Home',
            link: '/',
          },
        ]}
        currentPage='My Learning'
      />
      <Grid container>
        <Banner
          text='To keep us available in this valuable platform '
          subText='Enjoy up to 90% discount. Shop now, some of the courses only MYR10.'
        />
      </Grid>
      <Container style={{ marginTop: 10 }}>
        {userPaidCourses && (
          <p>{`You have total ${userPaidCourses.length} courses in your study list.`}</p>
        )}

        <Grid container>
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
              userPaidCourses.map((item, index) => (
                <Grid item key={index}>
                  <Link href={`/course/${item.slug}/learn`}>
                    <div style={{ pointerEvents: 'none' }}>
                      <Course course={item} />
                    </div>
                  </Link>
                </Grid>
              ))
            )
          ) : null}
        </Grid>
      </Container>
    </>
  )
}

export default MyCoursesScreen

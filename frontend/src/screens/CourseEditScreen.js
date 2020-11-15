import React, { useEffect, useState } from 'react'
import {
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextareaAutosize,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import { getCourseById } from '../actions/adminCourseActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const CourseEditScreen = ({ match, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const courseId = match.params.id

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminCourseDetails = useSelector((state) => state.adminCourseDetails)
  const { courseDetails, loading, error } = adminCourseDetails

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')

  // useEffect
  // check if user existed
  // check if course details exisited

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (
        !courseDetails ||
        !courseDetails.name ||
        !courseDetails.price ||
        !courseDetails.description ||
        courseDetails._id !== courseId
      ) {
        setName('')
        setPrice(0)
        setDescription('')
        dispatch(getCourseById(courseId))
      } else {
        setName(courseDetails.name)
        setPrice(Number(courseDetails.price))
        setDescription(courseDetails.description)
      }
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, history, courseId, courseDetails])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Button onClick={() => history.push('/admin/courses')}>Go Back</Button>|
        <Button onClick={() => history.push('/admin/user')}>
          Go To Manage Users
        </Button>
      </Grid>
      <h1>
        <SubdirectoryArrowRightIcon /> {courseDetails && courseDetails.name}
      </h1>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <form>
            <FormContainer>
              <TextField
                required
                fullWidth
                id='name'
                type='text'
                label='Course Name'
                placeholder=''
                variant='filled'
                value={name}
                autoComplete='text'
                onChange={(e) => setName(e.target.value)}
              />
            </FormContainer>
            <FormContainer>
              <TextField
                required
                fullWidth
                id='price'
                type='number'
                label='Price (MYR)'
                placeholder=''
                variant='filled'
                value={price}
                autoComplete='number'
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormContainer>
            <FormContainer>
              <TextareaAutosize
                required
                fullWidth
                rowsMax={3}
                id='description'
                type='text'
                label='Description'
                placeholder=''
                variant='filled'
                defaultValue={description}
                autoComplete='text'
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormContainer>
            <Button variant='contained' color='primary' fullWidth>
              Update
            </Button>
          </form>
        </Grid>
        <Grid item xs={8}>
          <h2>Reviews</h2>
          <List>
            {courseDetails.reviews ? (
              courseDetails.reviews.length === 0 ? (
                <Message severity='info'>No Review</Message>
              ) : (
                courseDetails.reviews.map((review, index) => (
                  <div key={review._id}>
                    <ListItem>
                      <ListItemText primary={`${index + 1}.`} />
                    </ListItem>
                    <Divider />
                  </div>
                ))
              )
            ) : (
              <Message>Something went wrong</Message>
            )}
          </List>
          <Divider />
          <h2>Total Sales</h2>
          <Message severity='info'>No sales</Message>

          <h2>Course Contents</h2>
          <List>
            {courseDetails.courseContents ? (
              courseDetails.courseContents.length === 0 ? (
                <Message severity='info'>Nothing...</Message>
              ) : (
                courseDetails.courseContents.map((course, index) => (
                  <div key={course._id}>
                    <ListItem>
                      <ListItemText primary={`${index + 1}.  ${course.name}`} />
                    </ListItem>
                    <Divider />
                  </div>
                ))
              )
            ) : (
              <Message>Something went wrong</Message>
            )}
          </List>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CourseEditScreen

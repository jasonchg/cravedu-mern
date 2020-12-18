import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import { getCourseById, updateCourse } from '../actions/instructorActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import {
  INSTRUCTOR_COURSE_DETAILS_RESET,
  INSTRUCTOR_COURSE_UPDATE_RESET,
} from '../constants/instructorConstants'
import TextEditor from '../components/TextEditor'
import { myTrim, generateSlug } from '../utils'

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  img: {
    width: 120,
  },
  leftPanel: {
    padding: 20,
    minHeight: 200,
  },
  formTextArea: {
    minHeight: 200,
    minWidth: '100%',
  },
})

const InstructorCourseEditScreen = ({ match, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const courseId = match.params.id

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const instructorCourseDetails = useSelector(
    (state) => state.instructorCourseDetails
  )
  const { courseDetails, loading, error } = instructorCourseDetails

  const instructorCourseUpdate = useSelector(
    (state) => state.instructorCourseUpdate
  )
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = instructorCourseUpdate

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [chapter, setChapter] = useState(1)
  const [chapterName, setChapterName] = useState('')
  const [video, setVideo] = useState('')
  const [videoDuration, setVideoDuration] = useState('0:00:00')

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append(myTrim(name), file)
    setUploading(true)

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        '/api/upload/course-image',
        formData,
        config
      )

      setImage(myTrim(data))
      setUploading(false)
    } catch (e) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadVideoHandler = (e) => {
    e.preventDefault()
    console.log('video added')
  }

  // upload content happen here
  const submitContentHandler = (e) => {
    e.preventDefault()
    console.log('Uploaded', {
      chapter: chapter,
      name: chapterName,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCourse({
        _id: courseId,
        name,
        slug,
        price,
        image,
        description,
      })
    )
  }

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: INSTRUCTOR_COURSE_DETAILS_RESET })
      dispatch({ type: INSTRUCTOR_COURSE_UPDATE_RESET })
      history.push('/instructor')
    } else {
      if (userInfo && userInfo.isInstructor) {
        if (
          !courseDetails ||
          !courseDetails.name ||
          courseDetails._id !== courseId
        ) {
          setName('')
          setSlug('')
          setPrice(0)
          setDescription('')
          setImage('')
          dispatch(getCourseById(courseId))
        } else {
          setName(courseDetails.name)
          setSlug(courseDetails.slug)
          setPrice(courseDetails.price)
          setDescription(courseDetails.description)
          setImage(courseDetails.image)
        }
      } else {
        history.push('/login')
      }
    }
  }, [userInfo, courseDetails, dispatch, courseId, history, updateSuccess])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Button
          onClick={() => history.push('/instructor')}
          style={{ marginRight: 10 }}
        >
          Go Back
        </Button>
        <Button
          onClick={() => history.push('/instructor')}
          variant='outlined'
          color='inherit'
        >
          I Wish to Publish this course
        </Button>
      </Grid>
      <h1>
        <SubdirectoryArrowRightIcon /> {courseDetails && courseDetails.name}{' '}
      </h1>

      {updateLoading && <Loader />}
      {updateError && <Message>{updateError}</Message>}
      <Grid container spacing={3}>
        <Grid item md={5} xs={12}>
          <Button
            style={{ margin: '7px 0' }}
            onClick={() =>
              window.open(`/course/${courseId}/preview`, '_blank').focus()
            }
          >
            Preview This Course
          </Button>
          <Paper className={classes.leftPanel}>
            <img src={image} alt='' className={classes.img} />
            <p style={{ background: '#eee', padding: 7 }}>
              {image.substr(8, 40)}
            </p>
            <form
              onSubmit={submitHandler}
              method='post'
              encType='multipart/form-data'
            >
              <FormContainer>
                <input
                  type='file'
                  name={myTrim(name)}
                  placeholder='Enter Image Url'
                  onChange={uploadImageHandler}
                />
                {uploading && <Loader left />}
              </FormContainer>

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
                  id='slug'
                  type='text'
                  label='Slug URL'
                  placeholder=''
                  variant='filled'
                  value={slug}
                  autoComplete='text'
                  onChange={(e) => setSlug(e.target.value)}
                />
                <Button onClick={() => setSlug(generateSlug(name))}>
                  Generate
                </Button>
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
                <TextEditor description={description} setter={setDescription} />
              </FormContainer>

              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
              >
                Update
              </Button>
            </form>
            <p>
              *Your course will be appear at the admin's site for reviews once
              update.
            </p>
          </Paper>

          <Divider />
          <h2>Total Sales</h2>
          <Paper>
            {courseDetails.totalSold ? (
              <Typography variant='h3' component='h3' style={{ padding: 10 }}>
                {courseDetails.totalSold}
              </Typography>
            ) : (
              <Message severity='info'>No sales</Message>
            )}
          </Paper>

          <Divider />
        </Grid>
        <Grid item md={7} xs={12}>
          <h2>Course Contents</h2>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Add New Content
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <form
                    onSubmit={submitContentHandler}
                    method='post'
                    encType='multipart/form-data'
                  >
                    <FormContainer>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <input
                          type='file'
                          name={myTrim(video)}
                          placeholder='Enter Video Url'
                          onChange={uploadVideoHandler}
                        />
                        <div>
                          <AccessTimeIcon />
                        </div>
                        <div>{videoDuration}</div>
                      </div>
                    </FormContainer>

                    <FormContainer>
                      <TextField
                        required
                        fullWidth
                        id='content-chapter'
                        type='number'
                        label='Chapter'
                        placeholder='1'
                        variant='filled'
                        value={chapter}
                        onChange={(e) => setChapter(e.target.value)}
                      />
                    </FormContainer>
                    <FormContainer>
                      <TextField
                        required
                        fullWidth
                        id='content-name'
                        type='text'
                        label='Chapter Name'
                        placeholder='Get Started'
                        variant='filled'
                        value={chapterName}
                        onChange={(e) => setChapterName(e.target.value)}
                      />
                    </FormContainer>
                    <Button variant='contained' color='primary' type='submit'>
                      Push
                    </Button>
                  </form>
                </Grid>
                <Grid item md={6}>
                  <video id='myVideo' width='275' height='176' controls>
                    <source src={video} type='video/mp4' />
                    Your browser does not support HTML5 video.
                  </video>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Paper>
            <List>
              {courseDetails.courseContents ? (
                courseDetails.courseContents.length === 0 ? (
                  <ListItem>
                    <Message severity='info'>Zero content yet.</Message>
                  </ListItem>
                ) : (
                  courseDetails.courseContents.map((course, index) => (
                    <div key={course._id}>
                      <ListItem>
                        <ListItemText
                          primary={`${index + 1}.  ${course.name}`}
                        />
                        <Button>Edit</Button>
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                )
              ) : (
                <ListItem>
                  <Message>Something went wrong</Message>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InstructorCourseEditScreen

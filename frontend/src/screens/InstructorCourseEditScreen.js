import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import {
  getCourseById,
  updateCourse,
  createContent,
} from '../actions/instructorActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  INSTRUCTOR_ADD_CONTENT_RESET,
  INSTRUCTOR_COURSE_DETAILS_RESET,
  INSTRUCTOR_COURSE_UPDATE_RESET,
} from '../constants/instructorConstants'
import TextEditor from '../components/TextEditor'
import { myTrim, generateSlug } from '../utils'
import ProgressBar from '../components/ProgressBar'

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
  contentDropdown: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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

  const instructorContentCreate = useSelector(
    (state) => state.instructorContentCreate
  )
  const {
    loading: createContentLoading,
    error: createContentError,
    success: createContentSuccess,
  } = instructorContentCreate

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [chapter, setChapter] = useState(1)
  const [chapterName, setChapterName] = useState('')
  const [courseContents, setCourseContents] = useState([])
  const [progress, setProgress] = useState(0)
  const [videoUploading, setVideoUploading] = useState(false)

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
    setVideoUploading(true)

    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      )
    }, 700)

    if (progress >= 100) {
      setVideoUploading(false)
      clearInterval(timer)
    }
  }

  const submitContentHandler = (e) => {
    e.preventDefault()
    dispatch(
      createContent(courseId, {
        chapter: `Chapter ${chapter}`,
        name: chapterName,
      })
    )
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
    if (updateSuccess || createContentSuccess) {
      dispatch({ type: INSTRUCTOR_ADD_CONTENT_RESET })
      dispatch({ type: INSTRUCTOR_COURSE_DETAILS_RESET })
      dispatch({ type: INSTRUCTOR_COURSE_UPDATE_RESET })
      setChapterName('')
      dispatch(getCourseById(courseId))
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
          setCourseContents([])
        } else {
          setName(courseDetails.name)
          setSlug(courseDetails.slug)
          setPrice(courseDetails.price)
          setDescription(courseDetails.description)
          setImage(courseDetails.image)
          setCourseContents(courseDetails.courseContents)
          setChapter(courseDetails.courseContents.length + 1)
        }
      } else {
        history.push('/login')
      }
    }
  }, [
    userInfo,
    courseDetails,
    dispatch,
    courseId,
    history,
    updateSuccess,
    createContentSuccess,
  ])

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
              window
                .open(`/course/${courseDetails.slug}/preview`, '_blank')
                .focus()
            }
          >
            Preview This Course
          </Button>
          <Paper className={classes.leftPanel}>
            <Typography variant='body1'>Course Details</Typography>
            <Divider style={{ marginBottom: 10 }} />
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
            {courseDetails && courseDetails.totalSold ? (
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
                  <form onSubmit={submitContentHandler}>
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
                  {createContentLoading && <Loader left />}
                  {createContentError && (
                    <Message>{createContentError}</Message>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Paper>
            <List>
              {courseContents ? (
                courseContents.length === 0 ? (
                  <ListItem>
                    <Message severity='info'>No content yet.</Message>
                  </ListItem>
                ) : (
                  <>
                    {courseContents.map((course, index) => (
                      <div key={course._id}>
                        <ListItem>
                          <Accordion
                            style={{ width: '100%', background: '#efefef' }}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              {`${index + 1}.  ${course.name}`}
                            </AccordionSummary>
                            {videoUploading ? (
                              <ProgressBar progress={progress} />
                            ) : null}

                            <AccordionDetails>
                              <form
                                className={classes.contentDropdown}
                                onSubmit={uploadVideoHandler}
                              >
                                <div>
                                  <input type='file' />
                                </div>
                                <div>
                                  <Button variant='contained' type='submit'>
                                    Upload
                                  </Button>
                                  <Button>Delete</Button>
                                </div>
                              </form>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  </>
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

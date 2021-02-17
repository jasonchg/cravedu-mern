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
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import {
  getCourseById,
  updateCourse,
  createContent,
  deleteCourse,
  publishCourseRequest,
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
  INSTRUCTOR_DELETE_COURSE_RESET,
} from '../constants/instructorConstants'
import TextEditor from '../components/TextEditor'
import { myTrim, generateSlug, getTotalDuration } from '../utils'
import ContentListItem from '../components/ContentListItem'
import { listCategories } from '../actions/courseActions'
import CategorySelectList from '../components/CategorySelectList'
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
  counter: {
    padding: 15,
    fontSize: '32px',
    textAlign: 'center',
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

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

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

  const instructorCourseDelete = useSelector(
    (state) => state.instructorCourseDelete
  )
  const { success: deleteCourseSuccess } = instructorCourseDelete

  const instructorCoursePublishRequest = useSelector(
    (state) => state.instructorCoursePublishRequest
  )
  const { success: publishSuccess } = instructorCoursePublishRequest

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [chapter, setChapter] = useState(1)
  const [chapterName, setChapterName] = useState('')
  const [category, setCategory] = useState('')
  const [courseContents, setCourseContents] = useState([])
  const [errorUpdate, setErrorUpdate] = useState(false)
  const [cantDelete, setCantDelete] = useState(false)
  const [letMenuClose, setLetMenuClose] = useState(false)

  const selectCategoryHanlder = (cate) => {
    setCategory(cate)
    setLetMenuClose(false)
  }

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
        `/api/upload/${courseId}/course-image`,
        formData,
        config
      )

      setImage(myTrim(data))
      setUploading(false)
    } catch (e) {
      setUploading(false)
      setErrorUpdate(true)
    }
  }

  const submitContentHandler = (e) => {
    e.preventDefault()
    dispatch(
      createContent(courseId, {
        chapter,
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
        category,
        description,
      })
    )
  }

  const deleteHandler = () => {
    if (courseDetails.isPublished || courseDetails.totalSold !== 0) {
      setCantDelete(true)
      alert(
        `You cannot delete a published course with total sold of ${courseDetails.totalSold}.`
      )
    } else {
      const content =
        courseDetails && courseContents && courseContents.length
          ? courseContents.length
          : 0
      const deleteMsg = `Are you wish to delete this course and it's contents?\n${
        content !== 0 ? `This course consist of ${content} chapters.` : ''
      }\n(*This action is not reversable. Think twice!)`

      if (window.confirm(deleteMsg)) {
        dispatch(deleteCourse(courseId))
      }
    }
  }

  const [expanded, setExpanded] = useState(false)

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const publishThisCourse = () => {
    const msg = 'Are you sure you want to publish this course?'

    if (window.confirm(msg)) {
      dispatch(publishCourseRequest(courseId))
    }
  }

  useEffect(() => {
    if (publishSuccess) {
      const msg =
        "You've sent a request to the admin. Please kindly wait for the process. \nYou'll received a notification when your course is published."

      alert(msg)
    }

    if (deleteCourseSuccess) {
      dispatch({ type: INSTRUCTOR_DELETE_COURSE_RESET })
      history.push('/instructor')
    }

    if (updateSuccess || createContentSuccess) {
      dispatch({ type: INSTRUCTOR_ADD_CONTENT_RESET })
      dispatch({ type: INSTRUCTOR_COURSE_DETAILS_RESET })
      dispatch({ type: INSTRUCTOR_COURSE_UPDATE_RESET })
      setChapterName('')
      dispatch(listCategories())
      dispatch(getCourseById(courseId))
    } else {
      if (userInfo && userInfo.isInstructor) {
        if (
          !courseDetails ||
          !courseDetails.name ||
          courseDetails._id !== courseId
        ) {
          setName('')
          setCategory('')
          setSlug('')
          setPrice(0)
          setDescription('')
          setImage('')
          dispatch(listCategories())
          dispatch(getCourseById(courseId))
          setCourseContents([])
        } else {
          setName(courseDetails.name)
          setCategory(courseDetails.category)
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
    deleteCourseSuccess,
    publishSuccess,
  ])

  return loading || !courseDetails ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Button
          onClick={() => history.push('/instructor')}
          style={{ marginRight: 10 }}
          variant='outlined'
        >
          Go Back
        </Button>
      </Grid>
      <h1>
        <SubdirectoryArrowRightIcon /> {courseDetails && courseDetails.name}{' '}
      </h1>

      {updateLoading && <Loader />}
      {updateError && <Message>{updateError}</Message>}
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          {/* <div style={{ margin: '7px 0' }}>
            <Button
              onClick={() =>
                window
                  .open(`/course/${courseDetails.slug}/preview`, '_blank')
                  .focus()
              }
            >
              Preview This Course
            </Button>
          </div> */}

          <Paper className={classes.leftPanel}>
            <h3>Course Details</h3>
            <Divider style={{ marginBottom: 10 }} />

            <form
              onSubmit={submitHandler}
              method='post'
              encType='multipart/form-data'
            >
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
                <FormControl>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    open={letMenuClose}
                    onOpen={() => setLetMenuClose(true)}
                  >
                    <b style={{ paddingLeft: 7 }}>Selected Category</b>
                    <MenuItem value={category}>{category}</MenuItem>
                    {categories &&
                      categories.map((category, i) => (
                        <CategorySelectList
                          key={i}
                          category={category}
                          selectCategoryHanlder={selectCategoryHanlder}
                        />
                      ))}
                  </Select>
                </FormControl>
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
                <TextEditor
                  description={
                    description !== '' ? description : '<h5>Loading</h5>'
                  }
                  setter={setDescription}
                />
              </FormContainer>

              <Grid container alignItems='center'>
                <p>
                  Important: Name your course first before upload any cover
                  picture.
                </p>
                <Grid item xs={6}>
                  <img
                    src={image}
                    alt=''
                    className={classes.img}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormContainer>
                    <input
                      type='file'
                      name={myTrim(name)}
                      placeholder='Enter Image Url'
                      onChange={uploadImageHandler}
                    />
                    {uploading && <Loader left />}
                  </FormContainer>
                </Grid>
              </Grid>

              <p style={{ background: '#eee', padding: 7 }}>
                {image.substr(34)}
              </p>

              {errorUpdate && (
                <>
                  <Message>
                    Error occured while updating the image. Please try again.
                  </Message>{' '}
                  <br />
                </>
              )}

              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                disabled={errorUpdate ? true : false}
              >
                Update
              </Button>
            </form>
            <p>
              *Your course will be appear at the admin's site for reviews once
              update.
            </p>
          </Paper>
        </Grid>

        <Grid item md={6} xs={12}>
          <div>
            <h3>Course Popularities</h3>
            <Divider style={{ marginBottom: 10 }} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ textAlign: 'start' }}>
                <h3>Total Sales (MYR)</h3>
                <Paper>
                  {courseDetails && courseDetails.totalSold ? (
                    <div className={classes.counter}>
                      {courseDetails.totalSold * courseDetails.price}
                    </div>
                  ) : (
                    <div className={classes.counter}>0</div>
                  )}
                </Paper>
              </div>
              <div style={{ textAlign: 'start' }}>
                <h3>Completed / Total Students</h3>
                <Paper>
                  {(courseDetails && courseDetails.totalSold) ||
                  (courseDetails && courseDetails.studentCompleted) ? (
                    <div className={classes.counter}>
                      {courseDetails.studentCompleted} /{' '}
                      {courseDetails.totalSold}
                    </div>
                  ) : (
                    <div className={classes.counter}>0</div>
                  )}
                </Paper>
              </div>
              <div style={{ textAlign: 'start' }}>
                <h3>Rating</h3>
                <Paper>
                  {courseDetails && courseDetails.rating ? (
                    <div className={classes.counter}>
                      {courseDetails.rating} / 5
                    </div>
                  ) : (
                    <div className={classes.counter}>0</div>
                  )}
                </Paper>
              </div>
            </div>
          </div>
          <h2>Course Contents</h2>
          {courseDetails.isPublished ? (
            ''
          ) : (
            <Accordion
              expanded={expanded === 'addnewcontent'}
              onChange={handleAccordion('addnewcontent')}
            >
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
          )}

          <Paper>
            <List>
              {courseContents ? (
                courseContents.length === 0 ? (
                  <ListItem>
                    <Message severity='info'>No content yet.</Message>
                  </ListItem>
                ) : (
                  <>
                    {courseContents.map((content) => (
                      <ContentListItem
                        key={content._id}
                        expanded={expanded}
                        handleAccordion={handleAccordion}
                        count={content.chapter}
                        courseId={courseId}
                        content={content}
                      />
                    ))}
                  </>
                )
              ) : (
                <ListItem>
                  <Message>Something went wrong</Message>
                </ListItem>
              )}
            </List>
            {courseContents && courseContents.length !== 0 ? (
              <span
                style={{
                  textAlign: 'center',
                  display: 'block',
                  padding: '7px 0',
                }}
              >
                You've {courseContents.length} chapters with total duration of{' '}
                {getTotalDuration(courseContents)} hours.
              </span>
            ) : null}
          </Paper>
          {courseDetails.isPublished ? null : (
            <Paper
              style={{
                marginTop: 30,
                border: '#457b9d solid 1px',
                padding: 20,
              }}
            >
              <h3>Publication zone</h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 3, marginRight: 30 }}>
                  <p style={{ textAlign: 'justify' }}>
                    Your course will not publish to market immediately. Please
                    give us sometime to review your course and it's contents.
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <Button
                    onClick={publishThisCourse}
                    variant='outlined'
                    color='primary'
                  >
                    Publish this course
                  </Button>
                </div>
              </div>
            </Paper>
          )}

          <Paper
            style={{
              marginTop: 30,
              border: 'red solid 1px',
              padding: 20,
              background: 'rgba(150,0,0,0.1)',
            }}
          >
            <h3>Danger Zone</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 3, marginRight: 30 }}>
                <p style={{ textAlign: 'justify' }}>
                  Once you delete a course, there is no going back. Please be
                  certain.
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <Button
                  onClick={deleteHandler}
                  variant='outlined'
                  color='secondary'
                  disabled={cantDelete ? true : false}
                >
                  Delete This Course
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InstructorCourseEditScreen

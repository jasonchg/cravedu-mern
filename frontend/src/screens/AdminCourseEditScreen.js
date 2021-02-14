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
  Checkbox,
  FormControlLabel,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import { getCourseById, updateCourse } from '../actions/adminCourseActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import { myTrim, generateSlug } from '../utils'
import {
  ADMIN_COURSE_DETAILS_RESET,
  ADMIN_COURSE_UPDATE_RESET,
} from '../constants/adminConstants'
import TextEditor from '../components/TextEditor'
import { listCategories } from '../actions/courseActions'
import CategorySelectList from '../components/CategorySelectList'
import ContentListItem from '../components/ContentListItem'
import { INSTRUCTOR_COURSE_UPDATE_RESET } from '../constants/instructorConstants'

const useStyles = makeStyles((theme) => ({
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
}))

const AdminCourseEditScreen = ({ match, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const courseId = match.params.id

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminCourseDetails = useSelector((state) => state.adminCourseDetails)
  const { courseDetails, loading, error } = adminCourseDetails

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const adminCourseUpdate = useSelector((state) => state.adminCourseUpdate)
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = adminCourseUpdate

  const instructorCourseUpdate = useSelector(
    (state) => state.instructorCourseUpdate
  )
  const { success: instructorUpdateSuccess } = instructorCourseUpdate

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [slug, setSlug] = useState('')
  const [letMenuClose, setLetMenuClose] = useState(false)
  const [category, setCategory] = useState('')
  const [courseContents, setCourseContents] = useState([])

  const selectCategoryHanlder = (cate) => {
    setCategory(cate)
    setLetMenuClose(false)
  }

  const uploadFileHandler = async (e) => {
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

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCourse({
        _id: courseId,
        name,
        price,
        image,
        category,
        description,
        isPublished,
      })
    )
  }

  const handlePublishedCheck = (e, isChecked) => {
    setIsPublished(isChecked)
  }

  useEffect(() => {
    if (updateSuccess || instructorUpdateSuccess) {
      dispatch({ type: INSTRUCTOR_COURSE_UPDATE_RESET })
      dispatch({ type: ADMIN_COURSE_DETAILS_RESET })
      dispatch({ type: ADMIN_COURSE_UPDATE_RESET })
      history.go(0)
    }

    if (userInfo && userInfo.isAdmin) {
      if (
        !courseDetails ||
        !courseDetails.name ||
        courseDetails._id !== courseId
      ) {
        setName('')
        setPrice(0)
        setDescription('')
        setImage('')
        setIsPublished(false)
        setSlug('')
        dispatch(listCategories())
        setCategory('')
        setCourseContents([])
        dispatch(getCourseById(courseId))
      } else {
        setName(courseDetails.name)
        setSlug(courseDetails.slug)
        setPrice(courseDetails.price)
        setCategory(courseDetails.category)
        setDescription(courseDetails.description)
        setImage(courseDetails.image)
        setCourseContents(courseDetails.courseContents)
        setIsPublished(courseDetails.isPublished)
      }
    } else {
      history.push('/')
    }
  }, [
    userInfo,
    courseDetails,
    dispatch,
    courseId,
    history,
    updateSuccess,
    instructorUpdateSuccess,
  ])
  const [cantDelete, setCantDelete] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const deleteHandler = () => {
    if (courseDetails.isPublished || courseDetails.totalSold !== 0) {
      setCantDelete(true)
      alert(
        `You cannot delete a published course with total sold of ${courseDetails.totalSold}. You can choose to unpublished this course if have to.`
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
        // dispatch(deleteCourse(courseId))
      }
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Button onClick={() => history.push('/admin')}>Go Back</Button>|
        <Button onClick={() => history.push('/admin/users')}>
          Go To Manage Users
        </Button>
      </Grid>
      <h1>
        <SubdirectoryArrowRightIcon /> {courseDetails && courseDetails.name}
      </h1>
      {updateLoading && <Loader />}
      {updateError && <Message>{updateError}</Message>}
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Button
            style={{ margin: '7px 0' }}
            onClick={() =>
              window.open(`/course/${courseId}/preview`, '_blank').focus()
            }
          >
            Preview This Course
          </Button>
          <Paper className={classes.leftPanel}>
            <Typography variant='body1'>Course Details</Typography>
            <Divider style={{ marginBottom: 10 }} />
            <img
              src={image}
              alt=''
              className={classes.img}
              onDragStart={(e) => e.preventDefault()}
            />
            <p style={{ background: '#eee', padding: 7 }}>{image.substr(34)}</p>
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
                  onChange={uploadFileHandler}
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
                <FormContainer>
                  <TextEditor
                    description={description}
                    setter={setDescription}
                  />
                </FormContainer>
              </FormContainer>

              <FormContainer>
                <FormControlLabel
                  label='Published'
                  control={
                    <Checkbox
                      checked={isPublished}
                      onChange={handlePublishedCheck}
                      name='isPublished'
                      color='primary'
                    />
                  }
                />
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
          </Paper>
          <br />
          <Button
            onClick={deleteHandler}
            variant='outlined'
            color='secondary'
            disabled={cantDelete ? true : false}
          >
            Delete This Course
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <h2>Course Contents</h2>
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
                You've total {courseContents.length} chapters.
              </span>
            ) : null}
          </Paper>
        </Grid>
        <Grid item md={2} xs={12}>
          <h2>Total Sales</h2>
          <Paper>
            {courseDetails && courseDetails.totalSold ? (
              <Typography variant='h3' component='h3' style={{ padding: 10 }}>
                {courseDetails && courseDetails.totalSold}
              </Typography>
            ) : (
              <Typography variant='h3' component='h3' style={{ padding: 10 }}>
                0
              </Typography>
            )}
          </Paper>

          <h2>Rating</h2>
          <Paper>
            {courseDetails && courseDetails.rating ? (
              <Typography variant='h3' component='h3' style={{ padding: 10 }}>
                {courseDetails.rating}
              </Typography>
            ) : (
              <Typography variant='h3' component='h3' style={{ padding: 10 }}>
                0
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AdminCourseEditScreen

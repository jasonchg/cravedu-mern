import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
<<<<<<< HEAD
=======
  Button,
>>>>>>> f4a828b (initial)
  Typography,
  Link,
} from '@material-ui/core'
import Rating from './Rating'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
<<<<<<< HEAD
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
=======
>>>>>>> f4a828b (initial)
import PeopleIcon from '@material-ui/icons/People'
import Loader from './Loader'
const useStyles = makeStyles({
  root: {
    marginRight: 10,
    width: 300,
<<<<<<< HEAD
    minHeight: 270,
=======
>>>>>>> f4a828b (initial)
  },
  media: {
    height: 175,
  },
})

const learningStyles = makeStyles({
  root: {
    marginRight: 10,
    width: '100%',
    height: 150,
  },
  media: {
    width: 165,
    height: 150,
    position: 'relative',
    objectFit: 'contain',
  },
  mediaImg: {
    width: '100%',
    height: '100%',
    backgroundSize: 'auto 100%',
    backgroundPosition: 'cover',
    objectFit: 'cover',
  },
  playIcon: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    fontSize: '5em',
    color: '#3e3f40',
    opacity: '0',
    '&:hover': {
      opacity: '0.7',
    },
  },
<<<<<<< HEAD
  checkedIcon: {
    opacity: '0.7',
    color: 'green',
  },
=======
>>>>>>> f4a828b (initial)
  learningBody: {
    display: 'flex',
  },
  content: {},
})

<<<<<<< HEAD
const Course = ({ course, learning, currentCourse = '', myLearning }) => {
  const classes = useStyles()
  const classesLearning = learningStyles()
  const [progressCount, setProgressCount] = useState([])
  const [newCourseContent, setNewCourseContent] = useState([])

  useEffect(() => {
    if (course) {
      setNewCourseContent(
        course.courseContents.filter((content) => content.isPublished === true)
      )

      if (currentCourse && currentCourse !== '') {
        const progress = currentCourse
          ? currentCourse.courseContents.map((x) => x.watched)
          : ''

        if (progressCount.length < course.courseContents.length) {
          setProgressCount(progress.filter((x) => x !== false))
        }
      }
    }
  }, [currentCourse, course, progressCount.length])
=======
const Course = ({ course, learning, currentCourse = '' }) => {
  const classes = useStyles()
  const classesLearning = learningStyles()
  const [progressCount, setProgressCount] = useState(0)
  const [newCourseContent, setNewCourseContent] = useState([])

  useEffect(() => {
    setNewCourseContent(
      course.courseContents.filter((content) => content.isPublished === true)
    )

    const progress = currentCourse
      ? currentCourse.courseContents.map((x) => x.watched)
      : ''
    for (let key in progress) {
      if (progress[key] === true) {
        setProgressCount(progressCount + 1)
      }
    }
  }, [currentCourse])
>>>>>>> f4a828b (initial)

  return !course && !learning ? (
    <Loader />
  ) : (
    <Card className={learning ? classesLearning.root : classes.root}>
      {learning && (
        <Link href={`/course/${course && course.slug}/learn`}>
          <div className={classesLearning.learningBody}>
            <div className={classesLearning.media}>
              <CardMedia
                style={{ objectFit: 'contain' }}
                className={classesLearning.mediaImg}
                image={course && course.image}
                title={course && course.name}
              />
<<<<<<< HEAD
              {currentCourse.completedCertificate !== '' ? (
                <CheckCircleIcon
                  className={`${classesLearning.playIcon} ${classesLearning.checkedIcon}`}
                />
              ) : (
                <PlayCircleFilledIcon className={classesLearning.playIcon} />
              )}
=======
              <PlayCircleFilledIcon className={classesLearning.playIcon} />
>>>>>>> f4a828b (initial)
            </div>
            <CardContent className={classesLearning.content}>
              <Typography
                variant='body1'
                color='textPrimary'
                componen='span'
                style={{ fontStyle: 'bold', fontSize: 22 }}
              >
                {course && course.name}
              </Typography>
              <Typography
                variant='caption'
                color='textSecondary'
                componen='span'
                style={{ fontStyle: 'bold', fontSize: 12 }}
              >
<<<<<<< HEAD
                {progressCount.length === newCourseContent.length
                  ? '100% Completed'
                  : `Progress: ${progressCount.length} / ${newCourseContent.length}`}
=======
                Progress: {progressCount} / {newCourseContent.length}
>>>>>>> f4a828b (initial)
              </Typography>
            </CardContent>
          </div>
        </Link>
      )}
      {learning ? null : (
        <Link href={`/course/${course && course.slug}`}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={course && course.image}
              title={course && course.name}
            />

            <CardContent>
              <Typography gutterBottom variant='h5' componen='span'>
                {course && course.name}
              </Typography>

<<<<<<< HEAD
              {myLearning ? (
                ''
              ) : course.totalSold ? (
=======
              {course.totalSold ? (
>>>>>>> f4a828b (initial)
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <PeopleIcon />{' '}
                  </div>
                  <div> {course && course.totalSold}</div>
                </div>
<<<<<<< HEAD
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <PeopleIcon />{' '}
                  </div>
                  <div>0</div>
                </div>
              )}

              {myLearning
                ? course.completedCertificate !== ''
                  ? `100% Completed`
                  : ''
                : ''}
            </CardContent>

=======
              ) : null}
            </CardContent>
>>>>>>> f4a828b (initial)
            {course && course.rating ? (
              <div style={{ display: 'flex' }}>
                <span style={{ marginLeft: 10 }}></span>
                <Rating value={course.rating} text={`(${course.numReviews})`} />
              </div>
            ) : null}
          </CardActionArea>
        </Link>
      )}

<<<<<<< HEAD
      {learning ? null : <CardActions></CardActions>}
=======
      {learning ? null : (
        <CardActions>
          <Button size='small' color='primary'>
            Share
          </Button>
        </CardActions>
      )}
>>>>>>> f4a828b (initial)
    </Card>
  )
}

export default Course

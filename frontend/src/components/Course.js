import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Link,
} from '@material-ui/core'
import Rating from './Rating'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PeopleIcon from '@material-ui/icons/People'
const useStyles = makeStyles({
  root: {
    width: 225,
    marginRight: 10,
  },
  media: {
    height: 140,
  },
})

const learningStyles = makeStyles({
  root: {
    marginRight: 10,
    width: '100%',
  },
  media: {
    width: 125,
    height: 125,
    position: 'relative',
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
    opacity: '0.97',
    '&:hover': {
      opacity: '0.7',
    },
  },
  learningBody: {
    display: 'flex',
  },
  content: {},
})

const Course = ({ course, learning }) => {
  const classes = useStyles()
  const classesLearning = learningStyles()

  return (
    <Card className={learning ? classesLearning.root : classes.root}>
      {learning && (
        <Link href={`/course/${course._id}/learn`}>
          <div className={classesLearning.learningBody}>
            <div className={classesLearning.media}>
              <CardMedia
                className={classesLearning.mediaImg}
                image={course.image}
                title={course.name}
              />
              <PlayCircleFilledIcon className={classesLearning.playIcon} />
            </div>
            <CardContent className={classesLearning.content}>
              <Typography
                variant='body1'
                color='textPrimary'
                componen='span'
                style={{ fontStyle: 'bold' }}
              >
                {course.name}
              </Typography>
              <Typography
                variant='caption'
                color='textSecondary'
                componen='span'
              >
                Progress: 1/10
              </Typography>
            </CardContent>
          </div>
        </Link>
      )}
      {learning ? null : (
        <Link href={`/course/${course._id}`}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={course.image}
              title={course.name}
            />

            <CardContent>
              <Typography gutterBottom variant='h5' componen='span'>
                {course.name}
              </Typography>
              {course.totalSold ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <PeopleIcon />{' '}
                  </div>
                  <div> {course.totalSold}</div>
                </div>
              ) : null}
            </CardContent>
            {course.rating ? (
              <div style={{ display: 'flex' }}>
                <span style={{ marginLeft: 10 }}></span>
                <Rating value={course.rating} text={`(${course.numReviews})`} />
              </div>
            ) : null}
          </CardActionArea>
        </Link>
      )}

      {learning ? null : (
        <CardActions>
          <Button size='small' color='primary'>
            Share
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default Course

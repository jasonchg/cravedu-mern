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
  Grid,
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
    maxWidth: 400,
    marginRight: 10,
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
})

const Course = ({ course, learning }) => {
  const classes = useStyles()
  const classesLearning = learningStyles()

  return (
    <Card className={learning ? classesLearning.root : classes.root}>
      {learning && (
        <Link href={`/course/${course._id}/learn`}>
          <Grid container alignItems='center'>
            <Grid item xs={4}>
              <div className={classesLearning.media}>
                <CardMedia
                  className={classesLearning.mediaImg}
                  image={course.image}
                  title={course.name}
                />
                <PlayCircleFilledIcon className={classesLearning.playIcon} />
              </div>
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Typography variant='h5' color='textPrimary' componen='span'>
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
            </Grid>
          </Grid>
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
                <span
                  style={{
                    display: 'flex',
                    alignContent: 'center',
                  }}
                >
                  <PeopleIcon /> {course.totalSold}
                </span>
              ) : null}
            </CardContent>
            {course.rating ? (
              <Rating value={course.rating} text={`(${course.numReviews})`} />
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

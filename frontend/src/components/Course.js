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

const useStyles = makeStyles({
  root: {
    width: 200,
    maxWidth: 235,
    margin: 10,
  },
  media: {
    height: 140,
  },
})

const learningStyles = makeStyles({
  root: {
    width: 375,
    maxWidth: 400,
    margin: 10,
  },
  media: {
    width: 125,
    height: 125,
    backgroundSize: 'auto 100%',
    backgroundPosition: 'left top',
  },
})

const Course = ({ course, learning }) => {
  const classes = useStyles()
  const classesLearning = learningStyles()

  return (
    <Card className={learning ? classesLearning.root : classes.root}>
      <Link href={`/course/${course._id}`}>
        {learning && (
          <Grid container alignItems='center'>
            <Grid item xs={4}>
              <CardMedia
                className={classesLearning.media}
                image={course.image}
                title={course.name}
              />
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Typography component='h5' variant='h5'>
                  {course.name}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        )}
        {learning ? null : (
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={course.image}
              title={course.name}
            />

            <CardContent>
              <Typography gutterBottom variant='h5' component='h5'>
                {course.name}
              </Typography>
            </CardContent>
            {course.rating ? (
              <Rating
                value={course.rating}
                text={`${course.numReviews} reviews`}
              />
            ) : null}
          </CardActionArea>
        )}
      </Link>

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

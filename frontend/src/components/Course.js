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

const useStyles = makeStyles({
  root: {
    width: 200,
    maxWidth: 235,
    margin: 7,
  },
  media: {
    height: 140,
  },
})

const Course = ({ course }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Link href={`/course/${course._id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={course.image}
            title={course.name}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {course.name}
            </Typography>
          </CardContent>
          <Rating value={course.rating} text={`${course.numReviews} reviews`} />
        </CardActionArea>
      </Link>

      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
      </CardActions>
    </Card>
  )
}

export default Course

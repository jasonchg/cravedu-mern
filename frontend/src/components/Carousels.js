import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  carousel: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  slide: {
    textAlign: 'center',
    minHeight: '300px',
    padding: '20px',
    cursor: 'pointer',
  },
  slideBody: {
    height: '100%',
    width: '100%',
  },
  slideImg: {
    width: '300px',
    borderRadius: '7px',
  },
})

const Carousels = ({ autoPlay = true, indicators = true, courses }) => {
  const classes = useStyles()

  const Item = ({ course }) => {
    return (
      <Paper
        className={classes.slide}
        onClick={() => (window.location.href = `/course/${course._id}`)}
      >
        <div className={classes.slideBody}>
          <img className={classes.slideImg} src={course.image} alt='' />
          <h2>{course.name}</h2>
          <p>{course.description}</p>
        </div>
      </Paper>
    )
  }

  return (
    <Carousel
      className={classes.carousel}
      autoPlay={autoPlay}
      animation='slide'
      navButtonsAlwaysVisible
      indicators={indicators}
      interval={5000}
    >
      {courses.map((course, i) => (
        <Item key={i} course={course} />
      ))}
    </Carousel>
  )
}

export default Carousels

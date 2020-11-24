import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  carousel: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  slide: {
    cursor: 'pointer',
    borderRadius: 20,
  },
  slideBody: {
    height: '100%',
    width: '100%',
    display: 'flex',
  },
  slideImg: {
    maxWidth: '330px',
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  slideTextContainer: {
    margin: 20,
    padding: 20,
    background: '#eee',
    borderRadius: 20,
    width: '100%',
  },
  slideText: {
    fontSize: 45,
    paddingRight: 20,
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

          <div className={classes.slideTextContainer}>
            <h2 className={classes.slideText}>{course.name}</h2>
            <p>{course.description}</p>
          </div>
        </div>
      </Paper>
    )
  }

  return (
    <Carousel
      className={classes.carousel}
      autoPlay={autoPlay}
      animation='slide'
      navButtonsAlwaysVisible={false}
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

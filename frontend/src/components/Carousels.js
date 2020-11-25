import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, makeStyles } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People'

const useStyles = makeStyles({
  carousel: {
    marginTop: '20px',
    marginBottom: '20px',
    maxHeight: 310,
  },
  slide: {
    cursor: 'pointer',
    borderRadius: 20,
  },
  slideBody: {
    maxHeight: '100%',
    maxWidth: '100%',
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
    maxWidth: '100%',
    maxHeight: '100%',
  },
  slideText: {
    fontSize: 40,
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
            <span
              style={{ display: 'flex', alignContent: 'center', fontSize: 20 }}
            >
              <PeopleIcon /> {course.totalSold}
            </span>
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

import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People'

const useStyles = makeStyles({
  carousel: {
    marginTop: '20px',
    marginBottom: '20px',
    maxHeight: 310,
  },
  slideContainer: {
    cursor: 'pointer',
    background: '#fff',
  },
  slideBody: {
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'flex',
  },
  slideImg: {
    maxWidth: '330px',
    marginRight: 10,
  },
  slideTextContainer: {
    padding: 10,
  },
  slideText: {
    fontSize: 40,
  },
})

const Carousels = ({ autoPlay = true, courses }) => {
  const classes = useStyles()

  const Item = ({ course }) => {
    return (
      <div
        className={classes.slideContainer}
        onClick={() => (window.location.href = `/course/${course._id}`)}
      >
        <div className={classes.slideBody}>
          <img className={classes.slideImg} src={course.image} alt='' />

          <div className={classes.slideTextContainer}>
            <h2 className={classes.slideText}>{course.name}</h2>
            <p
              style={{
                fontSize: 16,
              }}
            >
              {course.description}
            </p>

            <div
              style={{
                display: 'flex',
                alignContent: 'center',
                fontSize: 16,
              }}
            >
              <div>
                <PeopleIcon
                  style={{
                    fontSize: 20,
                    marginRight: 10,
                  }}
                />
              </div>
              <div>{`  ${course.totalSold} enrolled`}</div>
            </div>
            <div style={{ marginTop: 30, fontSize: 24 }}>RM{course.price}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Carousel
      className={classes.carousel}
      autoPlay={autoPlay}
      animation='slide'
      navButtonsAlwaysVisible={false}
      indicators={false}
      interval={5000}
    >
      {courses.map((course, i) => (
        <Item key={i} course={course} />
      ))}
    </Carousel>
  )
}

export default Carousels

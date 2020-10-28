import React, { useEffect } from 'react'
import {
  Button,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Divider,
} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { makeStyles } from '@material-ui/core/styles'
import { listCourseDetails } from '../actions/courseActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const CourseScreen = ({ match, history }) => {
  const courseId = match.params.id
  const dispatch = useDispatch()
  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  const goBack = () => {
    history.push('/')
  }
  const addToCartHandler = () => {
    history.push(`/cart/${courseId}`)
  }

  useEffect(() => {
    dispatch(listCourseDetails(courseId))
  }, [dispatch, courseId])

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      background: '#f0f0f0',
      margin: 'auto',
      marginTop: 10,
    },
    image: {
      width: 325,
      margin: 10,
      padding: 10,
      paddingRight: 10,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    titleBox: {
      paddingLeft: 40,
      paddingRight: 40,
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    description: {
      textAlign: 'justify',
    },
    priceTable: {
      paddingLeft: 10,
    },
    button: {
      margin: 12,
      width: 175,
      padding: 15,
    },
  }))
  const classes = useStyles()
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Container maxWidth='md' className={classes.root}>
          <Button onClick={goBack}>Go Back</Button>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={6}>
                    <div className='image'>
                      <img
                        src={course.image}
                        alt={course.name}
                        className={classes.image}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={6} className={classes.titleBox}>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant='h4'>{course.name}</Typography>
                          }
                          secondary={`Created by ${course.instructor}`}
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText
                          primary={
                            <Rating
                              value={course.rating}
                              text={`${course.numReviews} reviews`}
                            />
                          }
                        />
                      </ListItem>
                      <Divider />
                      <ListItem className={classes.description}>
                        <ListItemText
                          secondary={`Description: ${course.description}`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={3} className={classes.priceTable}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>RM</TableCell>
                    <TableCell>{course.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Update</TableCell>
                    <TableCell>
                      {course.updatedAt && course.updatedAt.substring(0, 10)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                size='medium'
                startIcon={<AddShoppingCartIcon />}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
              <Divider />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default CourseScreen

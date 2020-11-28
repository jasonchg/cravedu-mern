import React, { useEffect } from 'react'
import {
  Grid,
  Container,
  Typography,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Button,
  Paper,
  Divider,
} from '@material-ui/core'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
import Banner from '../components/Banner'
import Breadcrumbs from '../components/Breadcrumbs'

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  paper: {
    background: '#f0f0f0',
    padding: 10,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  cartImage: {
    width: 120,
  },
  checkoutButton: {
    width: '100%',
    padding: 15,
  },
  deleteButton: {
    '&:hover': {
      color: 'maroon',
      background: 'none',
    },
  },
  cart: {
    marginRight: 7,
  },
  listItem: {
    margin: 7,
    border: '1px solid #999',
  },
  cartItemDetails: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})

const CartScreen = ({ match, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const courseId = match.params.id

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (courseId) {
      dispatch(addToCart(courseId))
    }
  }, [dispatch, courseId])

  const removeFromCartHandler = (courseId) => {
    dispatch(removeFromCart(courseId))
  }

  const checkoutHandler = () => {
    history.push('/payment')
  }

  return (
    <>
      <Breadcrumbs
        previousPage={[
          {
            name: 'Home',
            link: '/',
          },
        ]}
        currentPage='Cart'
      />

      <Grid container>
        <Banner
          text='To keep us available in this valuable platform '
          subText='Enjoy up to 90% discount. Shop now, some of the courses only MYR10.'
        />
      </Grid>
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {cartItems.length === 0 ? (
              <Message severity='info'>
                Your cart is empty.
                <Link href='/'> Add a course?</Link>
              </Message>
            ) : (
              <div className={classes.cart}>
                <Typography variant='body1' component='span'>
                  {`${cartItems.length} items in cart`}
                </Typography>
                <List>
                  {cartItems.map((item) => (
                    <div key={item.course}>
                      <ListItem className={classes.listItem}>
                        <Grid container spacing={2}>
                          <Grid item xs={3}>
                            <ListItemAvatar>
                              <Link href={`/course/${item.course}`}>
                                <img
                                  className={classes.cartImage}
                                  src={item.image}
                                  alt={item.image}
                                />
                              </Link>
                            </ListItemAvatar>
                          </Grid>
                          <Grid item xs={9} className={classes.cartItemDetails}>
                            <div style={{ flex: 1 }}>
                              <Link href={`/course/${item.course}`}>
                                <ListItemText
                                  primary={item.name}
                                  secondary={`By ${item.instructor}`}
                                />
                              </Link>
                            </div>
                            <div>
                              <p>RM {item.price}</p>
                            </div>

                            <div>
                              <IconButton
                                className={classes.deleteButton}
                                aria-label='delete'
                                onClick={() =>
                                  removeFromCartHandler(item.course)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </div>
                  ))}
                </List>
              </div>
            )}
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant='h5'>Total:</Typography>}
                  />
                </ListItem>
                <Divider className={classes.divider} />
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant='h5'>
                        RM{' '}
                        {cartItems
                          .reduce((acc, item) => acc + item.price, 0)
                          .toFixed(2)}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>

              <Divider className={classes.divider} />

              <Button
                className={classes.checkoutButton}
                variant='contained'
                color='primary'
                onClick={checkoutHandler}
                startIcon={<DoneAllIcon />}
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default CartScreen

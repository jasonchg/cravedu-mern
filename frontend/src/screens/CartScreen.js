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
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'

const useStyles = makeStyles((theme) => ({
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
}))

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

  const checkOutHandler = () => {
    console.log('Checkout')
  }

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant='h3'>Cart</Typography>
          {cartItems.length === 0 ? (
            <Message severity='info'>
              Your cart is empty.
              <Link href='/'> Add a course?</Link>
            </Message>
          ) : (
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.course}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <ListItemAvatar>
                        <img
                          className={classes.cartImage}
                          src={item.image}
                          alt={item.image}
                        />
                      </ListItemAvatar>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText
                        primary={item.name}
                        secondary={item.instructor}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <p>RM {item.price}</p>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        aria-label='delete'
                        onClick={() => removeFromCartHandler(item.course)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant='h5'>
                      Subtotal ({cartItems.reduce((acc, item) => acc + 1, 0)}{' '}
                      {''}
                      items)
                    </Typography>
                  }
                />
              </ListItem>
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
              variant='contained'
              color='primary'
              onClick={checkOutHandler}
            >
              Proceed To Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CartScreen

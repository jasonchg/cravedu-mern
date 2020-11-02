import React, { useEffect } from 'react'
import {
  Grid,
  Container,
  Typography,
  Button,
  Link,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'

import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 40,
  },
  paper: {
    padding: 15,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  checkoutButton: {
    width: '100%',
    padding: 15,
  },
  cartImage: {
    width: 120,
  },
  checkoutInput: {
    margin: 10,
  },
  excludeFromPrint: {
    '@media print': {
      display: 'none',
    },
  },
}))

const ViewOrderScreen = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails

  const orderId = match.params.id

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  return (
    <Container>
      <Typography variant='h2' color='primary'>
        Invoice{' '}
        <Button
          className={classes.excludeFromPrint}
          onClick={() => window.print()}
        >
          Print This Invoice
        </Button>
      </Typography>

      <Divider className={classes.divider} />
      <Grid Container spacing={3}>
        <Grid item xs={12}>
          {error ? (
            <Message>{error} </Message>
          ) : loading ? (
            <Loader />
          ) : (
            <FormContainer>
              {order.length === 0 ? (
                <Message severity='info'>
                  Your cart is empty.
                  <Link href='/'> Add a course?</Link>
                </Message>
              ) : (
                <List>
                  <Grid container>
                    <Grid item xs={8}>
                      <Paper className={classes.paper}>
                        <h2>Order ID #{orderId} </h2>
                      </Paper>
                    </Grid>

                    <Grid item xs={4}>
                      <ListItem>
                        <ListItemText>
                          Date: {order.createdAt.substring(10, 0)}
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          Payment Method: {order.paymentMethod}
                        </ListItemText>
                      </ListItem>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <h4>Bill to</h4>
                    <ListItem>
                      <ListItemText>{order.user.name}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>{order.user.email}</ListItemText>
                    </ListItem>
                  </Grid>

                  <Divider className={classes.divider} />

                  <h2>
                    Order Items (
                    {order.orderItems.reduce((acc, item) => acc + 1, 0)})
                  </h2>
                  {order.orderItems.map((item, index) => (
                    <div key={item.course}>
                      <ListItem>
                        <Typography variant='bold' style={{ marginRight: 10 }}>
                          {index + 1 + '.'}
                        </Typography>
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
                          <Grid item xs={6}>
                            <Link href={`/course/${item.course}`}>
                              <ListItemText primary={item.name} />
                            </Link>
                          </Grid>
                          <Grid item xs={2}>
                            <p>RM {item.price}</p>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider className={classes.divider} />
                    </div>
                  ))}
                </List>
              )}
            </FormContainer>
          )}
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItem style={{ textAlign: 'end' }}>
              <ListItemText>Tax (RM): RM 0.00</ListItemText>
            </ListItem>
            <ListItem style={{ textAlign: 'end' }}>
              <ListItemText>
                <h2> Total Price (RM): {order && Number(order.totalPrice)}</h2>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ViewOrderScreen

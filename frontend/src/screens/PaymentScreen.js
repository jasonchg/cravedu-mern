import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Grid,
  Container,
  Typography,
  Button,
  Link,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
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
import DoneAllIcon from '@material-ui/icons/DoneAll'
import PaymentIcon from '@material-ui/icons/Payment'
import { savePaymentMethod } from '../actions/cartActions'
import { addOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ADD_ORDER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 40,
  },
  paper: {
    background: '#f0f0f0',
    padding: 10,
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
}))

const PaymentScreen = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const [billingAddress, setBillingAddress] = useState('Malaysia')
  const [sdkReady, setSdkReady] = useState(false)

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderAdd = useSelector((state) => state.orderAdd)
  const { success, loading, error } = orderAdd

  let cartItemPrice = Number(
    cartItems.reduce((acc, item) => acc + item.price, 0)
  ).toFixed(2)

  const successPaymentHandler = () => {
    dispatch(savePaymentMethod(paymentMethod))

    dispatch(
      addOrder({
        orderItems: cartItems,
        paymentMethod: paymentMethod,
        itemPrice: cartItemPrice,
        totalPrice: cartItemPrice,
        isPaid: true,
      })
    )
    dispatch({ type: ORDER_PAY_RESET })
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login/paymentlogin')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (success) {
      dispatch({ type: ADD_ORDER_RESET })
      history.push('/mycourses')
    } else {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [history, success, dispatch])

  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormContainer>
              <h1>Check Out</h1>
              {error && <Message>{error}</Message>}
              {loading && <Loader />}

              <FormContainer>
                <FormControl
                  component='fieldset'
                  className={classes.checkoutInput}
                >
                  <FormLabel component='legend'>Billing Address</FormLabel>
                  <FormContainer>
                    <Select
                      labelId='select_country'
                      id='select_country'
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                    >
                      <MenuItem value={'Malaysia'}>Malaysia</MenuItem>
                      <MenuItem value={'Other'} disabled>
                        Other
                      </MenuItem>
                    </Select>
                  </FormContainer>
                </FormControl>

                <FormContainer>
                  <FormControl
                    component='fieldset'
                    className={classes.checkoutInput}
                  >
                    <FormLabel component='legend'>Payment Method</FormLabel>
                    <FormContainer>
                      <RadioGroup
                        defaultValue='PayPal'
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <span>
                          <FormControlLabel
                            value='PayPal'
                            control={<Radio color='primary' />}
                            label={<i className='fa fa-paypal'></i>}
                          />
                          PayPal
                        </span>
                        <span>
                          <FormControlLabel
                            value='Other'
                            control={<Radio color='primary' />}
                            label={<PaymentIcon />}
                            disabled
                          />
                          Other
                        </span>
                      </RadioGroup>
                    </FormContainer>
                  </FormControl>
                </FormContainer>
              </FormContainer>
            </FormContainer>

            <h2>Order Items ({cartItems.reduce((acc, item) => acc + 1, 0)})</h2>
            <FormContainer>
              {cartItems.length === 0 ? (
                <Message severity='info'>
                  Your cart is empty.
                  <Link href='/'> Add a course?</Link>
                </Message>
              ) : (
                <List>
                  <Divider className={classes.divider} />
                  {cartItems.map((item) => (
                    <div key={item.course}>
                      <ListItem>
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
                              <ListItemText
                                primary={item.name}
                                secondary={item.instructor}
                              />
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
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant='h5'>Order Total</Typography>}
                  />
                </ListItem>
                <Divider className={classes.divider} />
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant='h5'>RM {cartItemPrice}</Typography>
                    }
                    secondary='*tax is included'
                  />
                </ListItem>
              </List>

              <Divider className={classes.divider} />

              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={cartItemPrice}
                  onSuccess={successPaymentHandler}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default PaymentScreen

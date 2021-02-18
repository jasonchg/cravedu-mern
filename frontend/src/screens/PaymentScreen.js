import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Grid,
  Container,
  Typography,
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
import PaymentIcon from '@material-ui/icons/Payment'
import { savePaymentMethod } from '../actions/cartActions'
import { addOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ADD_ORDER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
import { getUserCourses } from '../actions/userActions'
import Breadcrumbs from '../components/Breadcrumbs'
const useStyles = makeStyles((theme) => ({
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
  checkoutButton: {
    width: '100%',
    padding: 15,
  },
  cartImage: {
    width: 120,
  },
<<<<<<< HEAD
  payment: {
    marginLeft: 20,
    borderLeft: '1px solid #eaeaea',
    borderRight: '1px solid #eaeaea',
    paddingLeft: 10,
    paddingRight: 10,
  },
  billingDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
=======
  checkoutInput: {
    margin: 10,
>>>>>>> f4a828b (initial)
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

  const userCourses = useSelector((state) => state.userCourses)
  const { userPaidCourses } = userCourses

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
    const boughtDetected = () => {
      alert('Bought courses detected in your cart!')
      dispatch({ type: ADD_ORDER_RESET })
      localStorage.removeItem('cartItems')
      history.push('/mycourses')
    }

    const checkBought = (userPaidCourse, cart) => {
      cart.forEach((x) => {
        userPaidCourses.forEach((y) => {
          if (x.course === y._id) {
            boughtDetected()
          } else {
            return null
          }
        })
      })
    }

    const addPayPalScript = async () => {
      setSdkReady(false)
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=MYR`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!userInfo) {
      history.push('/login/paymentlogin')
    } else {
      if (success) {
        dispatch({ type: ADD_ORDER_RESET })
        history.push('/mycourses')
      } else {
        if (userPaidCourses) {
          checkBought(userPaidCourses, cartItems)
        } else {
          dispatch(getUserCourses())
        }

        if (!window.paypal) {
          setSdkReady(false)
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }
  }, [history, success, dispatch, userInfo, cartItems, userPaidCourses])

  return (
    <>
      <Breadcrumbs
        previousPage={[
          {
            name: 'Cart',
            link: '/cart',
          },
        ]}
        currentPage='Checkout'
      />

      <Container className={classes.root}>
        <form>
          <Grid container spacing={2}>
<<<<<<< HEAD
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                <div>
                  {error && <Message>{error}</Message>}
                  {loading && <Loader />}

                  <div
                    className={classes.billingDetails}
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignContent: 'flex-start',
                    }}
                  >
                    <div style={{ padding: 20 }}>
                      <FormControl component='fieldset'>
                        <FormLabel component='legend'>
                          Billing Address
                        </FormLabel>
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
                      <div style={{ marginTop: 20 }}>
                        <FormControl component='fieldset'>
                          <FormLabel component='legend'>
                            Payment Method
                          </FormLabel>
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
                      </div>
                    </div>

                    <div style={{ padding: 20 }}>
                      <FormControl component='fieldset'>
                        <FormLabel component='legend'>Billing</FormLabel>
                        <div style={{ marginTop: 20 }}>
                          {userInfo.name} <br />
                          <br />
                          <span>{userInfo.email}</span>
                        </div>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </Paper>
=======
            <Grid item xs={8}>
              <FormContainer>
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
>>>>>>> f4a828b (initial)

              <h2>
                Order Items ({cartItems.reduce((acc, item) => acc + 1, 0)})
              </h2>
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

<<<<<<< HEAD
            <Grid item md={4} xs={12}>
=======
            <Grid item xs={4}>
>>>>>>> f4a828b (initial)
              <Paper className={classes.paper}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant='h5'>Order Total</Typography>
                      }
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
                    currency='MYR'
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  )
}

export default PaymentScreen

import React, { useState } from 'react'
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
import Loader from '../components/Loader'
import DoneAllIcon from '@material-ui/icons/DoneAll'

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
  const dispath = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const [billingAddress, setBillingAddress] = useState('Malaysia')

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const checkoutHandler = (e) => {
    e.preventDefault()
    // dispath(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormContainer>
              <h1>Check Out</h1>

              <FormContainer>
                <FormControl
                  component='fieldset'
                  className={classes.checkoutInput}
                >
                  <FormLabel component='legend'>Billing Address</FormLabel>
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
                </FormControl>

                <FormContainer>
                  <FormControl
                    component='fieldset'
                    className={classes.checkoutInput}
                  >
                    <FormLabel component='legend'>Payment Method</FormLabel>
                    <RadioGroup
                      defaultValue='PayPal'
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value='PayPal'
                        control={<Radio color='primary' />}
                        label='PayPal'
                      />

                      <FormControlLabel
                        value='Other'
                        control={<Radio color='primary' />}
                        label='Other'
                        disabled
                      />
                    </RadioGroup>
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
                    primary={<Typography variant='h5'>Total</Typography>}
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
                    secondary='*tax is included'
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
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default PaymentScreen

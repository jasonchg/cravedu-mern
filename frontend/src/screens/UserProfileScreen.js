import React, { useState, useEffect } from 'react'
import {
  Grid,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserDetails } from '../actions/userActions'
import { getAllMyOrders } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Breadcrumbs from '../components/Breadcrumbs'
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  list: {
    background: '#fff',
    border: '1px solid #999',
    height: '80vh',
    padding: 10,
    overflow: 'scroll',
    overflowX: 'hidden',
  },
}))

const UserProfileScreen = ({ history }) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [match, setMatch] = useState(true)
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderAllMy = useSelector((state) => state.orderAllMy)
  const { loading: orderMyLoading, myOrders, error: orderMyError } = orderAllMy

  useEffect(() => {
    if (success) {
      alert('Profile Updated')
    }

    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getAllMyOrders())
      if (!user || !user.name || success) {
        setPassword('')
        setConfirmPassword('')
        setMatch(true)
        dispatch({ type: USER_UPDATE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, userInfo, history, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      dispatch(updateUserDetails({ _id: user._id, name, email, password }))
    } else {
      setMatch(false)
    }
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
        currentPage={'User Profile'}
      />

      <Container>
        {error && <Message>{error}</Message>}

        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={3} className={classes.root}>
            <Grid item md={5} xs={12}>
              <h2>My Info</h2>
              <FormContainer>
                <form className={classes.form} onSubmit={submitHandler}>
                  <FormContainer>
                    <TextField
                      required
                      fullWidth
                      disabled
                      id='email'
                      type='email'
                      label='Email Address'
                      placeholder=''
                      variant='filled'
                      value={email}
                      autoComplete='email'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormContainer>

                  <FormContainer>
                    <TextField
                      required
                      fullWidth
                      id='name'
                      type='text'
                      label='Name'
                      placeholder=''
                      variant='filled'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormContainer>

                  <FormContainer>
                    <TextField
                      fullWidth
                      id='password-form1'
                      label='Password'
                      type='password'
                      autoComplete='current-password'
                      variant='filled'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      helperText='blank if no changes'
                    />
                  </FormContainer>

                  <FormContainer>
                    {!match ? (
                      <TextField
                        error
                        fullWidth
                        id='confirm-password-form2'
                        label='Confirm Password'
                        type='password'
                        autoComplete='current-password'
                        variant='filled'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        helperText='Password do not match'
                      />
                    ) : (
                      <TextField
                        fullWidth
                        id='confirm-password-form2'
                        label='Confirm Password'
                        type='password'
                        autoComplete='current-password'
                        variant='filled'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        helperText='blank if no changes'
                      />
                    )}
                  </FormContainer>

                  <Button type='submit' variant='contained' color='primary'>
                    Update Profile
                  </Button>
                </form>
              </FormContainer>
            </Grid>
            <Grid item md={7} xs={12}>
              <div className={classes.list}>
                <h2>My Orders History</h2>
                {myOrders && myOrders.length !== 0 ? (
                  <p>{`${myOrders.length} orders in total.`}</p>
                ) : null}
                {orderMyError && <Message>{orderMyError}</Message>}
                {orderMyLoading && <Loader />}
                <List>
                  {myOrders ? (
                    myOrders.length === 0 ? (
                      <Message severity='info'>No order found</Message>
                    ) : (
                      myOrders.map((order) => (
                        <div key={order._id}>
                          <ListItem>
                            <ListItemText
                              primary={`ID# ${order._id}`}
                              secondary={`Purchased at ${order.createdAt.substring(
                                10,
                                0
                              )}`}
                            />
                            <Button
                              onClick={() =>
                                history.push(`/order/${order._id}`)
                              }
                            >
                              View
                            </Button>
                          </ListItem>
                          <Divider />
                        </div>
                      ))
                    )
                  ) : null}
                </List>
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  )
}

export default UserProfileScreen

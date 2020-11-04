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
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 40,
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
    <Container maxWidth='md'>
      {error && <Message>{error}</Message>}

      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <h1>User Profile</h1>
            <FormContainer>
              <form className={classes.form} onSubmit={submitHandler}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' color='primary'>
                    Update Profile
                  </Button>
                </Grid>
              </form>
            </FormContainer>
          </Grid>
          <Grid item xs={7}>
            <h2>My Orders History</h2>
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
                          onClick={() => history.push(`/order/${order._id}`)}
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
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default UserProfileScreen

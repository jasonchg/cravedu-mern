import React, { useState, useEffect } from 'react'
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Link,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserDetails } from '../actions/userActions'
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

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
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
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <Grid container spacing={3} flexDirection='row'>
        <Grid item xs={5}>
          <FormContainer>
            <h1>User Profile</h1>
            <form className={classes.form} onSubmit={submitHandler}>
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
                    required
                    fullWidth
                    id='email'
                    type='email'
                    label='Email Address'
                    placeholder=''
                    variant='filled'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormContainer>
              </Grid>
              <Grid item xs={12}>
                <FormContainer>
                  <TextField
                    fullWidth
                    id='password'
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
                      id='password'
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
                      id='password'
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
          <h1>Other</h1>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UserProfileScreen

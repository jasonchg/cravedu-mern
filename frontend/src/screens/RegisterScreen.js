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
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 40,
  },
}))

const RegisterScreen = ({ history, location }) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [match, setMatch] = useState(true)
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      dispatch(register(name, email, password))
    } else {
      setMatch(false)
    }
  }

  return (
    <div>
      <FormContainer>
        <Container maxWidth='md' className={classes.root}>
          <Grid container direction='column' justify='flex-start'>
            <Grid item xs={12}>
              <Typography variant='h4'>User Register</Typography>
            </Grid>
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
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
                    required
                    fullWidth
                    id='password'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    variant='filled'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormContainer>
              </Grid>
              <Grid item xs={12}>
                <FormContainer>
                  {!match ? (
                    <TextField
                      error
                      required
                      fullWidth
                      id='confirm-password'
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
                      required
                      fullWidth
                      id='confirm-password'
                      label='Confirm Password'
                      type='password'
                      autoComplete='current-password'
                      variant='filled'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  )}
                </FormContainer>
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' color='primary'>
                  Register
                </Button>
              </Grid>
            </form>
            <Grid item xs={12}>
              <FormContainer>
                <Typography variant='body2'>
                  Have an account?{' '}
                  <Link
                    href={redirect ? `/login?redirect=${redirect}` : '/login'}
                  >
                    Login
                  </Link>
                </Typography>
              </FormContainer>
            </Grid>
          </Grid>
        </Container>
      </FormContainer>
    </div>
  )
}

export default RegisterScreen

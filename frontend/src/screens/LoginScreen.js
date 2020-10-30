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
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 40,
  },
}))

const LoginScreen = ({ history, location, match }) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const id = match.params.id
  console.log(id)

  useEffect(() => {
    if (userInfo) {
      if (id === 'paymentlogin') {
        history.push('/payment')
      } else {
        history.push(redirect)
      }
    }
  }, [history, redirect, userInfo, id])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <Container maxWidth='md' className={classes.root}>
        <Grid container direction='column' justify='flex-start'>
          <Grid item xs={12}>
            <Typography variant='h4'>User Login</Typography>
          </Grid>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <form className={classes.form} onSubmit={submitHandler}>
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
              <Button type='submit' variant='contained' color='primary'>
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormContainer>
                <Typography variant='body2'>
                  New User?{' '}
                  <Link
                    href={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    Register
                  </Link>
                </Typography>
              </FormContainer>
            </Grid>
          </form>
        </Grid>
      </Container>
    </FormContainer>
  )
}

export default LoginScreen

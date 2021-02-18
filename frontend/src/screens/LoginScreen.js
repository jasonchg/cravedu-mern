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
<<<<<<< HEAD

=======
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
  MicrosoftLoginButton,
} from 'react-social-login-buttons'
>>>>>>> f4a828b (initial)
import LogoIcon from '../assets/images/logo-icon.png'

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  rightLoginContainer: {
    marginTop: '12px',
    maxWidth: '400px',
  },
  socialButtons: {
    marginBottom: 50,
  },
  leftLoginContainer: {
    backgroundColor: '#457b9d',
    height: '70vh',
    marginTop: '40px',
    position: 'relative',
<<<<<<< HEAD
    marginBottom: '40px',
=======
    marginBottom: '10px',
>>>>>>> f4a828b (initial)
    '& img': {
      position: 'absolute',
      width: '175px',
      left: 40,
      top: 30,
    },
  },
  leftInnerLoginContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    background: '#1d3557',
    padding: '20px',
    color: '#eee ',
    width: '320px',
    textAlign: 'left',
    boxShadow: '10px 10px 5px 0px rgba(19,19,48,1)',
    '& a': {
      color: '#eee !important',
      fontStyle: 'italic',
    },
    '& p': {
      marginTop: '20px',
    },
  },
})

const LoginScreen = ({ history, location, match }) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const id = match.params.id
<<<<<<< HEAD
=======
  console.log(id)
>>>>>>> f4a828b (initial)

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
    <>
      <Container className={classes.root}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12} className={classes.leftLoginContainer}>
            <img src={LogoIcon} alt='' />
            <div className={classes.leftInnerLoginContainer}>
              <Typography variant='h3' component='span'>
                Good to see you again
              </Typography>
              <Typography component='p'>
                By logged into Cravedu you're agreed to our{' '}
                <a href='/'>Privacy Policies</a> and{' '}
                <a href='/'> Terms & Conditions</a>.
              </Typography>
            </div>
          </Grid>

          <Grid item md={6} xs={12} className={classes.rightLoginContainer}>
            {error && <Message>{error}</Message>}

<<<<<<< HEAD
=======
            <Typography variant='h5'>Social Logins</Typography>
            <div className={classes.socialButtons}>
              <FacebookLoginButton onClick={() => alert('Facebook')} />
              <GoogleLoginButton onClick={() => alert('Google')} />
              <TwitterLoginButton onClick={() => alert('Twitter')} />
              <MicrosoftLoginButton onClick={() => alert('Microsoft')} />
            </div>
>>>>>>> f4a828b (initial)
            <Typography variant='h5'>Email Logins</Typography>
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
<<<<<<< HEAD
                {/* <FormContainer>
                  <Typography variant='body2'>
                    <Link href={'/'}> Forget Password </Link>
                  </Typography>
                </FormContainer> */}
=======
                <FormContainer>
                  <Typography variant='body2'>
                    <Link href={'/'}> Forget Password </Link>
                  </Typography>
                </FormContainer>
>>>>>>> f4a828b (initial)
              </Grid>
              <Grid item xs={12} style={{ display: 'flex' }}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                >
                  Login
                </Button>
<<<<<<< HEAD
=======
                {loading && <Loader style={{ position: 'absolute' }} />}
>>>>>>> f4a828b (initial)
              </Grid>
              <Grid item xs={12}>
                <FormContainer>
                  <Typography variant='body2'>
                    New User?{' '}
                    <Link
                      href={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : '/register'
                      }
                    >
                      Register
                    </Link>
                  </Typography>
                </FormContainer>
              </Grid>
<<<<<<< HEAD
              {loading && <Loader style={{ position: 'absolute' }} />}
=======
>>>>>>> f4a828b (initial)
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default LoginScreen

import React, { useState, useEffect } from 'react'
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
  MicrosoftLoginButton,
} from 'react-social-login-buttons'
import LogoIcon from '../assets/images/logo-icon.png'

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    width: '100vw',
    position: 'relative',
  },
  leftSignupContainer: {
    marginTop: '12px',
    maxWidth: '400px',
  },
  socialButtons: {
    marginBottom: 50,
  },
  radioGroup: {
    marginTop: 20,
  },
  rightRegisterContainer: {
    backgroundColor: '#457b9d',
    marginTop: '40px',
    marginLeft: '20px',
    position: 'relative',
    height: '75vh',
    marginBottom: '20px',
    '& img': {
      position: 'absolute',
      width: '175px',
      right: 40,
      top: 30,
    },
  },
  rightInnerRegisterContainer: {
    position: 'absolute',
    left: 20,
    bottom: 30,
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

const RegisterScreen = ({ history, location }) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [instructor, setInstructor] = useState('student')
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
      dispatch(register(name, email, password, instructor))
    } else {
      setMatch(false)
    }
  }

  const handleRadio = (e) => {
    setInstructor(e.target.value)
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={6}>
        <Grid item md={4} xs={12} className={classes.leftSignupContainer}>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}

          {/* <Typography variant='h5'>Social Sign up</Typography>
          <div className={classes.socialButtons}>
            <FacebookLoginButton onClick={() => alert('Facebook')} />
            <GoogleLoginButton onClick={() => alert('Google')} />
            <TwitterLoginButton onClick={() => alert('Twitter')} />
            <MicrosoftLoginButton onClick={() => alert('Microsoft')} />
          </div> */}
          <Typography variant='h5'>Email Sign up</Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.radioGroup}>
              <Typography variant='h6' component='span'>
                You're an?{' '}
              </Typography>
              <p>(*still can be changed after register.)</p>
              <RadioGroup
                defaultValue='student'
                aria-label='type'
                name='type'
                value={instructor}
                onChange={handleRadio}
              >
                <FormControlLabel
                  value='student'
                  control={<Radio />}
                  label='Student'
                />
                <FormControlLabel
                  value='instructor'
                  control={<Radio />}
                  label='Instructor'
                />
              </RadioGroup>
            </div>

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

            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
            >
              Register
            </Button>
          </form>

          <FormContainer>
            <Typography variant='body2'>
              Have an account?{' '}
              <Link href={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </Typography>
          </FormContainer>
        </Grid>

        <Grid item md={8} xs={12} className={classes.rightRegisterContainer}>
          <img src={LogoIcon} alt='' />
          <div className={classes.rightInnerRegisterContainer}>
            <Typography variant='h3' component='span'>
              Hey there, nice to meet you!
            </Typography>
            <Typography component='p'>
              By signup into Cravedu you're agreed to our{' '}
              <a href='/'>Privacy Policies</a> and{' '}
              <a href='/'> Terms & Conditions</a>.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RegisterScreen

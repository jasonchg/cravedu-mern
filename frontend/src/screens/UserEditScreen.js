import React, { useEffect, useState } from 'react'
import {
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles'
import { getUserById } from '../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
const useStyles = makeStyles((theme) => ({
  root: {},
}))

const UserEditScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userGetDetails = useSelector((state) => state.userGetDetails)
  const { userDetails, loading, error } = userGetDetails

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserById(match.params.id))
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, history, match])

  useEffect(() => {
    if (userDetails) {
      setEmail(userDetails.email)
      setName(userDetails.name)
      setIsAdmin(userDetails.isAdmin)
      setIsInstructor(userDetails.isInstructor)
    }
  }, [userDetails])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Button onClick={() => history.push('/admin/users')}>Go Back</Button>|
          <Button onClick={() => history.push('/admin/courses')}>
            Go To Manage Courses
          </Button>
        </Grid>
      </Grid>
      <h1>
        <SubdirectoryArrowRightIcon /> {userDetails && userDetails.name}
      </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error} </Message>
      ) : (
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing='3'>
            <Grid item xs={4}>
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
                <FormControlLabel
                  label='Admin'
                  control={
                    <Checkbox
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      name='isAdmin'
                      color='primary'
                    />
                  }
                />
              </FormContainer>

              <FormContainer>
                <FormControlLabel
                  label='Instructor'
                  control={
                    <Checkbox
                      checked={isInstructor}
                      onChange={(e) => setIsInstructor(e.target.checked)}
                      name='isInstructor'
                      color='primary'
                    />
                  }
                />
              </FormContainer>
            </Grid>

            <Grid item xs={8}>
              {isInstructor && <h2>Created Courses</h2>}

              <h2>Subscribed Courses</h2>
              <List>
                {userDetails.myCourses &&
                  userDetails.myCourses.map((course) => (
                    <div key={course._id}>
                      <ListItem>
                        <ListItemText primary={`ID# ${course._id}`} />
                        <Button>View</Button>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
              </List>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary'>
              Update User Profile
            </Button>
          </Grid>
        </form>
      )}
    </>
  )
}

export default UserEditScreen

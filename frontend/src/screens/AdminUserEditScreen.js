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
import { getUserById, updateUser } from '../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import {
  ADMIN_USER_DETAILS_RESET,
  ADMIN_USER_UPDATE_RESET,
} from '../constants/adminConstants'

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

const AdminUserEditScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const userId = match.params.id

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminUserGetDetails = useSelector((state) => state.adminUserGetDetails)
  const { userDetails, loading, error } = adminUserGetDetails

  const adminUserUpdateDetails = useSelector(
    (state) => state.adminUserUpdateDetails
  )
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = adminUserUpdateDetails

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false)

  // useEffect
  // check if user existed
  // check if user details exisited
  // check if user update success

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (updateSuccess) {
        dispatch({ type: ADMIN_USER_UPDATE_RESET })
        dispatch({ type: ADMIN_USER_DETAILS_RESET })
        history.push('/admin/users')
      } else {
        if (
          !userDetails ||
          !userDetails.name ||
          !userDetails.email ||
          userDetails._id !== userId
        ) {
          setName('')
          setEmail('')
          setIsAdmin(false)
          setIsInstructor(false)
          dispatch(getUserById(userId))
        } else {
          setName(userDetails.name)
          setEmail(userDetails.email)
          setIsAdmin(userDetails.isAdmin)
          setIsInstructor(userDetails.isInstructor)
        }
      }
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, history, updateSuccess, userDetails, userId])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
        isInstructor,
      })
    )
  }

  const handleAdminCheck = (e, isChecked) => {
    setIsAdmin(isChecked)
  }
  const handleInstructorCheck = (e, isChecked) => {
    setIsInstructor(isChecked)
  }

  return (
    <>
      <Grid container className={classes.root}>
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

      {updateLoading && <Loader left />}
      {updateError && <Message>{updateError}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error} </Message>
      ) : (
        <Grid container spacing='3'>
          <Grid item md={4} xs={12}>
            <form className={classes.form} onSubmit={submitHandler}>
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
                      onChange={handleAdminCheck}
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
                      onChange={handleInstructorCheck}
                      name='isInstructor'
                      color='primary'
                    />
                  }
                />
              </FormContainer>
              <Button type='submit' variant='contained' color='primary'>
                Update User Profile
              </Button>
            </form>
          </Grid>
          <Grid item md={8} xs={12}>
            <div className={classes.list}>
              <h4>
                User Id# {userDetails._id} <br /> Acocunt created since{' '}
                {userDetails.createdAt}
                <Divider />
              </h4>

              {isInstructor && (
                <Message severity='warning'>Created Courses</Message>
              )}

              <h2>Invoices</h2>
              <div>
                <List>
                  {userDetails.myCourses ? (
                    userDetails.myCourses.length === 0 ? (
                      <Message severity='info'>No invoice</Message>
                    ) : (
                      userDetails.myCourses.map((course, index) => (
                        <div key={course._id}>
                          <ListItem>
                            <ListItemText
                              primary={`${index + 1}.  ${course.orderId}`}
                            />
                            <Button
                              onClick={() =>
                                history.push(`/order/${course.orderId}`)
                              }
                            >
                              View
                            </Button>
                          </ListItem>
                          <Divider />
                        </div>
                      ))
                    )
                  ) : (
                    <Message>Something went wrong</Message>
                  )}
                </List>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default AdminUserEditScreen

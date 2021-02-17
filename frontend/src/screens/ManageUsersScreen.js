import React, { useEffect, useState } from 'react'
import {
  Grid,
  Button,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Typography,
  TextField,
} from '@material-ui/core'
import { listUsers } from '../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { ADMIN_USER_DETAILS_RESET } from '../constants/adminConstants'
import Breadcrumbs from '../components/Breadcrumbs'
import FormContainer from '../components/FormContainer'

const ManageUsersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminUserList = useSelector((state) => state.adminUserList)
  const { users, loading, error } = adminUserList

  const goToEdit = (id) => {
    history.push(`/admin/users/${id}/edit`)
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [allUsers, setAllUsers] = useState([])

  const searchHandler = (searchTerm) => {
    if (searchTerm !== '') {
      let temp = users.filter((x) => {
        return x.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      if (temp.length > 0) {
        setAllUsers(temp)
      } else {
        setAllUsers([])
      }
    } else {
      setAllUsers(users)
    }
  }

  useEffect(() => {
    setAllUsers(users)
  }, [users])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch({ type: ADMIN_USER_DETAILS_RESET })
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [userInfo, dispatch, history])

  return (
    <>
      <Breadcrumbs
        previousPage={[
          {
            name: 'Home',
            link: '/',
          },
        ]}
        currentPage='Users'
      />
      <Grid container style={{ marginTop: 10 }}>
        <Grid item xs={12}>
          <Button onClick={() => history.push('/')}>Home</Button> |
          <Button onClick={() => history.push('/admin')}>
            Go To Manage Courses
          </Button>
        </Grid>

        <Grid item xs={12}>
          {error ? (
            <Message>{error}</Message>
          ) : loading ? (
            <Loader />
          ) : (
            <TableContainer
              style={{
                overflow: 'scroll',
                overflowX: 'hidden',
                height: '700px',
                marginBottom: 10,
              }}
            >
              <FormContainer>
                <TextField
                  required
                  fullWidth
                  id='text'
                  label='Search terms'
                  type='text'
                  variant='filled'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Button onClick={() => searchHandler(searchTerm)}>
                        Search
                      </Button>
                    ),
                  }}
                />
              </FormContainer>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>No</TableCell>
                    <TableCell>Name </TableCell>
                    <TableCell align='center'>Admin</TableCell>
                    <TableCell align='center'>Instructor</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUsers ? (
                    allUsers.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell>
                          <b>{user.name}</b> <br />
                          <Typography variant='caption'>
                            ({user._id})
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          {user.isAdmin ? (
                            <CheckIcon style={{ color: 'green' }} />
                          ) : (
                            <CloseIcon style={{ color: 'red' }} />
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          {user.isInstructor ? (
                            <CheckIcon style={{ color: 'green' }} />
                          ) : (
                            <CloseIcon style={{ color: 'red' }} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => goToEdit(user._id)}
                            variant='outlined'
                          >
                            Edit Info
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Message>No User</Message>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default ManageUsersScreen

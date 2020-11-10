import React, { useEffect } from 'react'
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
} from '@material-ui/core'
import { listUsers } from '../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const ManageUsersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { users, loading, error } = userList

  const goToEdit = (id) => {
    if (id) {
      history.push(`/admin/users/${id}/edit`)
    }
  }

  let countMe = 1
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [userInfo, dispatch, history])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={() => history.push('/')}>Go Back</Button> |
        <Button onClick={() => history.push('/admin/courses')}>
          Go To Manage Courses
        </Button>
      </Grid>

      <Grid item xs={12}>
        <h1>Users</h1>
        {error ? (
          <Message>{error}</Message>
        ) : loading ? (
          <Loader />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name (#)</TableCell>
                  <TableCell align='center'>Admin</TableCell>
                  <TableCell align='center'>Instructor</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{countMe++}</TableCell>
                    <TableCell>
                      <b>{user.name}</b> <br />
                      <Typography variant='caption'>({user._id})</Typography>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  )
}

export default ManageUsersScreen

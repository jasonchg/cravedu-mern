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
import { ADMIN_USER_DETAILS_RESET } from '../constants/adminConstants'
import Breadcrumbs from '../components/Breadcrumbs'

const ManageUsersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const adminUserList = useSelector((state) => state.adminUserList)
  const { users, loading, error } = adminUserList

  const goToEdit = (id) => {
    history.push(`/admin/users/${id}/edit`)
  }

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
            name: 'Admin',
            link: '/admin',
          },
        ]}
        currentPage='Users'
      />
      <Grid container style={{ marginTop: 10 }}>
        <Grid item xs={12}>
          <Button onClick={() => history.push('/admin')}>Go Back</Button> |
          <Button onClick={() => history.push('/admin/courses')}>
            Go To Manage Courses
          </Button>
        </Grid>

        <Grid item xs={12}>
          {error ? (
            <Message>{error}</Message>
          ) : loading ? (
            <Loader />
          ) : (
            <TableContainer>
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
                  {users.map((user, index) => (
                    <TableRow key={user._id}>
                      <TableCell align='center'>{index + 1}</TableCell>
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
    </>
  )
}

export default ManageUsersScreen

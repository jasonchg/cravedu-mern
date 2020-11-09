import React, { useState, useEffect, Children } from 'react'
import {
  Grid,
  Button,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { listUsers } from '../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

const ManageUsersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { users, loading, error } = userList

  let countMe = 1
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/')
    }
  }, [])

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
                  <TableCell>#ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{countMe++}</TableCell>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <CheckIcon style={{ color: 'green' }} />
                      ) : (
                        <CloseIcon style={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      {user.isInstructor ? (
                        <CheckIcon style={{ color: 'green' }} />
                      ) : (
                        <CloseIcon style={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button>View</Button>
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

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CraveduLogo from '../assets/images/logo.png'
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Link,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import BallotIcon from '@material-ui/icons/Ballot'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ListIcon from '@material-ui/icons/List'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const classes = useStyles()

  const [openMenuUser, setMenuOpenUser] = useState(null)
  const [openMenuAdmin, setMenuOpenAdmin] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutUser = () => {
    if (window.confirm('Logout?')) {
      dispatch(logout())
    }
    closeUserMenuHandler()
    closeAdminMenuHandler()
  }

  const openUserMenuHandler = (e) => {
    setMenuOpenUser(e.currentTarget)
  }
  const closeUserMenuHandler = () => {
    setMenuOpenUser(null)
  }

  const openAdminMenuHandler = (e) => {
    setMenuOpenAdmin(e.currentTarget)
  }
  const closeAdminMenuHandler = () => {
    setMenuOpenAdmin(null)
  }

  const goToMyAccount = () => {
    window.location.href = '/profile'
    closeUserMenuHandler()
  }

  const goToMyCourses = () => {
    window.location.href = '/mycourses'
    closeUserMenuHandler()
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Container maxWidth='md'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              <Link href='/'>
                <img src={CraveduLogo} alt='logo' style={{ width: 90 }} />
              </Link>
            </Typography>
            <Button
              color='inherit'
              startIcon={<ShoppingCartIcon />}
              onClick={() => (window.location.href = '/cart')}
            >
              Cart
            </Button>

            {userInfo ? (
              <>
                {userInfo.isInstructor && (
                  <Button color='inherit' startIcon={<BallotIcon />}>
                    Instructor
                  </Button>
                )}

                {userInfo.isAdmin && (
                  <>
                    <Button
                      color='inherit'
                      startIcon={<BallotIcon />}
                      onClick={openAdminMenuHandler}
                    >
                      Admin
                    </Button>
                    <Menu
                      id='admin-menu'
                      anchorEl={openMenuAdmin}
                      keepMounted
                      open={Boolean(openMenuAdmin)}
                      onClose={closeAdminMenuHandler}
                    >
                      <MenuItem onClick={closeAdminMenuHandler}>
                        <ListItemIcon>
                          <ListIcon fontSize='small' />
                        </ListItemIcon>
                        <Typography variant='inherit'>
                          Manage Courses
                        </Typography>
                      </MenuItem>

                      <MenuItem onClick={closeAdminMenuHandler}>
                        <ListItemIcon>
                          <AccountCircleIcon fontSize='small' />
                        </ListItemIcon>
                        <Typography variant='inherit'>Manage User</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )}

                <Button
                  color='inherit'
                  startIcon={<AccountCircleIcon />}
                  onClick={openUserMenuHandler}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id='menu'
                  anchorEl={openMenuUser}
                  keepMounted
                  open={Boolean(openMenuUser)}
                  onClose={closeUserMenuHandler}
                >
                  <MenuItem onClick={goToMyCourses}>
                    <ListItemIcon>
                      <ListIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='inherit'> My Courses</Typography>
                  </MenuItem>

                  <MenuItem onClick={goToMyAccount}>
                    <ListItemIcon>
                      <AccountBoxIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='inherit'> My Account</Typography>
                  </MenuItem>

                  <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='inherit'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color='inherit'
                startIcon={<AccountCircleIcon />}
                onClick={() => (window.location.href = '/login')}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header

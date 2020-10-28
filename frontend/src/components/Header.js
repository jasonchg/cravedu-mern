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
  Divider,
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

  const [openMenu, setMenuOpen] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutUser = () => {
    if (window.confirm('Logout?')) {
      dispatch(logout())
    }
    closeMenuHandler()
  }

  const openMenuHandler = (e) => {
    setMenuOpen(e.currentTarget)
  }
  const closeMenuHandler = () => {
    setMenuOpen(null)
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
                <Button
                  color='inherit'
                  startIcon={<AccountCircleIcon />}
                  onClick={openMenuHandler}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id='simple-menu'
                  anchorEl={openMenu}
                  keepMounted
                  open={Boolean(openMenu)}
                  onClose={closeMenuHandler}
                >
                  {userInfo.isInstructor && (
                    <MenuItem onClick={closeMenuHandler}>
                      <ListItemIcon>
                        <BallotIcon fontSize='small' />
                      </ListItemIcon>
                      <Typography variant='inherit'>Instructor</Typography>
                    </MenuItem>
                  )}

                  <MenuItem onClick={closeMenuHandler}>
                    <ListItemIcon>
                      <ListIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='inherit'> My Courses</Typography>
                  </MenuItem>

                  <MenuItem onClick={closeMenuHandler}>
                    <ListItemIcon>
                      <AccountBoxIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='inherit'> My Account</Typography>
                  </MenuItem>
                  <Divider />
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

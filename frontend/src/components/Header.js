import React, { useState } from 'react'
import { Route } from 'react-router-dom'
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
  Avatar,
  useTheme,
  useMediaQuery,
  makeStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
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
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import SearchBox from './SearchBox'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {},
  title: {
    flexGrow: 1,
  },
  excludeFromPrint: {
    '@media print': {
      display: 'none',
    },
  },
  cartHeading: {
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    top: 0,
    padding: 2,
    right: 0,
    background: 'orange',
    color: '#fff',
    fontSize: 9,
    width: 13,
    height: 13,
    borderRadius: '50%',
  },
}))

const Header = () => {
  const classes = useStyles()

  const [openMenuUser, setMenuOpenUser] = useState(null)
  const [openMenuAdmin, setMenuOpenAdmin] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const toggleDrawer = () => {
    setOpenDrawer(true)
  }

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

  const goToManageUsers = () => {
    window.location.href = '/admin/users'
    closeAdminMenuHandler()
  }

  const goToManageCourses = () => {
    window.location.href = '/admin'
    closeAdminMenuHandler()
  }

  const goInstructor = () => {
    window.location.href = '/instructor'
  }

  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={`${classes.root} ${classes.excludeFromPrint}`}>
      <AppBar position='static' className='header'>
        <Container>
          <Toolbar style={{ margin: 0, padding: 0 }}>
            <Link href='/'>
              <img
                src={CraveduLogo}
                alt='logo'
                style={{ width: 90, marginLeft: 0, paddingLeft: 0 }}
              />
            </Link>

            <Typography variant='h6' className={classes.title}></Typography>
            {matchesSM ? (
              <>
                <IconButton color='inherit' onClick={toggleDrawer}>
                  <MenuOpenIcon fontSize='large' />
                </IconButton>

                <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                  <List style={{ width: '300px' }}>
                    {userInfo ? (
                      <>
                        <ListItem
                          button
                          onClick={() => setMenuOpenUser(!openMenuUser)}
                        >
                          <ListItemIcon>
                            <Avatar>{userInfo.name.charAt(0)}</Avatar>
                          </ListItemIcon>
                          <ListItemText primary={userInfo.name} />
                          {openMenuUser ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                          in={openMenuUser}
                          timeout='auto'
                          unmountOnExit
                        >
                          <List component='div' disablePadding>
                            <ListItem button onClick={goToMyCourses}>
                              <ListItemIcon>
                                <ListIcon fontSize='small' />
                              </ListItemIcon>
                              <ListItemText primary=' My Learning' />
                            </ListItem>
                            <ListItem button onClick={goToMyAccount}>
                              <ListItemIcon>
                                <AccountBoxIcon fontSize='small' />
                              </ListItemIcon>
                              <ListItemText primary='My Account' />
                            </ListItem>
                            <ListItem button onClick={logoutUser}>
                              <ListItemIcon>
                                <ExitToAppIcon fontSize='small' />
                              </ListItemIcon>
                              <ListItemText primary='Logout' />
                            </ListItem>
                          </List>
                        </Collapse>
                        <Divider />

                        {userInfo.isInstructor && (
                          <ListItem button onClick={goInstructor}>
                            <ListItemIcon>
                              <BallotIcon />
                            </ListItemIcon>

                            <ListItemText primary='Instructor' />
                          </ListItem>
                        )}

                        {userInfo.isAdmin && (
                          <>
                            <ListItem
                              button
                              onClick={() => setMenuOpenAdmin(!openMenuAdmin)}
                            >
                              <ListItemIcon>
                                <BallotIcon />
                              </ListItemIcon>
                              <ListItemText primary='Admin' />
                              {openMenuAdmin ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            <Collapse
                              in={openMenuAdmin}
                              timeout='auto'
                              unmountOnExit
                            >
                              <List component='div' disablePadding>
                                <ListItem button onClick={goToManageCourses}>
                                  <ListItemIcon>
                                    <ListIcon fontSize='small' />
                                  </ListItemIcon>
                                  <ListItemText primary='Manage Courses' />
                                </ListItem>

                                <ListItem button onClick={goToManageUsers}>
                                  <ListItemIcon>
                                    <AccountCircleIcon fontSize='small' />
                                  </ListItemIcon>
                                  <ListItemText primary='Manage User' />
                                </ListItem>
                              </List>
                            </Collapse>
                          </>
                        )}
                      </>
                    ) : (
                      <ListItem
                        button
                        onClick={() => (window.location.href = '/login')}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary='Login' />
                      </ListItem>
                    )}
                    <ListItem
                      button
                      onClick={() => (window.location.href = '/cart')}
                    >
                      <ListItemIcon>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary='Cart' />
                    </ListItem>

                    <ListItem>
                      <Route
                        render={({ history }) => (
                          <SearchBox
                            history={history}
                            closeDrawer={setOpenDrawer}
                            phone
                          />
                        )}
                      />
                    </ListItem>
                  </List>
                </Drawer>
              </>
            ) : (
              <>
                <div style={{ marginRight: 10, width: '75%' }}>
                  <Route
                    render={({ history }) => <SearchBox history={history} />}
                  />
                </div>

                <Button
                  style={{ marginRight: 7 }}
                  color='inherit'
                  startIcon={
                    <div className={classes.cartHeading}>
                      <ShoppingCartIcon />
                      <span className={classes.cartCount}>
                        {cartItems ? cartItems.length : null}
                      </span>
                    </div>
                  }
                  onClick={() => (window.location.href = '/cart')}
                >
                  Cart
                </Button>

                {userInfo ? (
                  <>
                    {userInfo.isInstructor && (
                      <Button
                        style={{ marginRight: 7 }}
                        color='inherit'
                        startIcon={<BallotIcon />}
                        onClick={goInstructor}
                      >
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
                          <MenuItem onClick={goToManageCourses}>
                            <ListItemIcon>
                              <ListIcon fontSize='small' />
                            </ListItemIcon>
                            <Typography variant='inherit'>
                              Manage Courses
                            </Typography>
                          </MenuItem>

                          <MenuItem onClick={goToManageUsers}>
                            <ListItemIcon>
                              <AccountCircleIcon fontSize='small' />
                            </ListItemIcon>
                            <Typography variant='inherit'>
                              Manage User
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </>
                    )}

                    <Button
                      color='inherit'
                      onClick={openUserMenuHandler}
                      size='small'
                    >
                      <Avatar style={{ background: 'rgba(255,255,255, 0.5)' }}>
                        {userInfo.name.charAt(0)}
                      </Avatar>
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
                        <Typography variant='inherit'> My Learning</Typography>
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
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header

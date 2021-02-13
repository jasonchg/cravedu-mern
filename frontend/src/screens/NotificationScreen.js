import React, { useEffect, useState } from 'react'
import {
  Grid,
  Container,
  makeStyles,
  Tabs,
  Tab,
  Box,
  Paper,
  ListItemText,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
} from '@material-ui/core'
import Breadcrumbs from '../components/Breadcrumbs'
import Loader from '../components/Loader'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import { getUserNotification } from '../actions/userActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    background: '#f1faee',
    margin: 10,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`course-${index}`}
      aria-labelledby={`course-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `course-tab-${index}`,
    'aria-controls': `course-tabpanel-${index}`,
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const NotificationScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userNotifications = useSelector((state) => state.userNotifications)
  const { notifications, loading, error } = userNotifications

  const tabHandler = (event, newValue) => {
    setValue(newValue)
  }
  const [value, setValue] = useState(0)
  const classes = useStyles()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getUserNotification())
    }
  }, [history])

  const notificationBlock = ({ notification }) => {
    const checkingNotification = (noti) => {
      switch (noti.title) {
        case 'NEW_QANDA_ANSWER':
          return {
            title: <h3>New Qanda Anwser</h3>,
            message: noti.message,
            from: noti.from,
            grant: true,
          }
        case 'NEW_QANDA_QUESTION':
          return {
            title: <h3>New Qanda Question</h3>,
            message: noti.message,
            from: noti.from,
            grant: false,
          }

        case 'NEW_REVIEW':
          return {
            title: <h3>New Review</h3>,
            message: noti.message,
            from: noti.from,
            grant: false,
          }
        case 'NEW_ANNOUNCEMENT':
          return {
            title: <h3>New Announcement</h3>,
            message: noti.message,
            from: noti.from,
            grant: false,
          }

        default:
          return ''
      }
    }

    const { title, message, from, grant } = checkingNotification(notification)

    return (
      <div key={notification._id}>
        <ListItem>
          <ListItemText
            primary={title}
            secondary={
              <>
                <h3>{from}</h3>
                <p>{message}</p>
                <p>{notification.createdAt.substring(0, 10)}</p>
                {grant ? (
                  <>
                    <button>Grant This Answer</button> |{' '}
                  </>
                ) : (
                  ''
                )}{' '}
                {notification.read ? '' : <button>Mark as read</button>}{' '}
                <button>Delete</button>
              </>
            }
          />
        </ListItem>
        <Divider />
      </div>
    )
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <div className={classes.root}>
      <Breadcrumbs
        previousPage={[
          {
            name: 'Home',
            link: '/',
          },
        ]}
        currentPage='Notifications'
      />
      <Container>
        <Grid container>
          <Grid item md={3}>
            <Paper className={classes.paper}>
              <Tabs
                onChange={tabHandler}
                aria-label='course tabs'
                orientation='vertical'
                variant='scrollable'
                value={value}
                className={classes.tabs}
              >
                <Tab label='All Notifications' {...a11yProps(0)} />
                <Tab label='Read' {...a11yProps(1)} />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Paper className={classes.paper}>
              <TabPanel value={value} index={0}>
                <List>
                  {notifications ? (
                    notifications.map((noti) => {
                      return noti.notification.read
                        ? ''
                        : notificationBlock(noti)
                    })
                  ) : (
                    <Message severity='info'>No notification</Message>
                  )}
                </List>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <List>
                  {notifications ? (
                    notifications.map((noti) => {
                      return noti.notification.read
                        ? notificationBlock(noti)
                        : ''
                    })
                  ) : (
                    <Message severity='info'>No notification</Message>
                  )}
                </List>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default NotificationScreen

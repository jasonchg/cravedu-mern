import React, { useEffect, useState } from 'react'
import {
  Grid,
  Container,
  makeStyles,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@material-ui/core'
import Breadcrumbs from '../components/Breadcrumbs'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'

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

  const tabHandler = (event, newValue) => {
    setValue(newValue)
  }
  const [value, setValue] = useState(0)
  const classes = useStyles()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history])

  return (
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
                <Tab label='Student' {...a11yProps(0)} />
                {userInfo.isInstructor && (
                  <Tab label='Instructor' {...a11yProps(1)} />
                )}

                {userInfo.isAdmin && <Tab label='Admin' {...a11yProps(3)} />}
              </Tabs>
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Paper className={classes.paper}>
              <TabPanel value={value} index={0}>
                <div>Students - new contents, new reply</div>
              </TabPanel>

              {userInfo.isInstructor && (
                <TabPanel value={value} index={1}>
                  <div>
                    Instructor - get new answers and admin approve course
                  </div>
                </TabPanel>
              )}

              {userInfo.isAdmin && (
                <TabPanel value={value} index={2}>
                  <div>Admin - new courses publish request </div>
                </TabPanel>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default NotificationScreen

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CraveduLogo from '../assets/images/logo.png'
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Link,
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

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
  const goToCart = () => {}
  const classes = useStyles()

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
            <Button color='inherit' onClick={goToCart}>
              <ShoppingCartIcon />
              Cart
            </Button>
            <Button color='inherit'>
              <AccountCircleIcon />
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header

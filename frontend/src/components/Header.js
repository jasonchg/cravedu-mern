import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Cravedu
            </Typography>
            <Button color="inherit">
              <ShoppingCartIcon />
              Cart
            </Button>
            <Button color="inherit">
              <AccountCircleIcon />
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;

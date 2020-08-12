import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getIsSignedIn, getUsername } from "../../reducks/users/selectors";
import HeaderMenus from "../molecules/HeaderMenus";
import ClosableDrawer from "./ClosableDrawer";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {},
  toolBar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const username = getUsername(selector);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.menuBar}
        color="white"
      >
        <Toolbar className={classes.toolBar}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => dispatch(push("/"))}
          >
            BudgeTicket
          </Typography>

          {isSignedIn && (
            <>
              <div className={classes.iconButtons}>
                <Typography
                  variant="span"
                  onClick={() => dispatch(push("/user/profile"))}
                >
                  Hi, {username}
                </Typography>
              </div>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </>
          )}


          {!isSignedIn &&
            <IconButton onClick={() => dispatch(push("/signin"))}>
              <AccountCircleIcon />
            </IconButton>
          }

        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;

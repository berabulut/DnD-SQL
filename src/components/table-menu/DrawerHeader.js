import React from "react";
import { TableStates } from "../TableStates";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Divider } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuTitle: {
    flex: 1,
  },
}));

const DrawerHeader = (props) => {
  const classes = useStyles();
  const handleDrawerClose = (s) => {
    // closes table onClick right menu
    s.isRightMenuOpen = false;
  };

  return (
    <div className={classes.drawerHeader}>
      <Typography variant="h5" noWrap className={classes.menuTitle}>
        Edit Table
      </Typography>
      <IconButton
        onClick={() => {
          TableStates.update(handleDrawerClose);
        }}
      >
        <Cancel />
      </IconButton>
	  <Divider />
    </div>
  );
};

export default DrawerHeader;

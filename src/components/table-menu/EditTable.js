import React, { useEffect, useState } from "react";
import { useStoreState } from "pullstate";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { TableStates } from "../TableStates";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: "auto",
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuTitle: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    height: "100%",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const EditTable = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const ReadTableStates = useStoreState(TableStates);
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [selectedTableId, setSelectedTableId] = useState('')

  useEffect(() => {
    setMenuOpen(ReadTableStates.isRightMenuOpen);
    setSelectedTableId(ReadTableStates.selectedTableId)
  }, [ReadTableStates.isRightMenuOpen, ReadTableStates.selectedTableId])

  const handleDrawerClose = (s) => {
    s.isRightMenuOpen = false;
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={isMenuOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h5" noWrap className={classes.menuTitle}>
            Edit Table
          </Typography>
        <IconButton onClick={() => {
          TableStates.update(handleDrawerClose)
        }}>
          <CancelIcon />
        </IconButton>
      </div>
      <Divider />
      <p>{selectedTableId}</p>
      <List></List>
    </Drawer>
  );
};

export default EditTable;

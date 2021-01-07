import React, { useRef, useState } from "react";
import { useStoreState } from "pullstate";
import { TableStates } from "./components/TableStates";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemText, ListItemIcon} from "@material-ui/core";
import {Menu, ChevronLeft, ChevronRight, Inbox, Mail, Add} from "@material-ui/icons";
import { Diagram } from "./components/WidgetConfig";
import { BodyWidget } from "./components/BodyWidget";
import TableDrawer from "./components/table-menu/TableDrawer";
import "./App.css";
import "./index.css";

let app = new Diagram();

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  appBar: {
    backgroundColor: "rgb(230, 156, 28)",
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
  pageTitle: {
    flex: 1,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
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

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const bodyWidgetRef = useRef();
  const ReadTableStates = useStoreState(TableStates);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.pageTitle}>
            SQL-Table-Creator
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => bodyWidgetRef.current.createNewTable()}
            className={classes.newTable}
          >
            <Add />
            <Typography variant="h6" noWrap>
              New Table
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeft />
            ) : (
              <ChevronRight />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["New Table", "Starred"].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => bodyWidgetRef.current.createNewTable()}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <TableDrawer app={app} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <BodyWidget app={app} ref={bodyWidgetRef} />
      </main>
    </div>
  );
};

export default App;

// <BodyWidget app={app} />

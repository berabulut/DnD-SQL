import React from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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
  

const EditTable = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	return(
		<Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {["New Table", "Starred"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
	)
}

export default EditTable
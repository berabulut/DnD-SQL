import * as React from "react";
import { UIStore } from "../UIStore";
import { PortWidget } from "@projectstorm/react-diagrams";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TableNodeWidget = (props) => {
  const classes = useStyles();

  return (
    <List
      onClick={() =>
        UIStore.update((s) => {
          s.isRightMenuOpen = true;
        })}
      subheader={<ListSubheader>New Table</ListSubheader>}
      className={classes.root}
    >
      <ListItem divider>
        <ListItemText primary="Inbox" />
        <PortWidget engine={props.engine} port={props.node.getPort("out")}>
          <div className="circle-port out-port" />
        </PortWidget>
        <PortWidget engine={props.engine} port={props.node.getPort("in")}>
          <div className="circle-port in-port" />
        </PortWidget>
      </ListItem>
      <ListItem divider>
        <ListItemText primary="Drafts" />
        <PortWidget engine={props.engine} port={props.node.getPort("out")}>
          <div className="circle-port out-port" />
        </PortWidget>
        <PortWidget engine={props.engine} port={props.node.getPort("in")}>
          <div className="circle-port in-port" />
        </PortWidget>
      </ListItem>
    </List>
  );
};

/*componentDidMount() {
	document.getElementById(this.props.node.options.id).addEventListener('contextmenu', (event) => {
		event.preventDefault();
		this.showModal()
	})
}*/

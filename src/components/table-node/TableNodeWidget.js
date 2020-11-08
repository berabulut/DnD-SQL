import React, { useEffect, useState } from "react";
import { TableStates } from "../TableStates";
import { PortWidget } from "@projectstorm/react-diagrams";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: "180px",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
  },
  subHeader: {
    fontWeight: "600",
    fontSize: "18px",
  },
}));

export const TableNodeWidget = (props) => {
  const classes = useStyles();
  const [fields, setFields] = useState([
    {
      Name: "id",
      Type: "Integer",
      Nullable: false,
      Indexed: false,
      Unique: false,
    },
    {
      Name: "id",
      Type: "Integer",
      Nullable: false,
      Indexed: false,
      Unique: false,
    },
  ]);

  const openRightMenu = (s) => {
    s.isRightMenuOpen = true;
  };
  const selectTable = (s) => {
    s.selectedTableId = props.node.options.id;
  };

  useEffect(() => {
    document
      .getElementById(props.node.options.id)
      .addEventListener("dblclick", (event) => {
        TableStates.update(openRightMenu);
        TableStates.update(selectTable);
      });
    props.node.options.fields = fields;
  });

  return (
    <List
      subheader={
        <ListSubheader className={classes.subHeader}>
          {props.node.name}
        </ListSubheader>
      }
      className={classes.root}
      id={props.node.options.id}
    >
      <Divider />
      {fields.map((value, key) => {
        const fieldsCount = fields.length;
        return (
          <ListItem key={key} divider={key + 1 !== fieldsCount}>
            <ListItemText secondary={value.Type} />
            <ListItemText primary={value.Name} />
            <PortWidget engine={props.engine} port={props.node.getPort("out")}>
              <div className="circle-port out-port" />
            </PortWidget>
            <PortWidget engine={props.engine} port={props.node.getPort("in")}>
              <div className="circle-port in-port" />
            </PortWidget>
          </ListItem>
        );
      })}
    </List>
  );
};

/*componentDidMount() {
	document.getElementById(this.props.node.options.id).addEventListener('contextmenu', (event) => {
		event.preventDefault();
		this.showModal()
	})
}*/

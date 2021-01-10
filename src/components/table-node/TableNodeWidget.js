import React, {useEffect, useReducer, useState} from "react";
import {TableStates} from "../TableStates";
import {PortWidget} from "@projectstorm/react-diagrams";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import {useStoreState} from "pullstate";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        minWidth: "180px",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
        boxShadow: "0px 0px 10px white",
    },
    subHeader: {
        fontWeight: "600",
        fontSize: "18px",
    },
}));

export const TableNodeWidget = (props) => {
    const classes = useStyles();
    const ReadTableStates = useStoreState(TableStates);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

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
    }, []);


    return (
        <List
            subheader={
                <ListSubheader className={classes.subHeader}>
                    {props.node.options.name}
                </ListSubheader>
            }
            className={classes.root}
            id={props.node.options.id}
        >
            <Divider/>
            {props.node.options.fields !== undefined && props.node.options.fields.map((value, key) => {
                const fieldsCount = props.node.fields.length;
                return (
                    <ListItem key={key} divider={key + 1 !== fieldsCount}>
                        <ListItemText secondary={value.Type}/>
                        <ListItemText primary={value.Name}/>
                        <PortWidget engine={props.engine} port={props.node.getPort("out")}>
                            <div className="circle-port out-port"/>
                        </PortWidget>
                        <PortWidget engine={props.engine} port={props.node.getPort("in")}>
                            <div className="circle-port in-port"/>
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

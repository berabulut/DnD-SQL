import React, {useEffect, useReducer, useState} from "react";
import {useStoreState} from "pullstate";
import {makeStyles} from "@material-ui/core/styles";
import {TableStates} from "../TableStates";
import DrawerHeader from "./DrawerHeader";
import TableField from "./TableField";
import TableName from "./TableName";
import {
    Drawer,
    Collapse,
    Divider,
    Typography,
    IconButton,
} from "@material-ui/core";
import {ExpandMore, Add, AddCircleTwoTone} from "@material-ui/icons";

const drawerWidth = 340;
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
        flex: 1,
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
    saveButton: {
        width: "65%",
        margin: "auto",
        marginTop: "5%",
        marginBottom: "2.5%",
    },
    collapseButton: {
        borderRadius: "0%",
    },
    collapseTitle: {
        fontWeight: "600",
        fontSize: "18px",
    }
}));

const TableDrawer = (props) => {
    const classes = useStyles();
    const ReadTableStates = useStoreState(TableStates);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState("");
    const [selectedTable, setSelectedTable] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [fieldExpandedList, setFieldExpandedList] = useState([])
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        setMenuOpen(ReadTableStates.isRightMenuOpen);
        setSelectedTableId(ReadTableStates.selectedTableId);
        setSelectedTable(
            props.app
                .getDiagramEngine()
                .getModel()
                .getNode(ReadTableStates.selectedTableId)
        );
    }, [ReadTableStates.isRightMenuOpen, ReadTableStates.selectedTableId]);

    const updateCanvas = (s) => {
        s.updateCanvas = !s.updateCanvas;
    };

    const addNewField = () => { // Adding new field to table
        selectedTable.addNewField();
        TableStates.update(updateCanvas)
        updateExpandedList();
    }

    const updateExpandedList = () => { // updating selected table's fields on UI
        if (selectedTable !== null && selectedTable !== undefined) {
            selectedTable.options.fields.map((value) => {
                setFieldExpandedList((oldArray) => [
                    ...oldArray,
                    {
                        fieldName: value.Name,
                        expanded: false,
                    },
                ]);
            });
        }
    }

    const handleExpandClick = () => { // showing all fields
        updateExpandedList();
        setExpanded(!expanded);
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
            <DrawerHeader/>
            <p>{selectedTableId}</p>
            <Divider/>
            <TableName app={props.app} selectedTableId={selectedTableId}/>
            <IconButton
                className={classes.collapseButton}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <Typography className={classes.collapseTitle}>Fields</Typography>
                <ExpandMore/>
            </IconButton>
            {isMenuOpen === true && selectedTable !== undefined && (
                <>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {selectedTable.options.fields.map((value, key) => {
                            return (
                                <>
                                    <TableField fieldExpandedList={fieldExpandedList} table={value} tableKey={key}/>
                                    <Divider/>
                                </>

                            );
                        })}
                    </Collapse>
                    <IconButton
                        className={classes.collapseButton}
                        aria-label="new field"
                        onClick={() => addNewField()}
                    >
                        <Typography className={classes.collapseTitle}>New Field &nbsp;</Typography>
                        <AddCircleTwoTone/>
                    </IconButton>
                </>
            )}
        </Drawer>
    );
};

export default TableDrawer;

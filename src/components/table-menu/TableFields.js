import React, {useRef, useState, useReducer, useEffect} from "react";
import {TableStates} from "../TableStates";
import {makeStyles} from "@material-ui/core/styles";
import {
    Drawer,
    Button,
    InputLabel,
    MenuItem,
    ListSubheader,
    FormControl,
    Select,
    TextField,
    Collapse,
    Divider,
    Typography,
    IconButton,
} from "@material-ui/core";
import {Save, ExpandMore} from "@material-ui/icons";
import {numeric, date, character, binary, miscellaneous} from "./dataTypes";

const nameStyles = makeStyles((theme) => ({
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
    tableInputs: {
        width: "65%",
        margin: "auto",
        marginTop: "5%",
        marginBottom: "2.5%",
    },
    textFieldContainer: {
        width: "100%",
        textAlign: "center",
    },
    TableNameContainer: {
        textAlign: "center",
    },
    saveButton: {
        width: "45%",
        margin: "auto",
        marginTop: "2.5%",
        marginBottom: "5%",
        backgroundColor: "rgb(24 66 105)",
        color: "white",
        "&:hover": {
            backgroundColor: "rgb(24 66 105 / 85%)",
        },
    },
}));

const fieldStyles = makeStyles((theme) => ({
    collapse: {
        textAlign: "center"
    },
    fieldInput: {
        flex: "0 0 45%",
        marginLeft: "5%",
    },
    fieldWrapper: {
        display: "flex",
        textAlign: "center",
    },
    fieldName: {
        flex: 1,
        textAlign: "center",
        paddingTop: "10px",
    },
    selectType: {
        flex: "0 0 45%",
        marginLeft: "5%",
    },
    fieldsCollapseButton: {
        width: "100%",
        borderRadius: "0%",
    },
    fieldExpandText: {
        flex: 1,
        textAlign: "start"
    },
    saveButton: {
        margin: "auto",
        marginTop: "2.5%",
        marginBottom: "5%",
        backgroundColor: "rgb(24 66 105)",
        color: "white",
        "&:hover": {
            backgroundColor: "rgb(24 66 105 / 85%)",
        },
    },
}))

export const TableName = (props) => {
    const classes = nameStyles();
    const nameInputRef = useRef();
    const changeTableName = () => {
        props.app
            .getDiagramEngine()
            .getModel()
            .getNode(props.selectedTableId).name = nameInputRef.current.value;
        props.app.diagramEngine.repaintCanvas();
    };

    return (
        <div className={classes.TableNameContainer}>
            <div className={classes.textFieldContainer}>
                <TextField
                    className={classes.tableInputs}
                    id="table-name"
                    label="Table Name"
                    variant="outlined"
                    inputRef={nameInputRef}
                />
            </div>
            <Button
                variant="contained"
                size="large"
                className={classes.saveButton}
                startIcon={<Save/>}
                onClick={changeTableName}
            >
                Save
            </Button>
            <Divider/>
        </div>
    );
};

export const TableFields = (props) => {
    const classes = fieldStyles();
    const nameInputRef = useRef();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const expandField = (key) => { // expanding selected field
        props.fieldExpandedList[key].expanded = !props.fieldExpandedList[key].expanded;
        forceUpdate(); // bcz not using setState function here
    };


    return (
        <div className={classes.fieldsWrapper}>
            <IconButton
                className={classes.fieldsCollapseButton}
                onClick={() => {
                    expandField(props.tableKey);
                }}
                aria-expanded={
                    props.fieldExpandedList[props.tableKey] !== undefined
                        ? props.fieldExpandedList[props.tableKey].expanded
                        : false
                }
                aria-label="show more"
            >
                <Typography className={classes.fieldExpandText}>
                    {props.table.Name}
                </Typography>
                <ExpandMore className={classes.fieldExpandIcon}/>
            </IconButton>
            <Collapse
                in={
                    props.fieldExpandedList[props.tableKey] !== undefined
                        ? props.fieldExpandedList[props.tableKey].expanded
                        : false
                }
                timeout="auto"
                unmountOnExit
                className={classes.collapse}
            >
                <div className={classes.fieldWrapper}>
                    <TextField
                        className={classes.fieldInput}
                        id="table-name"
                        label="Field Name"
                        inputRef={nameInputRef}
                    />
                    <p className={classes.fieldName} key={props.tableKey}>
                        {props.table.Name}
                    </p>
                </div>
                <div className={classes.fieldWrapper}>
                    <FormControl className={classes.selectType}>
                        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
                        <Select defaultValue="" id="grouped-select">
                            <ListSubheader>NUMERIC</ListSubheader>
                            {numeric.map((val, key) => {
                                return (
                                    <MenuItem key={key} value={val}>
                                        {val}
                                    </MenuItem>
                                );
                            })}
                            <ListSubheader>DATE</ListSubheader>
                            {date.map((val, key) => {
                                return (
                                    <MenuItem key={key} value={val}>
                                        {val}
                                    </MenuItem>
                                );
                            })}
                            <ListSubheader>CHARACTER</ListSubheader>
                            {character.map((val, key) => {
                                return (
                                    <MenuItem key={key} value={val}>
                                        {val}
                                    </MenuItem>
                                );
                            })}
                            <ListSubheader>BINARY</ListSubheader>
                            {binary.map((val, key) => {
                                return (
                                    <MenuItem key={key} value={val}>
                                        {val}
                                    </MenuItem>
                                );
                            })}
                            <ListSubheader>MISCELLANEOUS</ListSubheader>
                            {miscellaneous.map((val, key) => {
                                return (
                                    <MenuItem key={key} value={val}>
                                        {val}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <p className={classes.fieldName} key={props.tableKey}>
                        {props.table.Type}
                    </p>
                </div>
                <Button
                    variant="contained"
                    size="large"
                    className={classes.saveButton}
                    startIcon={<Save/>}
                >
                    Save
                </Button>
            </Collapse>
        </div>
    );
};

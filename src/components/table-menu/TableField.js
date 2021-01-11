import React, {useRef, useState, useReducer, useEffect} from "react";
import {TableStates} from "../TableStates";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    InputLabel,
    MenuItem,
    ListSubheader,
    FormControl,
    Select,
    TextField,
    Collapse,
    Typography,
    IconButton,
    Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {Save, ExpandMore} from "@material-ui/icons";
import {dataTypes} from "./dataTypes";


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
        textAlign: "start"
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

const TableField = (props) => {
    const classes = fieldStyles();
    const nameInputRef = useRef();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [errorMsg, setErrorMsg] = useState("");
    const [openError, setOpenError] = useState(false);
    const [fieldType, setFieldType] = useState("int");

    const expandField = (key) => { // expanding selected field
        props.fieldExpandedList[key].expanded = !props.fieldExpandedList[key].expanded;
        forceUpdate(); // bcz not using setState function here
    };

    const handleFieldTypeChange = (type) => {
        setFieldType(type)
    }
    const saveChanges = () => {
        if (nameInputRef.current.value.trim().length <= 0) {
            openErrorMessage("Field name cannot be empty!")
        } else {
            props.app
                .getDiagramEngine()
                .getModel()
                .getNode(props.tableId)
                .fields
                .map((val, key) => {
                    if (key === props.tableKey) {
                        val.Name = nameInputRef.current.value;
                        val.Type = fieldType;
                        TableStates.update((s) => {
                            s.updateCanvas = !s.updateCanvas;
                        })
                    }
                })
            closeErrorMessage();
        }
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const closeErrorMessage = () => {
        setOpenError(false);
    }

    const openErrorMessage = (message) => {
        setErrorMsg(message);
        setOpenError(true);
    }

    return (
        <div className={classes.fieldsWrapper}>
            <Snackbar open={openError} autoHideDuration={6000}>
                <Alert onClose={() => closeErrorMessage()} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
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
                        <Select
                            value={fieldType}
                            renderValue={() => fieldType}
                            defaultValue=""
                            id="grouped-select"
                        >
                            {dataTypes !== undefined && dataTypes.map((val, key) => {
                                return (
                                    <div key={key}>
                                        <ListSubheader key={key}>{val.name}</ListSubheader>
                                        {
                                            val.types.map((value, index) => {
                                                return (
                                                    <MenuItem onClick={() => handleFieldTypeChange(value)} key={index} value={value}>
                                                        {value}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </div>
                                )
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
                    onClick={() => saveChanges()}
                    startIcon={<Save/>}
                >
                    Save
                </Button>
            </Collapse>
        </div>
    );
};

export default TableField
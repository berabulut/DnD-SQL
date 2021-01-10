import React, {useRef} from "react";
import {Button, Divider, TextField} from "@material-ui/core";
import {Save} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

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

const TableName = (props) => {
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

export default TableName
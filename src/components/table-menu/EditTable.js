import React, { useEffect, useState, useRef, useReducer } from "react";
import clsx from "clsx";
import { useStoreState } from "pullstate";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { TableStates } from "../TableStates";
import { numeric, date, character, binary, miscellaneous } from "./dataTypes";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  tableInputs: {
    width: "65%",
    margin: "auto",
    marginTop: "5%",
    marginBottom: "2.5%",
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
  },
  fieldInput: {
    flex: "0 0 45%",
    marginLeft: "5%",
  },
  fieldWrapper: {
    display: "flex",
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
    width:"100%",
    borderRadius: "0%"
  },
  fieldExpandText: {
    flex: "0 0 10%"
  },
  fieldExpandIcon: {
    flex: 1,
    paddingLeft: "250px"
  },
  fieldsWrapper: {
    textAlign: "center"
  }
}));

const EditTable = (props) => {
  const classes = useStyles();
  const ReadTableStates = useStoreState(TableStates);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [fieldExpandedList, setFieldExpandedList] =useState([]) 
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const nameInputRef = useRef();

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

  const handleExpandClick = () => {
    if(selectedTable !== null && selectedTable !== undefined) {
      selectedTable.options.fields.map((value) => {
        setFieldExpandedList(oldArray => [...oldArray, {
          fieldName: value.Name,
          expanded: false
        }]);
      })
    }
    setExpanded(!expanded);
  };

  const expandField = (key) => {
    fieldExpandedList[key].expanded = !fieldExpandedList[key].expanded;
    forceUpdate()
  }

  const changeField = (key) => {

  }

  const handleDrawerClose = (s) => { // closes table onClick right menu
    s.isRightMenuOpen = false;
  };


  const changeTableName = () => {
    props.app.getDiagramEngine().getModel().getNode(selectedTableId).name =
      nameInputRef.current.value;
    props.app.diagramEngine.repaintCanvas();
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
        <IconButton
          onClick={() => {
            TableStates.update(handleDrawerClose);
          }}
        >
          <CancelIcon />
        </IconButton>
      </div>
      <Divider />
      <p>{selectedTableId}</p>
      <Divider />
      <TextField
        className={classes.tableInputs}
        id="table-name"
        label="Table Name"
        variant="outlined"
        inputRef={nameInputRef}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.saveButton}
        startIcon={<SaveIcon />}
        onClick={changeTableName}
      >
        Save
      </Button>
      <Divider />
      <IconButton
        className={classes.collapseButton}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <Typography className={classes.collapseTitle}>Fields</Typography>
        <ExpandMoreIcon />
      </IconButton>
      {isMenuOpen === true && selectedTable !== undefined && (
        <>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {selectedTable.options.fields.map((value, key) => {
              return (
                <div className={classes.fieldsWrapper}>
                  <IconButton
                    className={classes.fieldsCollapseButton}
                    onClick={() => {expandField(key)}}
                    aria-expanded={fieldExpandedList[key] !== undefined ? fieldExpandedList[key].expanded : false}
                    aria-label="show more"
                  >
                    <Typography className={classes.fieldExpandText}>
                      {value.Name}
                    </Typography>
                    <ExpandMoreIcon className={classes.fieldExpandIcon} />
                  </IconButton>
                  <Collapse in={fieldExpandedList[key] !== undefined ? fieldExpandedList[key].expanded : false} timeout="auto" unmountOnExit >
                  <div className={classes.fieldWrapper}>
                    <TextField
                      className={classes.fieldInput}
                      id="table-name"
                      label="Field Name"
                      inputRef={nameInputRef}
                    />
                    <p className={classes.fieldName} key={key}>
                      {value.Name}
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
                    <p className={classes.fieldName} key={key}>
                      {value.Type}
                    </p>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.saveButton}
                    startIcon={<SaveIcon />}
                    onClick={changeTableName}
                  >
                    Save
                  </Button>
                  </Collapse>
                </div>
              );
            })}
          </Collapse>
          <Divider />
        </>
      )}
    </Drawer>
  );
};

export default EditTable;



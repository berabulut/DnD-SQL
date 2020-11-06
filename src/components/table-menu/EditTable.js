import React, { useEffect, useState, useRef } from "react";
import { useStoreState } from "pullstate";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { TableStates } from "../TableStates";
import Drawer from "@material-ui/core/Drawer";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from '@material-ui/icons/Save';

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
  }
}));

const EditTable = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const ReadTableStates = useStoreState(TableStates);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState("");
  const nameInputRef = useRef();

  useEffect(() => {
    setMenuOpen(ReadTableStates.isRightMenuOpen);
    setSelectedTableId(ReadTableStates.selectedTableId);
  }, [ReadTableStates.isRightMenuOpen, ReadTableStates.selectedTableId]);

  const handleDrawerClose = (s) => {
    s.isRightMenuOpen = false;
  };

  const changeTableName = () => {
    console.log(props.app.getDiagramEngine().getModel().getNode(selectedTableId))
    props.app.getDiagramEngine().getModel().getNode(selectedTableId).name= nameInputRef.current.value;
    props.app.diagramEngine.repaintCanvas();
  }

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
    </Drawer>
  );
};

export default EditTable;

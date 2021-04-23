import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';
import Drawer from '@material-ui/core/Drawer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TreeView from '@material-ui/lab/TreeView';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import RefreshIcon from '@material-ui/icons/Refresh';
import { TestBoard } from './TestBoard';
import useFetch from 'use-http';
import {DATA_TYPE} from '../utils/Constants';

export function Tests() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { get, post, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)
  const [items, setItems] = useState({});
  const [tree, setTree] = useState();
  const [open, setOpen] = React.useState(false);
  const [board, setBoard] = useState();

  useEffect(() => {
    console.log(response)
    if(error) {
      enqueueSnackbar('Error Happen! Code:'+ response.status +' Message: ' + error.message, { variant: 'error' });
    }
  },[error, response]);

  useEffect(() => {
    loadTreeData();
  },[]);

  async function loadTreeData() {
    const data = await get("/v1/tests");
    if(response.ok) {
      setTree(data);
    }
  }


  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => selectTreeNode(nodes)}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const selectTreeNode = (nodes) => {
    if (nodes.type !== DATA_TYPE.FOLDER && nodes.type !== DATA_TYPE.ROOT) {
      setBoard(nodes);
    }
  }

  const handleTreeReload = () => {
    loadTreeData();
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={clsx(classes.content, {
      [classes.appBarShift]: open,
    })}>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper, }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleTreeReload}>
            <RefreshIcon />
          </IconButton>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {tree && renderTree(tree)}
        </TreeView>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Paper className={classes.inline}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <h2>Tests</h2>
        </Paper>
        <div className={classes.plainPaper}>
          <TestBoard info={board} />
        </div>
      </main>
    </div>
  );
}

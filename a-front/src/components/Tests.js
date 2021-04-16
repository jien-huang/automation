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


export function Tests() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({ url: process.env.REACT_APP_HOST_URL + '/v1/tests', info: { method: 'get' } });
  const [items, setItems] = useState({});
  const [tree, setTree] = useState();
  const [open, setOpen] = React.useState(false);
  const [board, setBoard] = useState();

  useItems(request);

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => selectTreeNode(nodes)}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const selectTreeNode = (nodes) => {
    if (nodes.type !== 'folder') {
      //enqueueSnackbar('Select Item: ' + nodes.name + ' id: ' + nodes.id);
      setBoard(nodes);
    }

  }

  const handleTreeReload = () => {
    setRequest({ url: process.env.REACT_APP_HOST_URL + '/v1/tests', info: { method: 'get' } });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function useItems(request) {
    useEffect(() => {
      if (!request || !request.url || !request.info) {
        return;
      }
      setLoading(true);
      fetch(request.url, request.info).then(
        response => {
          const statusCode = response.status;
          var data = response.json();
          if (statusCode >= 400) {
            // replace this with global popup
            closeSnackbar('Error status: ' + statusCode + ' Message: ' + response.statusText, { variant: 'error' });
          }
          return Promise.all([statusCode, data]);
        }
      ).then(([statusCode, data]) => {
        if (request.url.endsWith('/tests') && request.info.method === 'get') {
          // this is get from tree
          handleTreeRequest(statusCode, data);
        }
        handleRequest(statusCode, data);
      }).catch((error) => {
        closeSnackbar('Error : ' + error, { variant: 'error' });
      }).finally(() => {
        setLoading(false);
      });
    }, [request]);
  }

  function handleRequest(statusCode, response) {
    if (statusCode < 400) {
      // console.log(response)
      if (response) {
        // it should always return the new structure: even just update one item.
        setItems(response);
      }
    }
  }

  function handleTreeRequest(statusCode, response) {
    if (statusCode < 400) {
      // console.log(response)
      if (response) {
        // it should always return the new structure: even just update one item.
        setTree(response);
      }
    }
  }

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
            onClick={handleDrawerOpen}
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

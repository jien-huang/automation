import React, { useState } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';
import Drawer from '@material-ui/core/Drawer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { TestBoard } from './TestBoard';
import useFetch from 'use-http';
import { DATA_TYPE } from '../utils/Constants';
import { InputAdornment } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import TestTree from './TestTree';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export function Tests() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [searchString, setSearchString] = useState('');
  const { get, post, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)
  const [items, setItems] = useState({});
  const [open, setOpen] = React.useState(false);
  const [board, setBoard] = useState();
  const callback = (data) => {
    setBoard(data)
  }

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleSearch(e) {
    setSearchString(e.target.value);
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
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <TestTree parentCallback={callback} />
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
          <div className={classes.conorInline} >
            <Grid container item xs={18} >
              {!board && <Chip variant="outlined" label="Tests" size="large" avatar={<Avatar>T</Avatar>} />}
              {board && <Chip variant="outlined" label={board.name} color="primary" size="large" avatar={<Avatar>{board.type}</Avatar>} />}
            </Grid>
            <Grid container item xs={6} >
              <TextField
                className={classes.searchBox} onChange={handleSearch} value={searchString}
                id="Filter"
                label="Filter"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </div>
        </Paper>
        <div className={classes.plainPaper}>
          {board &&
            <TestBoard info={board} />
          }

        </div>
      </main>
    </div>
  );
}

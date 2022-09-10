import React, { useState } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { TestBoard } from './TestBoard';
import { InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import TestTree from './TestTree';
import Typography from '@mui/material/Typography';


export function Tests() {
  const classes = useStyles();
  const [searchString, setSearchString] = useState('');
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
        <Paper elevation={3} className={classes.inline}>
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
            <Grid container item xs={12} >
              {!board &&
                <Typography variant="subtitle1" gutterBottom>
                  Tests
                </Typography>}

              {board &&
                <div className={classes.conorInline} >
                  <Typography variant="caption" className={classes.smallTag} display="block" gutterBottom>
                    { board.type }
                  </Typography>
                  <span>&nbsp;</span>
                  <Typography variant="subtitle1" gutterBottom>
                    {board.name}
                  </Typography>
                </div>}
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

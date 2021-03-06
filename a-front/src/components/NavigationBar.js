import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Routes from '../Routes';
import ListItemIcon from '@material-ui/core/ListItem';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  MenuList,
  Icon,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './Styles';

const NavigationBar = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => {
    setIsOpen(open);
  };

  const activeRoute = (routeName) => {
    return props.location.pathname === routeName ? true : false;
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Automation Test
              </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer open={isOpen} onClose={() => toggleDrawer(false)}>
        <div
          className={classes.fullList}
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)} >
          <div className={classes.toolbarIcon}>
            <IconButton >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuList>
            {Routes.map((prop, key) => {
              if (prop.icon && prop.sidebarName){
                return (
                  <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key} onClick={() => activeRoute(prop.path)}>
                      <ListItemIcon className={classes.menuButtonText} >
                        <Icon>{prop.icon}</Icon>
                        <Typography  variant="inherit" >{prop.sidebarName}</Typography>
                      </ListItemIcon >
                  </NavLink>
                );
              }
              return (<div key={key}></div>)
            })}
          </MenuList>
        </div>
      </Drawer>
    </div>
  );
};

export default withRouter(NavigationBar);

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppRoutes from '../AppRoutes';
import ListItemIcon from '@mui/material/ListItem';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  MenuList,
  Icon,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './Styles';

const NavigationBar = (props) => {
  const navigate = useNavigate();
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
            {AppRoutes.map((prop, key) => {
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

export default (NavigationBar);

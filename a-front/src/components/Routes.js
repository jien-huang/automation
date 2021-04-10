import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

const Home = () => {
  return (
      <div>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    <h1>Home</h1>
    </div>
  );
};

const Standings = () => {
  return (
    <h1>Standings</h1>
  );
};

const Teams = () => {
  return (
    <h1>Teams</h1>
  );
};

const Routes = [
  {
    path: '/',
    sidebarName: 'Home',
    icon: DashboardIcon,
    component: Home
  },
  {
    path: '/standings',
    sidebarName: 'Standings',
    icon: AssignmentIcon,
    component: Standings
  },
  {
    path: '/teams',
    sidebarName: 'Teams',
    icon: LayersIcon,
    component: Teams
  },
];

export default Routes;
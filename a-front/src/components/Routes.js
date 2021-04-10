import React from 'react';

const Home = () => {
  return (
      <div>
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
    sidebarName: 'Dashboard',
    icon: 'dashboard',
    component: Home
  },
  {
    path: '/tests',
    sidebarName: 'Tests',
    icon: 'view_list',
    component: Standings
  },
  {
    path: '/configuration',
    sidebarName: 'Configuration',
    icon: 'build',
    component: Teams
  },
];

export default Routes;
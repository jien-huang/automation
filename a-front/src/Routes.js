import React, {useContext, useEffect} from 'react';
import { SnackBarContext } from './SnackBarProvider'

const Results = () => {
  const { setSnack } = useContext(SnackBarContext);
  // setSnack({ message: 'hello', open: true})
  useEffect(()=> {
    setSnack({ message: 'hello', open: true})
  },[]);
  return (
      <div>
    <h1>Home</h1>
    </div>
  );
};

const Tests = () => {
  return (
    <h1>Standings</h1>
  );
};

const Configuration = () => {
  return (
    <h1>Teams</h1>
  );
};

const Routes = [
  {
    path: '/',
    sidebarName: 'Results',
    icon: 'dashboard',
    component: Results
  },
  {
    path: '/tests',
    sidebarName: 'Tests',
    icon: 'view_list',
    component: Tests
  },
  {
    path: '/configuration',
    sidebarName: 'Configuration',
    icon: 'build',
    component: Configuration
  },
];

export default Routes;
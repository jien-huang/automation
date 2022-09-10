import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { Copyright } from './components/Copyright';
import ScrollTop from './components/ScrollTop';
import Grid from '@mui/material/Grid';
import AppRoutes from './AppRoutes';
import { Configuration } from './components/Configuration';
import Results from './components/Results';
import OneResult from './components/OneResult';
import { Tests } from './components/Tests';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/handlers');
  worker.start();
}

function App() {

  return (
    <div>
      <NavigationBar />
      <Routes>
        {AppRoutes.map((route) => (
          <Route exact path={route.path} key={route.path} element={<route.component />} >
          {/* component={React.lazy(() => import(`./components/${route.component}`))} > */}
            {/* <Grid container item xs={12} spacing={1}> */}
              {/* <route.component /> */}
            {/* </Grid> */}
          </Route>
        ))}
        
      </Routes>
      <Copyright />
      <ScrollTop />
    </div>
  );
}

export default App;



import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from './Routes';
import NavigationBar from './components/NavigationBar';
import { Copyright } from './components/Copyright';
import ScrollTop from './components/ScrollTop';
import Grid from '@material-ui/core/Grid';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/handlers');
  worker.start();
}

function App() {

  return (
    <div>
      <NavigationBar />
      <Switch>
        {Routes.map((route) => (
          <Route exact path={route.path} key={route.path}>
            <Grid container item xs={12} spacing={1}>
              <route.component />
            </Grid>
          </Route>
        ))}
      </Switch>
      <Copyright />
      <ScrollTop />
    </div>
  );
}

export default App;



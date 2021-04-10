import './App.css';
import { setupWorker } from 'msw';
import { Switch, Route } from 'react-router-dom';
import Routes from './components/Routes';
import NavigationBar from './components/NavigationBar'
import { Copyright } from './components/Copyright';
import ScrollTop from './components/ScrollTop';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './components/Styles';

if (process.env.NODE_ENV === 'development') {
  const { handlers } = require('./mocks/handlers');
  const worker = setupWorker(...handlers);
  worker.start();
}

function App() {
  const classes = useStyles();
  return (
    <div>
      <NavigationBar />
      <Switch>
        {Routes.map((route) => (
          <Route exact path={route.path} key={route.path}>
            <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={1}>
                    <route.component />
                    </Grid>
            
            </Container>
          </Route>
        ))}
      </Switch>
      <Copyright />
      <ScrollTop />
    </div>
  );
}

export default App;



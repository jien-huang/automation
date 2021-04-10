import './App.css';
import { setupWorker } from 'msw';
import { Switch, Route } from 'react-router-dom';
import Routes from './components/Routes';
import NavigationBar from './components/NavigationBar'
import { Copyright } from './components/Copyright';
import ScrollTop from './components/ScrollTop';

if (process.env.NODE_ENV === 'development') {
  const { handlers } = require('./mocks/handlers');
  const worker = setupWorker(...handlers);
  worker.start();
}

function App() {
  return (
    <div>
      <NavigationBar />
      <Switch>
        {Routes.map((route) => (
          <Route exact path={route.path} key={route.path}>
            <route.component />
          </Route>
        ))}
      </Switch>
      <Copyright />
      <ScrollTop />
    </div>
  );
}

export default App;



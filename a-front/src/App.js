import logo from './logo.svg';
import './App.css';
import { setupWorker } from 'msw';

if (process.env.NODE_ENV === 'development') {
  const {handlers} = require('./mocks/handlers');
  const worker = setupWorker(...handlers);
  worker.start();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

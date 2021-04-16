import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider maxSnack={5}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>
  ,
  document.getElementById('root')
);


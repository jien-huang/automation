import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import {createTheme, responsiveFontSizes} from '@mui/material';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/styles';

var theme = createTheme();
theme = responsiveFontSizes(theme);
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme= {theme} >
    <SnackbarProvider maxSnack={5}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </ThemeProvider>  
  ,
);


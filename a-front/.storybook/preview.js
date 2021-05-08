
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import {worker} from '../src/mocks/handlers';

if (!global.process) {
  worker.start();
}
export const decorators = [
  (Story) => (
    
      <SnackbarProvider maxSnack={5}>
        <Story />
      </SnackbarProvider>
    
  ),
];

export const parameters = {
  actions: { 
    argTypesRegex: "^on.*" ,
    argTypesRegex: "^update.*",
    argTypesRegex: "^delete.*"
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
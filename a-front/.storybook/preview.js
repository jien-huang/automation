
import { SnackbarProvider } from 'notistack';
import {worker} from '../src/mocks/handlers';
import { Copyright } from '../src/components/Copyright';
import ScrollTop from '../src/components/ScrollTop';

if (!global.process) {
  worker.start();
}
export const decorators = [
  (Story) => (
    
      <SnackbarProvider maxSnack={5}>
        <Story />
        <Copyright />
        <ScrollTop />
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
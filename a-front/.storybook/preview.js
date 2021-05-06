
import { SnackbarProvider } from 'notistack';



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
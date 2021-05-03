
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
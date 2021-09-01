import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const theme = extendTheme({
  colors: {
    eucalyptus: {
      50: "#e5f7f3",
      100: "#cee0dc",
      200: "#b4cac4",
      300: "#97b4ac",
      400: "#7c9f95",
      500: "#62857b",
      600: "#4b6860",
      700: "#344a44",
      800: "#1c2d29",
      900: "#00120d",
    },
    auburn:{
      50: "#ffede8",
      100: "#ebcec8",
      200: "#d8b0a6",
      300: "#c89084",
      400: "#b87160",
      500: "#9e5846",
      600: "#7b4437",
      700: "#593027",
      800: "#361c16",
      900: "#190702",
    }
  },
  components: {
    Steps
  }
})


ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();


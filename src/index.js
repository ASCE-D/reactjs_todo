import { ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import React, { StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { createContext } from "react";

export const server = "http://localhost:3000/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // <StrictMode>
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
    <AppWrapper />
      
    </ChakraProvider>
    
    </>
  // </StrictMode>

);

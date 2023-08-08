import React, { useContext, useEffect } from 'react';
import Header from './components/Header.jsx';
import { HStack, Stack, VStack } from '@chakra-ui/react';
import Sidebar from './components/Sidebar.jsx';
import Home from './components/Home.jsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { Toaster } from "react-hot-toast";
import { Context, server } from './index.js';
import axios from 'axios';



const Homepage = () => (
  <Stack height="100vh" margin={'0'} overflow={'hidden'}>
    <HStack height="100%">
      <VStack w={'xs'} alignItems="flex-start">
        <Sidebar />
      </VStack>
      <VStack w={'full'} h="100%" alignItems="flex-start">
        <Home />
      </VStack>
    </HStack>
  </Stack>
);

function App() {

  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/user/current`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

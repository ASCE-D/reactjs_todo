import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Text,
} from '@chakra-ui/react';
import { Context, server } from '../index';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = () => {
  //eslint-disable-next-line
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
      `${server}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
    }
  }
  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <Center h="100vh">
      <Box
        w="400px"
        p="6"
        width="300px"
        border="1px solid"
        borderColor="teal.200"
        borderRadius="md"
        bg="white"
        boxShadow="md"
      >
        <Text
          w={'full'}
          textAlign={'center'}
          marginTop={'4'}
          marginBottom={'4'}
        >
          Login here to continue
        </Text>
        <FormControl>
          <Input
            
            value={email}
            m={'2'}
            placeholder="Email"
            type={'email'}
            onChange={e => setEmail(e.target.value)}
            required
            id="field-email"
          />
          <Input
            value={password}
            m={'2'}
            placeholder="Password"
            type={'password'}
            onChange={e => setPassword(e.target.value)}
            required
            id="field-password"
          />
          <Button m={'2'} type={'submit'} onClick={submitHandler}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Center>
  );
};

export default Login;

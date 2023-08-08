import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';

import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { Context ,server } from '../index';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //eslint-disable-next-line
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
  useContext(Context);

const submitHandler = async (e) => {
  setLoading(true);
  e.preventDefault();
  try {
    const { data } = await axios.post(
      `${server}/user/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(data.message);
    setIsAuthenticated(true);
    setLoading(false);
  } catch (error) {
    toast.error(error.response.data.message);
    setIsAuthenticated(false);
    setLoading(false);
  }
};

    

  if (isAuthenticated) return <Navigate to={'/'} />;
  return (
    <Center h="100vh">
      <Box
        w="400px"
        p="6"
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
          Register
        </Text>
        <FormControl>
          <Input
            value={name}
            m={'2'}
            placeholder="Name"
            type={'text'}
            onChange={e => setName(e.target.value)}
          />

          <Input
            value={email}
            m={'2'}
            placeholder="Email"
            type={'email'}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            value={password}
            m={'2'}
            placeholder="Password"
            type={'password'}
            onChange={e => setPassword(e.target.value)}
          />
          <Button m={'2'} type={'submit'} onClick={submitHandler}>
            Submit
          </Button>
        </FormControl>
        <Box display="flex" justifyContent="flex-end">
          <Link href="/login" fontSize="xs">
            Already registered?
          </Link>
        </Box>
      </Box>
    </Center>
  );
};

export default Register;

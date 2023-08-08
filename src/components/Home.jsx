import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { Navigate } from 'react-router-dom';
import { server } from '../index';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DeleteIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';


const Home = () => {
  const { colorMode } = useColorMode();
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id, isCompleted) => {
    try {
      const response = await axios.put(
        `${server}/tasks/${id}`,
        { isCompleted: !isCompleted }, // Toggle the isCompleted property
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async id => {
    try {
      const response = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });

      toast.success(response.data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${server}/tasks/new`,
        {
          task,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setTask('');

      toast.success('Task added');
      setLoading(false);
      setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks`, {
        withCredentials: true,
      })
      .then(res => {
        setTasks(res.data.task);
      })
      .catch(e => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={'/login'} />;
  return (
    <VStack w="full" marginTop="16" padding="4" paddingTop="16">
      <HStack w="full">
        <InputGroup w="full">
          <Input
            placeholder="Add task"
            size="lg"
            variant="outline"
            borderRadius="md"
            px="4"
            
            autoFocus={''}
            onChange={e => {
              setTask(e.target.value);
            }}
            colorScheme={colorMode === 'dark' ? 'gray' : 'teal'} // Adjust the colorScheme based on the theme
            bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'} // Adjust the background color based on the theme
            borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'} // Adjust the border color based on the theme
          />

          <InputRightElement width="8" h="full">
            <Button
              type="submit"
              size="lg"
              colorScheme="teal"
              borderRadius="md"
              px="6"
              h="full"
              _hover={{ bgColor: 'teal.600' }}
              onClick={submitHandler}
            >
              +
            </Button>
          </InputRightElement>
        </InputGroup>
      </HStack>
      <UnorderedList w="full" textAlign="left" listStyleType="none" spacing={4}>
        {tasks.map(task => (
          <ListItem
            marginTop={'8'}
            key={task._id}
            fontWeight="bold"
            fontSize="lg"
            display="flex"
            alignItems="center"
            textDecoration={task.isCompleted ? 'line-through' : 'none'}
          >
            <Button
              size="sm"
              colorScheme="teal"
              borderRadius="full"
              _hover={{ bgColor: 'teal.600' }}
              marginRight="4"
              fontSize="lg"
              onClick={() => updateHandler(task._id, task.isCompleted)}
            >
              •
            </Button>
            {task.task}
            <DeleteIcon
              w={6}
              h={6}
              marginLeft="auto"
              color="gray.500"
              onClick={() => deleteHandler(task._id)}
              _hover={{ color: 'red.500' }}
              cursor="pointer"
            />
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default Home;

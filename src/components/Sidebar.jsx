
import { Button, Stack, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from 'react';
import { server, Context } from '..';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const Sidebar = () => {

  const { isAuthenticated ,setIsAuthenticated } = useContext(Context)

  const logoutHandler = async () => {
   
    try {
      
      const response = await axios.get(`${server}/user/logout`,
      {
        withCredentials: true,
      });
      setIsAuthenticated(false)
      toast(response.data.message)
      
    } catch (error) {
      console.log(error)
      setIsAuthenticated(true)
    }
  };

  return (
    <Stack
      w="200px"
      h="100vh"
      bgGradient="linear(to-b, teal.500, teal.300)"
      rounded="md"
      boxShadow="md"
      spacing="4"
      py="32"
      px="4"
      marginTop={'4'}
    >
      <VStack spacing="4" alignItems="flex-start">
        <Button
          variant="ghost"
          _hover={{ bgColor: 'teal.400', color: 'white' }}
        >
          Today
        </Button>
        <Button
          variant="ghost"
          _hover={{ bgColor: 'teal.400', color: 'white' }}
        >
          Yesterday
        </Button>
        <Button
          variant="ghost"
          _hover={{ bgColor: 'teal.400', color: 'white' }}
        >
          Old
        </Button>
      </VStack>

      <VStack spacing="4" alignItems="flex-start">
        <Button
          variant="ghost"
          _hover={{ bgColor: 'teal.400', color: 'white' }}
        >
          Important
        </Button>
        <Button
          variant="ghost"
          _hover={{ bgColor: 'teal.400', color: 'white' }}
        >
          Work
        </Button>
        <Button
          variant="ghost"
          _hover={{ bgColor: 'teal.400', color: 'white' }}
        >
          Personal
        </Button>


      </VStack>
      <VStack justifyContent={'flex-end'} h={'100%'} >
      {isAuthenticated ? (
          <Button  onClick={logoutHandler} >
            Logout
          </Button>
        ) : (
          <Navigate to={"/login"}>Login</Navigate>
        )}
    
      </VStack>

      
    </Stack>
  );
};

export default Sidebar;
























// import { Button, Stack, VStack } from '@chakra-ui/react';
// import React from 'react';

// const Sidebar = () => {
//   return (
//     <Stack
//       w={'full'}
//       p={'6'}
//       h={'100%'}
//       borderRight={'2px solid'}
//       marginTop={'32'}
//       justifyContent={'center'}
//     >
//       {' '}
//       {/* Here */}
//       <VStack h={'100vh'} padding={'16'} alignItems={'flex-start'}>
//         <Button variant={'ghost'}>Today</Button>

//         <Button variant={'ghost'}>Yesterday</Button>
//         <Button variant={'ghost'}>Old</Button>
//         <Button justifyContent={'flex-end'}>Sign Out</Button>
//       </VStack>
//     </Stack>
//   );
// };

// export default Sidebar;

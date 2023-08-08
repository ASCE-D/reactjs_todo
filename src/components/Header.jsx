
import React from 'react';
import { Box, Flex, Heading,  Spacer } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';



const Header = () => {

  return (
    <Box
      bg="teal.500"
      color="white"
      py="3"
      px="4"
      shadow="md"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Flex align="center">
      
        <Heading as="h1" size="2xl" letterSpacing="tight" marginStart={'6'}>
          TODO
        </Heading>
        <Spacer />
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
};

export default Header;






















// import { HStack, Heading, Stack } from '@chakra-ui/react';
// import React from 'react';
// import { ColorModeSwitcher } from '../ColorModeSwitcher';

// const Header = () => {
//   return (
//     <>
  
//         <Heading
          
//           zIndex={'overlay'}
//           w={'full'}
//           position={'fixed'}
//           size={'xl'}
//           fontWeight={'bold'}
//           p={'6'}
         
//           fontFamily={'sans-serif'}
//           textAlign={'start'}
//         >
//           TODO
//         </Heading>

//         <ColorModeSwitcher />
//         </>
//   );
// };

// export default Header;

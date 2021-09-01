import { ReactNode } from 'react';
import React, { Component } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  ButtonGroup
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Stepper from './Stepper'
import { BiLogOut } from 'react-icons/bi';

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function NavMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('eucalyptus.300', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Text color="gray.50" fontSize="xl" >MobilitAzzjoni</Text>
            
          </HStack>
          <Box w="30%"><Stepper></Stepper></Box>       
          <Flex alignItems={'center'}>

          <ButtonGroup size="md" colorScheme="eucalyptus" isAttached>
            <Button variant="solid" mr="-px">En</Button>
            <Button variant="outline" mr="-px">Mt</Button>
          </ButtonGroup>

          </Flex>
        </Flex>
      </Box>
    </>
  );
}
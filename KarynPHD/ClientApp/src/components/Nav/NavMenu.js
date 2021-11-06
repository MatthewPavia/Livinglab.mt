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
import LanguageContext from '../../languages/LanguageContext';
import Cookies from 'universal-cookie';

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

function clearCookies(){
  const cookies = new Cookies();
  cookies.remove("username")
  cookies.remove("likes")
  cookies.remove("completion")

  window.location.reload()
}

export default function NavMenu(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={'eucalyptus.300'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>
            <Text color="eucalyptus.300" fontSize="xl" >MobilitAzzjoni</Text>
          </HStack>

            <Box w="30%" display={{ base: 'none', md: 'flex' }}><Stepper currentCompletion={props.currentCompletion}></Stepper></Box>       
            <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>

              {/*
              <ButtonGroup size="md" colorScheme="eucalyptus" isAttached>
                <Button onClick={() => props.onLanguageChange("en")} variant={props.isEnglish() ? "solid" : "outline"} mr="-px">En</Button>
                <Button onClick={() => props.onLanguageChange("mt")} variant={!props.isEnglish() ? "solid" : "outline"} mr="-px">Mt</Button>
              </ButtonGroup>*/}

              {props.isCompleted ? 
              <Button onClick={() => clearCookies()} size="sm" colorScheme="eucalyptus" variant="outline">Leave Lab</Button> : <></>}

            </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={1}>
              <Stepper currentCompletion={props.currentCompletion}></Stepper>
            </Stack>
            {/*<ButtonGroup size="md" colorScheme="eucalyptus" isAttached>
              <Button onClick={() => props.onLanguageChange("en")} variant={props.isEnglish() ? "solid" : "outline"} mr="-px">En</Button>
              <Button onClick={() => props.onLanguageChange("mt")} variant={!props.isEnglish() ? "solid" : "outline"} mr="-px">Mt</Button>
            </ButtonGroup>*/}

            {props.isCompleted ? 
              <Button onClick={() => clearCookies()} size="sm" colorScheme="eucalyptus" variant="outline">Leave Lab</Button> : <></>}

          </Box>
        ) : null}

      </Box>
    </>
  );
}
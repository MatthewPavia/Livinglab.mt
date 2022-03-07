import React, { Component } from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import en from '../languages/en.json'
import mt from '../languages/mt.json'
import LanguageContext from '../languages/LanguageContext';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;
  static contextType = LanguageContext;

  constructor(props) {
    super(props);
    this.state = { };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(){
    this.props.history.push('/main')
  }

  isAuth(){
    const cookies = new Cookies();
    if(cookies.get('username') !== undefined){
      return true
    }
    else{
      return false
    }
  }

  render () {
    const language = this.context;

    return (

      this.isAuth() ? <Redirect to="/main"></Redirect> : 

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg='#b5cac8' position={'relative'} style={{zIndex:1}}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              
              <Image htmlHeight={250} htmlWidth={350} src='https://livinglabprod.blob.core.windows.net/images/Logo.png'/>
                   
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.600'}>
              {language.Home.Description}
            </Text>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.600'}>
              Click START below to contribute your feedback on how to improve the pedestrian experience!
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                onClick={this.handleLogin}
                rounded={'full'}
                bg={'auburn.400'}
                color={'white'}
                width='180px'
                _hover={{
                  bg: 'auburn.500',
                }}>
                {language.Home.JoinButton}
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} >
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://livinglabprod.blob.core.windows.net/images/home image.jpg'
            }
          />
        </Flex>
      </Stack>
    );
  }
}

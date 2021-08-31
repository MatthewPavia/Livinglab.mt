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

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(){
    this.props.history.push('/main')
  }

  render () {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg='eucalyptus.100' position={'relative'} style={{zIndex:1}}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '20%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'auburn.400',
                  zIndex: -1,
                }}>
                MobilitAzzjoni
              </Text>
              <br />{' '}         
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.600'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis maximus ante.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                onClick={this.handleLogin}
                rounded={'full'}
                bg={'auburn.400'}
                color={'white'}
                _hover={{
                  bg: 'auburn.500',
                }}>
                Join Living Lab
              </Button>
              <Button rounded={'full'}>How It Works</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} >
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://www.cityam.com/wp-content/uploads/2021/01/STR-VIEW-1-PROPOSED2-R13-1-960x697.jpg'
            }
          />
        </Flex>
      </Stack>
    );
  }
}

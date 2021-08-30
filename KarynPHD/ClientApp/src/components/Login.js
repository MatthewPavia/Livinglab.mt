import React, { Component } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack, HStack, VStack, 
    Link,
    Button,
    Heading,
    Select,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import ReCAPTCHA from "react-google-recaptcha";


export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      localities:["Baħar iċ-Ċagħaq","Baħrija","Balluta","Balzan","Birgu","Attard","Birkirkara","Birżebbuġa","Bormla","Buġibba","Burmarrad","Dingli","Fgura","Fleur De Lys","Floriana","Fontana, Gozo","Għajnsielem, Gozo","Għarb, Gozo","Għargħur","Għasri, Gozo","Għaxaq","Gudja","Gżira","Ħamrun","Iklin","Isla","Kalkara","Kerċem, Gozo","Kirkop","Lija","Luqa","Manikata","Marsa","Marsalforn, Gozo","Marsascala","Marsaxlokk","Mdina","Mellieħa","Mġarr","Mosta","Mqabba","Msida","Mtarfa","Munxar, Gozo","Nadur, Gozo","Naxxar","Paola","Pembroke","Pietà","Qala, Gozo","Qawra","Qormi","Qrendi","Rabat","Safi","San Ġiljan","San Ġwann","San Lawrenz, Gozo","San Pawl il-Baħar","Sannat, Gozo","Santa Luċija","Santa Venera","Siġġiewi","Sliema","Swatar","Swieqi","Ta' Xbiex","Tarxien","Valletta","Victoria, Gozo","Xagħra, Gozo","Xewkija, Gozo","Xgħajra","Xlendi, Gozo","Żabbar","Żebbuġ","Żebbuġ, Gozo","Żejtun","Żurrieq"]
    };
    this.onValid = this.onValid.bind(this);
  }

    onValid(){
      console.log("success!!!")
    }

    render () {
        return (
            <Flex
              minH={'100vh'}
              align={'center'}
              justify={'center'}
              bg='eucalyptus.100'
              >
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'}>Sign in as a new user</Heading>
                  
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={'white'}
                  boxShadow={'lg'}
                  p={8}>
                  <Stack spacing={4}>
                    <FormControl id="username" isRequired>
                      <FormLabel>Username</FormLabel>
                      <Input type="text" />
                    </FormControl>
                    <FormControl id="displayname" isRequired>
                      <FormLabel>Display Name</FormLabel>
                      <Input type="text" />
                    </FormControl>

                    <HStack spacing={6}>
                      <FormControl id="age" maxWidth="16" isRequired>
                        <FormLabel>Age</FormLabel>
                        <Input type="number" />
                      </FormControl>
                      <FormControl id="locality" isRequired>
                        <FormLabel>Locality</FormLabel>
                        <Select placeholder="Select locality">
                          {this.state.localities.map
                          (locality => <option key={locality}>{locality}</option>)
                          }                         
                        </Select>
                      </FormControl>
                    </HStack>

                    <ReCAPTCHA
                      sitekey="6LehxTMcAAAAABmfTY5dWG4wGaHrtR1ChpV4gz1M"
                      onChange={this.onValid}
                    />

                    <Stack spacing={10}>                    
                      <Button
                        bg={'auburn.400'}
                        color={'white'}
                        _hover={{
                          bg: 'auburn.500',
                        }}>
                        Sign in
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          );
    }
}
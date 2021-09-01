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
    useToast,
    NumberInput,
    NumberInputField,
  } from '@chakra-ui/react';
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from 'universal-cookie';
import { generate } from 'canihazusername'

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      localities:["Baħar iċ-Ċagħaq","Baħrija","Balluta","Balzan","Birgu","Attard","Birkirkara","Birżebbuġa","Bormla","Buġibba","Burmarrad","Dingli","Fgura","Fleur De Lys","Floriana","Fontana, Gozo","Għajnsielem, Gozo","Għarb, Gozo","Għargħur","Għasri, Gozo","Għaxaq","Gudja","Gżira","Ħamrun","Iklin","Isla","Kalkara","Kerċem, Gozo","Kirkop","Lija","Luqa","Manikata","Marsa","Marsalforn, Gozo","Marsascala","Marsaxlokk","Mdina","Mellieħa","Mġarr","Mosta","Mqabba","Msida","Mtarfa","Munxar, Gozo","Nadur, Gozo","Naxxar","Paola","Pembroke","Pietà","Qala, Gozo","Qawra","Qormi","Qrendi","Rabat","Safi","San Ġiljan","San Ġwann","San Lawrenz, Gozo","San Pawl il-Baħar","Sannat, Gozo","Santa Luċija","Santa Venera","Siġġiewi","Sliema","Swatar","Swieqi","Ta' Xbiex","Tarxien","Valletta","Victoria, Gozo","Xagħra, Gozo","Xewkija, Gozo","Xgħajra","Xlendi, Gozo","Żabbar","Żebbuġ","Żebbuġ, Gozo","Żejtun","Żurrieq"],
      captchaVerified: false,
      username:'',
      displayName:'',
      age: 0,
      locality:'',
      submitted:false,
      hideLogin:false
    };

    this.onValid = this.onValid.bind(this);
    this.ageInput = this.ageInput.bind(this);
    this.localityInput = this.localityInput.bind(this);
    this.submit = this.submit.bind(this);
    this.areAllInputsFilled = this.areAllInputsFilled.bind(this);
  }

  onValid(){
    this.setState({captchaVerified:true})
  }

  ageInput(event){
    this.setState({age:event.target.value})
  }

  localityInput(event){
    this.setState({locality:event.target.value})
  }

  areAllInputsFilled(userDetails){
    for (var detail in userDetails) {
      if (userDetails[detail] == null || userDetails[detail] == "" || userDetails[detail] == 0)
          return false;
    }
    return true;
  }

  setUserCookies(username){
    const cookies = new Cookies();

    const current = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(current.getFullYear() + 1);

    cookies.set('username', username, { path: '/', expires:nextYear });
  }

  submit(){
    this.setState({submitted:true})
    let username = generate()
    
    let userDetails = {
      "username" : username,
      "age":this.state.age,
      "locality":this.state.locality
    }

    if(this.areAllInputsFilled(userDetails) && this.state.captchaVerified){
      fetch('user', {
        method:'POST', 
        body:JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => this.setUserCookies(username))
      .then(() => this.setState({hideLogin:true}))
      .catch(error => console.log(error))
    }
    else{
      
    }
  }

  render () {
      return (
        <>
          {this.state.hideLogin ? <></> :
            <Flex
              minH={'100vh'}
              align={'center'}
              justify={'center'}       
              bg='rgba(228, 230, 235, 0.9)'
              >
              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                  <Heading fontSize={'4xl'}>Something about you</Heading>                
                </Stack>
                <Box
                  rounded={'lg'}
                  bg={'white'}
                  boxShadow={'lg'}
                  p={8}>
                  <Stack spacing={4}>

                    <HStack spacing={4}>
                      <FormControl id="age" maxWidth="20" isRequired isInvalid={this.state.age == '' && this.state.submitted == true}>
                        <FormLabel>Age</FormLabel>
                        <NumberInput min={16} max={120} onBlur={this.ageInput} clampValueOnBlur={true}><NumberInputField /></NumberInput>
                      </FormControl>
                      <FormControl id="locality" isRequired isInvalid={this.state.locality == '' && this.state.submitted == true}>
                        <FormLabel>Locality</FormLabel>
                        <Select placeholder="Select locality" onBlur={this.localityInput}>
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
                        isDisabled={!this.state.captchaVerified}
                        onClick={this.submit}
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
            }
          </>
        );
  }
}
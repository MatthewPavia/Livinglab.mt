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
    useToast
  } from '@chakra-ui/react';
import ReCAPTCHA from "react-google-recaptcha";


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
      submitted:false
    };

    this.onValid = this.onValid.bind(this);
    this.usernameInput = this.usernameInput.bind(this);
    this.displayNameInput = this.displayNameInput.bind(this);
    this.ageInput = this.ageInput.bind(this);
    this.localityInput = this.localityInput.bind(this);
    this.submit = this.submit.bind(this);
    this.areAllInputsFilled = this.areAllInputsFilled.bind(this);
  }

  onValid(){
    this.setState({captchaVerified:true})
  }

  usernameInput(event){
    this.setState({username:event.target.value})
  }

  displayNameInput(event){
    this.setState({displayName:event.target.value})
  }

  ageInput(event){
    let ageValue = event.target.value;
    if(ageValue < 120){
      this.setState({age:event.target.value})
    }
  }

  localityInput(event){
    this.setState({locality:event.target.value})
  }

  areAllInputsFilled(userDetails){
    for (var detail in userDetails) {
      if (userDetails[detail] !== null && userDetails[detail] != "" && userDetails[detail] != 0)
          return true;
    }
    return false;
  }

  submit(){
    this.setState({submitted:true})
    const toast = useToast()

    let userDetails = {
      "username" : this.state.username,
      "displayName" : this.state.displayName,
      "age":this.state.age,
      "locality":this.state.locality
    }

    if(this.areAllInputsFilled(userDetails) && this.state.captchaVerified){
      fetch('http://example.com/movies.json')  
    }
    else{
      return(
        () => this.toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      )
    }

    console.log(userDetails)
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
                  <FormControl id="username" isRequired isInvalid={this.state.username == '' && this.state.submitted == true}>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" onBlur={this.usernameInput} />
                  </FormControl>
                  <FormControl id="displayname" isRequired isInvalid={this.state.displayName == '' && this.state.submitted == true}>
                    <FormLabel>Display Name</FormLabel>
                    <Input type="text" onBlur={this.displayNameInput}/>
                  </FormControl>

                  <HStack spacing={6}>
                    <FormControl id="age" maxWidth="16" isRequired isInvalid={this.state.age == '' && this.state.submitted == true}>
                      <FormLabel>Age</FormLabel>
                      <Input type="number" onBlur={this.ageInput}/>
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
        );
  }
}
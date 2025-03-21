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
import {CustomToast} from './CustomToast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageContext from '../languages/LanguageContext';

export class Login extends Component {
  static contextType = LanguageContext;
  constructor(props) {
    super(props);
    this.state = { 
      localities:["Balzan","Birgu","Attard","Birkirkara","Birżebbuġa","Bormla","Dingli","Fgura","Floriana","Fontana, Gozo","Għajnsielem, Gozo","Għarb, Gozo","Għargħur","Għasri, Gozo","Għaxaq","Gudja","Gżira","Ħamrun","Iklin","Isla","Kalkara","Kerċem, Gozo","Kirkop","Lija","Luqa","Marsa","Marsalforn, Gozo","Marsascala","Marsaxlokk","Mdina","Mellieħa","Mġarr","Mosta","Mqabba","Msida","Mtarfa","Munxar, Gozo","Nadur, Gozo","Naxxar","Paola","Pembroke","Pietà","Qala, Gozo","Qormi","Qrendi","Rabat","Safi","San Ġiljan","San Ġwann","San Lawrenz, Gozo","San Pawl il-Baħar","Sannat, Gozo","Santa Luċija","Santa Venera","Siġġiewi","Sliema","Swieqi","Ta' Xbiex","Tarxien","Valletta","Victoria, Gozo","Xagħra, Gozo","Xewkija, Gozo","Xgħajra","Żabbar","Żebbuġ","Żebbuġ, Gozo","Żejtun","Żurrieq"],
      captchaVerified: false,
      username:'',
      displayName:'',
      age: 0,
      locality:'',
      gender:'',
      submitted:false,
      hideLogin:false,
      consented:false
    };

    this.CustomToastElement = React.createRef()

    this.onValid = this.onValid.bind(this);
    this.ageInput = this.ageInput.bind(this);
    this.localityInput = this.localityInput.bind(this);
    this.submit = this.submit.bind(this);
    this.areAllInputsFilled = this.areAllInputsFilled.bind(this);
    this.enableScrolling = this.enableScrolling.bind(this);
    this.disableScrolling = this.disableScrolling.bind(this);
    this.genderInput = this.genderInput.bind(this);
    this.setCheckBox = this.setCheckBox.bind(this);
    this.getCaptchaKey = this.getCaptchaKey.bind(this);
  }

  notify = () => toast.error('Sorry! You need to be over 18.', {
                                position: "bottom-center",
                                autoClose: false,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                });

  dismissAll = () =>  toast.dismiss();

  componentDidMount(){
    this.disableScrolling()
  }

  onValid(){
    this.setState({captchaVerified:true})
  }

  ageInput(event){

    if(event.target.value < 18){
      this.CustomToastElement.current.toastError("Sorry! You need to be over 18.")
    }

    this.setState({age:event.target.value})
  }

  localityInput(event){
    this.setState({locality:event.target.value})
  }

  genderInput(event){
    this.setState({gender:event.target.value})
  }

  setCheckBox(event){
    this.setState({consented:event})
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
      "gender":this.state.gender,
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
      .then(this.enableScrolling)
      .catch(error => console.log(error))
    }
    else{
      
    }
  }

  disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
  }

  enableScrolling(){
      window.onscroll=function(){};
  }

  getCaptchaKey(){
    console.log(window.location.hostname)
    if(window.location.hostname == "livinglab.mt" || window.location.hostname == "www.livinglab.mt"){
      return "6Le596YeAAAAADpY-ECSgp6d6Mz7RPJ3GwqyHELI"
    }
    else{
      return "6LehxTMcAAAAABmfTY5dWG4wGaHrtR1ChpV4gz1M"
    }  
  }

  render () {

    const language = this.context;

    return (  
      <>
      <CustomToast ref={this.CustomToastElement} />

        {this.state.hideLogin ? <></> :
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}       
            bg='rgba(196, 196, 196, 0.6)'         
            >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>{language.Login.Title}</Heading>                
              </Stack>
              <Box
                rounded={'lg'}
                bg={'white'}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>

                  <HStack spacing={2}>
                    <FormControl id="age" maxWidth="20" isRequired isInvalid={this.state.age == '' && this.state.submitted == true}>
                      <FormLabel>{language.Login.Age}</FormLabel>
                      <NumberInput max={120} onBlur={this.ageInput} clampValueOnBlur={true}><NumberInputField /></NumberInput>
                    </FormControl>
                    
                    <FormControl id="gender" maxWidth="80" isRequired isInvalid={this.state.gender == '' && this.state.submitted == true}>
                      <FormLabel>{language.Login.Gender.Title}</FormLabel>
                      <Select placeholder={language.Login.Gender.Placeholder} onBlur={this.genderInput}>
                        <option key={'M'}>{language.Login.Gender.Male}</option>
                        <option key={'F'}>{language.Login.Gender.Female}</option>
                        <option key={'Other'}>{language.Login.Gender.Other}</option>
                      </Select>
                    </FormControl>
                  </HStack>
                  <FormControl id="locality" isRequired isInvalid={this.state.locality == '' && this.state.submitted == true}>
                      <FormLabel>{language.Login.Locality.Title}</FormLabel>
                      <Select placeholder={language.Login.Locality.Placeholder} onBlur={this.localityInput}>
                        {this.state.localities.map
                        (locality => <option key={locality}>{locality}</option>)
                        }                         
                      </Select>
                    </FormControl>
                  <ReCAPTCHA
                    sitekey= {this.getCaptchaKey()}
                    onChange={this.onValid}
                  />

                  <Checkbox p={2} isRequired colorScheme='auburn' onChange={(e) => this.setCheckBox(e.target.checked)}>
                    <Flex>I consent to participate in this <br></br> University of Malta research <Text color='red'>&nbsp;*</Text></Flex>
                  </Checkbox>

                  <Stack spacing={10}>                    
                    <Button
                      isDisabled={(!this.state.captchaVerified || !this.state.consented)}
                      onClick={this.submit}
                      bg={'auburn.400'}
                      color={'white'}
                      _hover={{
                        bg: 'auburn.500',
                      }}>
                      Start
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
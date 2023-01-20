import { Icon, Stack, Center, Container, Box, Text, HStack, Heading, SimpleGrid, Badge, FormLabel, FormControl, Textarea, Divider, Tooltip, Button, Radio, RadioGroup, Slider,SliderTrack,SliderFilledTrack,SliderThumb,SliderMark, VStack, Flex, } from '@chakra-ui/react';
import React, { Component } from 'react';
import { GiWalk } from 'react-icons/gi'
import { IoMdCar } from 'react-icons/io'
import Cookies from 'universal-cookie';
import { ArrowForwardIcon } from '@chakra-ui/icons'

export class FourthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          radioValue:"",         
          sliderValue1:0,
          sliderValue2:0,
          sliderValue3:0,
          sliderValue4:0,
          sliderMoved1:false,
          sliderMoved2:false,
          sliderMoved3:false,
          sliderMoved4:false,
        };     

        this.submit = this.submit.bind(this)
        this.setRadioValue = this.setRadioValue.bind(this)   
        this.setSliderValue1 = this.setSliderValue1.bind(this)       
        this.setSliderValue2 = this.setSliderValue2.bind(this)  
        this.setSliderValue3 = this.setSliderValue3.bind(this)       
        this.setSliderValue4 = this.setSliderValue4.bind(this)
        this.allAnswered = this.allAnswered.bind(this)    
    }

    componentDidMount(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    submit(){
        const cookies = new Cookies();

        let reqBody = {"transportMode":this.state.radioValue.toString(),"daysCarForWork":this.state.sliderValue1.toString(),
                    "daysCarForActivities":this.state.sliderValue2.toString(),"daysWalkForWork":this.state.sliderValue3.toString(),
                    "daysWalkForActivities":this.state.sliderValue4.toString(), "PostedBy":cookies.get('username')}

        console.log(reqBody)

        fetch('pages/fourthpage',{
            method:'POST',
            body: JSON.stringify(reqBody),
            headers:{'Content-Type': 'application/json'} 
            })
        .then(res => {
            if(res.ok){
                this.props.completePage()
            }
            else{
                alert("An error has occurred. Please try again.")
            }
        })
    }

    setRadioValue(event){
        this.setState({radioValue:event})
    }

    setSliderValue1(event){
        if(!this.state.sliderMoved1){
            this.setState({sliderMoved1:true})
        }
        this.setState({sliderValue1:event})
    }

    setSliderValue2(event){
        if(!this.state.sliderMove2){
            this.setState({sliderMoved2:true})
        }
        this.setState({sliderValue2:event})
    }

    setSliderValue3(event){
        if(!this.state.sliderMoved3){
            this.setState({sliderMoved3:true})
        }
        this.setState({sliderValue3:event})
    }

    setSliderValue4(event){
        if(!this.state.sliderMoved4){
            this.setState({sliderMoved4:true})
        }
        this.setState({sliderValue4:event})
    }

    allAnswered(){
        if(this.state.radioValue !== "" && this.state.sliderMoved1 && this.state.sliderMoved2 && this.state.sliderMoved3 && this.state.sliderMoved4){
            return true
        }
        else{
            return false
        }        
    }

    render(){

        const labelStyles = {
            pt:'2',
            mt: '2',
            ml: '-2.5',
            fontSize: 'sm',
            maxW:'30%'
        }
        
        return(
            <>
            <Box>

                <HStack direction="row" spacing={0} p={4} justify="space-between">
                    <Heading fontSize={{md:"3xl", base:"2xl"}} pl={5}></Heading>
                    <Tooltip display={{md:"flex",base:"none"}} isDisabled={this.allAnswered()} label="Please select a value to proceed">
                        <span>
                        <Button ml={9} display={{md:"flex",base:"none"}} onClick={this.submit} isDisabled={!this.allAnswered()} rightIcon={<ArrowForwardIcon/>} colorScheme="auburn">Next</Button>
                        </span>
                    </Tooltip>
                </HStack>

                <VStack>
                    <Heading p={2} pt={6} fontSize={{md:"2xl", base:"xl"}}>In general, in the past month, which mode of transport have you used the most often?</Heading>
                    <Box p={4}>
                        <RadioGroup colorScheme='auburn' onChange={this.setRadioValue}>
                            <Stack>
                                <Radio value='Car'>Car (driver or passenger)</Radio>
                                <Radio value='Motorcycle'>Motorcycle/Moped</Radio>
                                <Radio value='PublicTransport'>Public transport</Radio>
                                <Radio value='Walk'>Walk</Radio>
                                <Radio value='Bicycle'>Bicycle (incl. e-bike / cargobike)</Radio>
                                <Radio value='Other'>Other modes (kick scooters,skateboard...)</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>

                    <Heading p={2} pt={6} fontSize={{md:"2xl", base:"xl"}}>In a typical week (Mon-Sun), on how many days do you use a <span style={{textDecoration:'underline'}}>car</span> (driver or passenger)</Heading>
                    <Box>                      
                        <Text p={2} pt={6} pb={2} fontSize={{md:"lg", base:"md"}}>For Work/Study?</Text>
                        <Text textAlign={"center"} fontSize={{md:"sm", base:"xs"}} mb={4} p={2}>Move the slidebar to choose your answer</Text>
                        <Slider m={6} colorScheme='auburn' aria-label='slider-ex-6' defaultValue={0} min={0} max={7} step={1} onChange={(val) => this.setSliderValue1(val)}>                                               
                            <SliderMark
                            value={this.state.sliderValue1}
                            textAlign='center'
                            bg='auburn.500'
                            color='white'
                            mt='-10'
                            ml='-7'
                            w='14'
                            >
                            {this.state.sliderValue1} days
                            </SliderMark>
                            <SliderTrack bg='auburn.100'>
                                <SliderFilledTrack></SliderFilledTrack>
                            </SliderTrack>
                            <SliderThumb boxSize={6}><Box color='auburn.500' as={IoMdCar} /></SliderThumb>
                        </Slider>
                        <Text p={2} pt={6} pb={2} fontSize={{md:"lg", base:"md"}}>For other activities (e.g. shopping, post office, pharmacy, taking children to and from school, visiting relatives, supermarket, restaurants, sport facilities)..?</Text>
                        <Text textAlign={"center"} fontSize={{md:"sm", base:"xs"}} mb={4} p={2}>Move the slidebar to choose your answer</Text>
                        <Slider m={6} colorScheme='auburn' aria-label='slider-ex-6' defaultValue={0} min={0} max={7} step={1} onChange={(val) => this.setSliderValue2(val)}>                                               
                            <SliderMark
                            value={this.state.sliderValue2}
                            textAlign='center'
                            bg='auburn.500'
                            color='white'
                            mt='-10'
                            ml='-7'
                            w='14'
                            >
                            {this.state.sliderValue2} days
                            </SliderMark>
                            <SliderTrack bg='auburn.100'>
                                <SliderFilledTrack></SliderFilledTrack>
                            </SliderTrack>
                            <SliderThumb boxSize={6}><Box color='auburn.500' as={IoMdCar} /></SliderThumb>
                        </Slider>
                    </Box>
                    <Heading p={2} pt={4} fontSize={{md:"2xl", base:"xl"}} pl={5}>In a typical week (Mon-Sun), on how many days do you <span style={{textDecoration:'underline'}}>walk</span></Heading>
                    <Box>
                        <Text p={2} pt={6} pb={2} fontSize={{md:"lg", base:"md"}}>For Work/Study?</Text>
                        <Text textAlign={"center"} fontSize={{md:"sm", base:"xs"}} mb={4} p={2}>Move the slidebar to choose your answer</Text>
                        <Slider m={6} colorScheme='auburn' aria-label='slider-ex-6' defaultValue={0} min={0} max={7} step={1} onChange={(val) => this.setSliderValue3(val)}>                                               
                            <SliderMark
                            value={this.state.sliderValue3}
                            textAlign='center'
                            bg='auburn.500'
                            color='white'
                            mt='-10'
                            ml='-7'
                            w='14'
                            >
                            {this.state.sliderValue3} days
                            </SliderMark>
                            <SliderTrack bg='auburn.100'>
                                <SliderFilledTrack></SliderFilledTrack>
                            </SliderTrack>
                            <SliderThumb boxSize={6}><Box color='auburn.500' as={GiWalk} /></SliderThumb>
                        </Slider>
                        <Text p={2} pt={6} pb={2} fontSize={{md:"lg", base:"md"}}>For other activities (e.g. shopping, post office, pharmacy, taking children to and from school, visiting relatives, supermarket, restaurants, sport facilities)..?</Text>
                        <Text textAlign={"center"} fontSize={{md:"sm", base:"xs"}} mb={4} p={2}>Move the slidebar to choose your answer</Text>
                        <Slider m={6} colorScheme='auburn' aria-label='slider-ex-6' defaultValue={0} min={0} max={7} step={1} onChange={(val) => this.setSliderValue4(val)}>                                               
                            <SliderMark
                            value={this.state.sliderValue4}
                            textAlign='center'
                            bg='auburn.500'
                            color='white'
                            mt='-10'
                            ml='-7'
                            w='14'
                            >
                            {this.state.sliderValue4} days
                            </SliderMark>
                            <SliderTrack bg='auburn.100'>
                                <SliderFilledTrack></SliderFilledTrack>
                            </SliderTrack>
                            <SliderThumb boxSize={6}><Box color='auburn.500' as={GiWalk} /></SliderThumb>
                        </Slider>
                    </Box>
                </VStack>


                <Box>
                    <HStack direction="row" spacing={0} p={4} justify="space-between">
                        <Box>
                            <Text fontSize={{lg:"xl",md:"md",sm:"xs"}} pl={5} pt={4} maxW={{lg:"100%", sm:"80%"}}>
                            </Text>

                        </Box>

                        <Tooltip display={{md:"none",base:"flex"}} isDisabled={this.state.rangeValue!=0} label="Please answer all questions to proceed">
                            <span>
                            <Button ml={9} display={{md:"none",base:"flex"}} onClick={this.submit} isDisabled={this.state.rangeValue==0} rightIcon={<ArrowForwardIcon/>} colorScheme="auburn">Next</Button>
                            </span>
                        </Tooltip>
                        
                    </HStack>
                </Box>

            </Box>       
            </>
        )
    }

}
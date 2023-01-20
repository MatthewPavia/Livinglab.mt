import { Icon, Stack, Center, Container, Box, Text, HStack, Heading, SimpleGrid, Badge, FormLabel, FormControl, Textarea, Divider, Tooltip, Button, Radio, RadioGroup, Slider,SliderTrack,SliderFilledTrack,SliderThumb,SliderMark, VStack, } from '@chakra-ui/react';
import React, { Component } from 'react';
import { GiWalk } from 'react-icons/gi'
import Cookies from 'universal-cookie';
import { ArrowForwardIcon } from '@chakra-ui/icons'

export class ThirdPage extends Component {
    constructor(props) {
        super(props);
        this.state = {         
          sliderValue:15,
          sliderMoved:false
        };     

        this.submit = this.submit.bind(this)
        this.setSliderValue = this.setSliderValue.bind(this)       
    }

    componentDidMount(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    submit(){
        const cookies = new Cookies();

        fetch('pages/thirdpage',{
            method:'POST',
            body:JSON.stringify({"PageValue":this.state.sliderValue.toString(),"PostedBy":cookies.get('username')}),
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

    setSliderValue(event){
        if(!this.state.sliderMoved){
            this.setState({sliderMoved:true})
        }

        this.setState({sliderValue:event})
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
            <Box position={'relative'}>

                <HStack direction="row" spacing={0} p={4} justify="space-between">
                    <Heading fontSize={{md:"3xl", base:"2xl"}} pl={5}></Heading>
                    <Tooltip display={{md:"flex",base:"none"}} isDisabled={this.state.sliderMoved} label="Please select a value to proceed">
                        <span>
                        <Button ml={9} display={{md:"flex",base:"none"}} onClick={this.submit} isDisabled={!this.state.sliderMoved} rightIcon={<ArrowForwardIcon/>} colorScheme="auburn">Next</Button>
                        </span>
                    </Tooltip>
                </HStack>

                <Text fontSize={{md:"2xl", base:"lg"}} ml={8} mr={8} mt={2} p={6}>Imagine that you have to take a letter to the post office. The way to the post office is neither hilly nor dangerous. 
                    You have no other errands, the weather is fine and you are not pressed for time. How far would you walk if you had a car available for the same trip?</Text>
                <Box m={2} pt={16} pb={52} align={'center'} justify={'center'}>

                    <Text fontSize={{md:"md", base:"sm"}} ml={8} mr={8} mb={6} p={6}>Move the slidebar to choose your answer</Text>
                    <Slider  w="75%" colorScheme='auburn' aria-label='slider-ex-6' defaultValue={15} min={0} max={30} step={1} onChange={(val) => this.setSliderValue(val)}>
                        <SliderMark value={0} {...labelStyles}>
                            I would not walk, I would use the car
                        </SliderMark>
                        <SliderMark value={30} {...labelStyles}>
                            I would walk up to 30 minutes
                        </SliderMark>                        
                        <SliderMark
                        value={this.state.sliderValue}
                        textAlign='center'
                        bg='auburn.500'
                        color='white'
                        mt='-10'
                        ml='-7'
                        w='14'
                        >
                        {this.state.sliderValue} min
                        </SliderMark>
                        <SliderTrack bg='auburn.100'>
                            <SliderFilledTrack></SliderFilledTrack>
                        </SliderTrack>
                        <SliderThumb boxSize={6}><Box color='auburn.500' as={GiWalk} /></SliderThumb>
                    </Slider>
                </Box>

                <HStack direction="row" spacing={0} p={4} justify="space-between">
                    <Heading fontSize={{md:"3xl", base:"2xl"}} pl={5}></Heading>
                    <Tooltip display={{md:"none",base:"flex"}} isDisabled={this.state.sliderMoved} label="Please select a value to proceed">
                        <span>
                        <Button ml={9} display={{md:"none",base:"flex"}} onClick={this.submit} isDisabled={!this.state.sliderMoved} rightIcon={<ArrowForwardIcon/>} colorScheme="auburn">Next</Button>
                        </span>
                    </Tooltip>
                </HStack>

            </Box>       
            </>
        )
    }

}
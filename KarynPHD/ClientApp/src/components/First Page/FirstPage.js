import { Icon, Stack,  Container, Box, Text, HStack, Heading, SimpleGrid, Badge, FormLabel, FormControl, Textarea, Divider, Tooltip, Button, Radio, RadioGroup } from '@chakra-ui/react';
import React, { Component } from 'react';
import { GiWalk } from 'react-icons/gi'
import Cookies from 'universal-cookie';
import { ArrowForwardIcon } from '@chakra-ui/icons'

export class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {         
          rangeValue:0,
        };     

        this.submit = this.submit.bind(this)
        this.setValue = this.setValue.bind(this)       
    }

    submit(){
        const cookies = new Cookies();

        console.log(this.state.rangeValue, cookies.get('username'))

        fetch('pages/firstpage',{
            method:'POST',
            body:JSON.stringify({"FirstPageValue":this.state.rangeValue,"PostedBy":cookies.get('username')}),
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

    setValue(event){

        this.setState({rangeValue:event})
    }

    render(){

        return(
            <>
            <Box>

                <HStack direction="row" spacing={0} p={4} justify="space-between">
                    <Heading fontSize={{md:"3xl", base:"2xl"}} pl={5}>How much physical effort did you have to make during the walk you just did, based on the following scale?</Heading>
                    <Tooltip display={{md:"flex",base:"none"}} isDisabled={this.state.rangeValue!=0} label="Please answer all questions to proceed">
                        <span>
                        <Button ml={9} display={{md:"flex",base:"none"}} onClick={this.submit} isDisabled={this.state.rangeValue==0} rightIcon={<ArrowForwardIcon/>} colorScheme="auburn">Next</Button>
                        </span>
                    </Tooltip>
                </HStack>

                <Box p={12} pl={16} pr={16}>
                    <RadioGroup colorScheme='auburn' onChange={this.setValue}>
                        <Stack>
                            <Radio value='1'>Very easy</Radio>
                            <Radio value='2'>Easy </Radio>
                            <Radio value='3'>Moderate</Radio>
                            <Radio value='4'>Somewhat hard</Radio>
                            <Radio value='5'>Hard</Radio>
                            <Radio value='6'>Very Hard</Radio>
                            <Radio value='7'>Maximum effort</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>


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
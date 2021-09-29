import React, { Component } from "react";
import {
    chakra,
    Box,
    Flex,
    Textarea,
    IconButton,
    Container,
    Text,
    Heading,
    Icon,
    Center,
    Image,
    Stack,
    Avatar,
    HStack,VStack,Button, Tooltip,Radio,RadioGroup,FormControl,FormLabel,SimpleGrid
  } from "@chakra-ui/react";
  import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { SolutionRating } from "./SolutionRating";

export class SolutionBox extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          answers:[{'rating':'','opinion':'','encouraged':''}]
        };
        
        this.handleTextareaChange = this.handleTextareaChange.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
    }

    handleRatingChange(event){
        console.log(event.target.value)
        this.props.setAnswers('rating',event.target.value)
    }

    handleTextareaChange(event){
        this.props.setAnswers('opinion',event.target.value)
    }

    handleRadioChange(event){
        this.props.setAnswers('encouraged',event)
    }

    render(){
        return(
            <>
            <HStack p={2} display={{md:"none",base:"flex"}} justify="space-evenly">
                <IconButton  isDisabled={this.props.currentSolution==0} colorScheme="eucalyptus" mr={4} icon={<ArrowBackIcon/>}/>
                <IconButton colorScheme="eucalyptus" mr={4} icon={<ArrowForwardIcon/>}/>
            </HStack>
            <Center py={6}>
                <IconButton size="lg" display={{md:"block",base:"none"}} isDisabled={this.props.currentSolution==0} colorScheme="eucalyptus" mr={4} icon={<ArrowBackIcon/>}/>
                <Box maxW={{md:'80%',base:'95%'}} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'md'} p={6} overflow={'hidden'}>         

                    <VStack spacing={2}> 
                        <Stack>
                            <HStack spacing={2}>                       
                                <Box className="numberCircle" fontSize={{md:"2xl",base:"md"}}>1</Box>
                                <Text p={2} color={'auburn.500'} textTransform={''} fontWeight={700} fontSize={'lg'} letterSpacing={''}>
                                Street Reconfiguration
                                </Text>                                                      
                            </HStack>
                            <Text pl={16} color={'gray.700'} fontSize={{md:"lg",base:"sm"}}>
                                Reconfigure the street from 2 lanes into a single lane for vehicles and buses, with one side for vehicle parking, creating more space for pedestrians and a 2-way cycling lane. The Msida promenade could be extended to Ta'Xbiex to form a continous pedestrian-oriented promenade.
                            </Text>
                        </Stack>

                        <SimpleGrid columns={{md:2,sm:1}}  p={6} spacing={16} justify="center"> 
                            <VStack>
                                <Text fontSize="sm" fontWeight={600}>Triq ix-Xatt, Msida</Text>
                                <Image htmlHeight={250} htmlWidth={450} src="https://mobilitazzjonistore.blob.core.windows.net/images/Msida%20triq%20ix-xatt.JPG"/>
                            </VStack>      
                            <VStack>
                                <Text fontSize="sm" fontWeight={600}>Idea Design</Text>
                                <Image htmlHeight={250} htmlWidth={450} src="https://mobilitazzjonistore.blob.core.windows.net/images/images (1).JPG"/>
                            </VStack>                                    
                        </SimpleGrid>           

                        <SolutionRating handleRatingChange={this.handleRatingChange} ></SolutionRating>
                        
                        <Box justify="left">
                            <FormControl isRequired p={2}>
                                <FormLabel>Your Opinion:</FormLabel>
                                <Textarea isRequired justify="center" onBlur={this.handleTextareaChange} placeholder="Why did you make this decision? How can this solution be improved?" size="sm"/>
                            </FormControl>

                            <FormControl isRequired p={2} pt={4}>
                                <FormLabel>Would such an intervention encourage you to walk more for short distance trips?</FormLabel>
                                <RadioGroup onChange={this.handleRadioChange}>
                                <VStack align="left">
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                    <Radio value="Unsure">Unsure</Radio>
                                </VStack>
                            </RadioGroup>
                            </FormControl>
                        </Box>
                    </VStack>    
                </Box>
                <IconButton size="lg" display={{md:"block",base:"none"}} colorScheme="eucalyptus" ml={4} icon={<ArrowForwardIcon/>}/>
            </Center>
            </>
        )
    }
}

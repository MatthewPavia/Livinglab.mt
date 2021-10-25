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
  import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'
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
        this.isFinalSolutionBox = this.isFinalSolutionBox.bind(this)
    }

    handleRatingChange(event){        
        this.props.setAnswers('rating',event.target.value)
    }

    handleTextareaChange(event){
        this.props.setAnswers('opinion',event.target.value)
    }

    handleRadioChange(event){
        this.props.setAnswers('encouraged',event)
    }

    isFinalSolutionBox(){
        if(this.props.currentSolution==this.props.totalSolutions){
            return true
        }
        return false
    }

    isSolutionFilled(){
        if(this.props.answers[this.props.currentSolution]['rating'] != "" && this.props.answers[this.props.currentSolution]['opinion'] != "" && this.props.answers[this.props.currentSolution]['encouraged'] != ""){
            return true
        }
        return false
    }

    render(){
        return(
            <>
            
            <Center py={6}>
                <Tooltip label="Previous solution" isDisabled={this.props.currentSolution==1}>
                    <IconButton onClick={this.props.decrementCurrentSolution} size="lg" display={{md:"block",base:"none"}} isDisabled={this.props.currentSolution==1} colorScheme="eucalyptus" mr={4} icon={<ArrowBackIcon/>}/>
                </Tooltip>

                <Box maxW={{md:'80%',base:'95%'}} w={'full'} bg={'white'} boxShadow={{md:'2xl',base:'md'}} rounded={'md'} p={6} overflow={'hidden'}>         
                    <VStack spacing={2}> 
                        <Stack>
                            <HStack spacing={2}>                       
                                <Box className="numberCircle" fontSize={{md:"2xl",base:"md"}}>{this.props.number}</Box>
                                <Text p={2} color={'auburn.500'} textTransform={''} fontWeight={700} fontSize={{md:'2xl',base:"lg"}} letterSpacing={''}>
                                {this.props.title}
                                </Text>                                                      
                            </HStack>
                            <Text pl={{md:16,base:2}} color={'gray.700'} fontSize={{md:"lg",base:"md"}}>
                                {this.props.description}
                            </Text>
                        </Stack>

                        <SimpleGrid columns={{md:2,sm:1}}  p={6} spacing={16} justify="center"> 
                            <VStack>
                                <Text fontSize="md" fontWeight={600}>{this.props.img1Title}</Text>
                                <Image htmlHeight={250} htmlWidth={450} src={this.props.img1Url}/>
                            </VStack>      
                            <VStack>
                                <Text fontSize="md" fontWeight={600}>{this.props.img2Title}</Text>
                                <Image htmlHeight={250} htmlWidth={450} src={this.props.img2Url}/>
                            </VStack>                                    
                        </SimpleGrid>           

                        <SolutionRating answers={this.props.answers} currentSolution={this.props.currentSolution} handleRatingChange={this.handleRatingChange} ></SolutionRating>
                        
                        <Box justify="left">
                            <FormControl isRequired p={2}>
                                <FormLabel fontSize={{md:"xl",base:"md"}}>Your Opinion:</FormLabel>
                                <Textarea isRequired value={this.props.answers[this.props.currentSolution]['opinion']} justify="center" onChange={this.handleTextareaChange} placeholder="Why did you make this decision? How can this solution be improved?" size="sm"/>
                            </FormControl>

                            <FormControl isRequired p={2} pt={4}>
                                <FormLabel fontSize={{md:"xl",base:"md"}}>Would such an intervention encourage you to walk more for short distance trips?</FormLabel>
                                <RadioGroup value={this.props.answers[this.props.currentSolution]['encouraged']} onChange={this.handleRadioChange}>
                                <VStack align="left">
                                    <Radio colorScheme="auburn" size="md" value="Yes">Yes</Radio>
                                    <Radio colorScheme="auburn" size="md" value="No">No</Radio>
                                    <Radio colorScheme="auburn" size="md" value="Unsure">Unsure</Radio>
                                </VStack>
                            </RadioGroup>
                            </FormControl>
                        </Box>
                    </VStack>    
                </Box>

                <Tooltip label={this.isFinalSolutionBox()?"Submit":"Next solution"} isDisabled={!this.isSolutionFilled()}>
                    <IconButton onClick={this.props.incrementCurrentSolution} isDisabled={!this.isSolutionFilled()} size="lg" display={{md:"block",base:"none"}} colorScheme="eucalyptus" ml={4} icon={this.isFinalSolutionBox()?<CheckIcon/>:<ArrowForwardIcon/>}/>
                </Tooltip>
            </Center>

            <HStack p={2} pb={4} display={{md:"none",base:"flex"}} justify="space-evenly">
                <IconButton onClick={this.props.decrementCurrentSolution} isDisabled={this.props.currentSolution==1} colorScheme="eucalyptus" mr={4} icon={<ArrowBackIcon/>}/>
                <IconButton onClick={this.props.incrementCurrentSolution} isDisabled={!this.isSolutionFilled()} colorScheme="eucalyptus" mr={4} icon={this.isFinalSolutionBox()?<CheckIcon/>:<ArrowForwardIcon/>}/>
            </HStack>
            </>
        )
    }
}

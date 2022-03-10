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
    Spacer,
    HStack,VStack,Button, Tooltip,Radio,RadioGroup,FormControl,FormLabel,SimpleGrid
  } from "@chakra-ui/react";
  import { ArrowBackIcon, ArrowForwardIcon, CheckIcon, Search2Icon } from '@chakra-ui/icons'
import { SolutionRating } from "./SolutionRating";
import { AiOutlineExpand } from 'react-icons/ai';

export class SolutionBox extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          answers:[{'rating':'','opinion':'','encouraged':''}],
          expandedImageUrl:""
        };
        
        this.handleTextareaChange = this.handleTextareaChange.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.isFinalSolutionBox = this.isFinalSolutionBox.bind(this)
        this.showImageOverlay = this.showImageOverlay.bind(this)
        this.hideImageOverlay = this.hideImageOverlay.bind(this)
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

    showImageOverlay(url){
        this.setState({expandedImageUrl:url}, () => document.getElementById("overlay").style.display = "block")
        document.getElementById("overlay").style.display = "block";
    }

    hideImageOverlay(){
        document.getElementById("overlay").style.display = "none";
    }

    render(){
        return(
            <>

            <div id="overlay" onClick={() => this.hideImageOverlay()}>
                <div id="text"><Image src={this.state.expandedImageUrl}></Image></div>
            </div>

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
                            <Text pl={{md:16,base:2}} color={'gray.700'} fontWeight={500} fontSize={{md:'lg',base:"md"}} letterSpacing={''}>
                                {this.props.subtitle}
                                </Text>  
                            <Text pl={{md:16,base:2}} color={'gray.700'} fontSize={{md:"lg",base:"md"}}>
                                {this.props.description}
                            </Text>
                        </Stack>

                        <SimpleGrid columns={{md:2,sm:1}}  p={6} spacing={16} justify="center"> 
                            <VStack style={{cursor:"pointer"}} onClick={() => this.showImageOverlay(this.props.img1Url)}>
                                <Text fontSize="md" fontWeight={600}>{this.props.img1Title}</Text>

                                <div display={"block"} className="imgcontainer">
                                    <Image display={"block"} htmlHeight={250} htmlWidth={450} src={this.props.img1Url}/>
                                    <Search2Icon style={{"margin":8}} w={5} h={5} color='auburn.700' className="fa-download"/>
                                </div>

                                <Text fontSize="xs" fontWeight={400}>{this.props.credits}</Text>                              
                            </VStack>      
                            <VStack style={{cursor:"pointer"}} onClick={() => this.showImageOverlay(this.props.img2Url)}>
                                <Text fontSize="md" fontWeight={600}>{this.props.img2Title}</Text>

                                <div display={"block"} className="imgcontainer">
                                    <Image display={"block"} htmlHeight={250} htmlWidth={450} src={this.props.img2Url}/>
                                    <Search2Icon style={{"margin":8}} w={5} h={5} color='auburn.700' className="fa-download"/>
                                </div>
                                
                                <Text fontSize="xs" fontWeight={400}>{this.props.credits}</Text>
                            </VStack>                                    
                        </SimpleGrid>           

                        <SolutionRating answers={this.props.answers} currentSolution={this.props.currentSolution} handleRatingChange={this.handleRatingChange} ></SolutionRating>
                        
                        <Box justify="left">
                            <FormControl isRequired p={2}>
                                <FormLabel fontSize={{md:"xl",base:"md"}}>What do you think about this idea?</FormLabel>
                                <Textarea isRequired value={this.props.answers[this.props.currentSolution]['opinion']} justify="center" onChange={this.handleTextareaChange} placeholder="Why did you rate this way? How can this solution be improved?" size="sm"/>
                            </FormControl>

                            <FormControl isRequired p={2} pt={4}>
                                <FormLabel fontSize={{md:"xl",base:"md"}}>Would such an intervention in your locality encourage you to walk for short distance trips?*</FormLabel>
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

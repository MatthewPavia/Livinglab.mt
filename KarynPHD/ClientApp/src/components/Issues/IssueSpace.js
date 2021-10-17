import { Stack,  Container, Box, Text, HStack, Heading, SimpleGrid, Badge, FormLabel, FormControl, Textarea, Divider, Tooltip, Button} from '@chakra-ui/react';
import React, { Component } from 'react';
import { IssueBox } from './IssueBox';
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Cookies from 'universal-cookie';

export class IssueSpace extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          issues:[
              "Poor pavement quality","Lack of street crossings (e.g. zebra crossings)","High traffic speed","Lack of trees/greenery","Unattractive building development and design","Air pollution","Noise pollution","Lack of open/green spaces","Safety from crime","Poor road and infrastucture design","Traffic congestion"            
          ],
          answers:[]
        };         
        this.setAnswer = this.setAnswer.bind(this)
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
        this.allAnswered = this.allAnswered.bind(this)
        this.submit = this.submit.bind(this)
    }

    submit(){
        console.log("heree")
        const cookies = new Cookies();

        let questions = this.state.issues
        questions.push("Do any of these factors discourage you from walking within your locality? If yes, which factors and why?","Do you experience any other problems related to transport in your locality?")

        fetch('issues',{
            method:'POST',
            body:JSON.stringify({"Questions":questions,"Answers":this.state.answers,"PostedBy":cookies.get('username')}),
            headers:{'Content-Type': 'application/json'} 
            })
        .then(this.props.completePage())
    }

    setAnswer(i,value){
        let newAnswers = this.state.answers
        newAnswers[i] = String(value)
        this.setState({answers:newAnswers}, ()=>console.log(this.state.answers) )
    }

    handleTextAreaChange(event){
        this.setAnswer(event.target.id, event.target.value)
    }

    allAnswered(){
        if(this.state.answers.length == 13 && !(this.state.answers.includes(undefined) || this.state.answers.includes("")) ){
            return true
        }
        return false
    }

    render(){
        return(
            <>
            <Box>
                <HStack spacing={0} p={4} justify="space-between">
                    <Box>
                        <Heading fontSize={{md:"3xl", sm:"2xl"}} pl={5}>Current Issues</Heading>
                        <Text fontSize={{lg:"lg",md:"md",sm:"xs"}} pl={5} pt={4} maxW={{lg:"100%", sm:"80%"}}>Think about the locality you live in. Which of the following factors act as a barrier to walking? Click on each issue to indicate the severity of the problem.</Text>
                        <Stack pl={5} pt={4} direction="row">
                            <Badge fontSize={{md:"md",base:"xs"}} variant="solid" colorScheme="red">Major Issue</Badge>
                            <Badge fontSize={{md:"md",base:"xs"}} variant="solid" colorScheme="yellow">Somewhat of an issue</Badge>
                            <Badge fontSize={{md:"md",base:"xs"}} variant="solid" colorScheme="green">Not an Issue</Badge>
                        </Stack>
                    </Box>
                    <Tooltip isDisabled={this.allAnswered()} label="Please leave answer all questions to proceed">
                        <span>
                        <Button display={"flex"} onClick={this.submit} isDisabled={!this.allAnswered()} rightIcon={<ArrowForwardIcon/>} colorScheme="auburn">Next</Button>
                        </span>
                    </Tooltip>
                </HStack>
            </Box>

            <SimpleGrid columns={{md:4,base:1}} spacing={5} p={4}>
                {this.state.issues.map((x,i) => 
                <IssueBox key={i} num={i} text={x} setAnswer={this.setAnswer}></IssueBox>
                )}  
            </SimpleGrid>

            <Divider p={4}/>

            <Stack direction="column" spacing={6} p={8} pr={{md:16,base:2}} pl={{md:16,base:2}}>
                <FormControl isRequired>
                    <FormLabel>Do any of these factors discourage you from walking within your locality? If yes, which factors and why?</FormLabel>
                    <Textarea isRequired value={this.state.answers[11]} justify="center" id={11} onChange={this.handleTextAreaChange} placeholder="Type here" size="sm"/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Do you experience any other problems related to transport in your locality?</FormLabel>
                    <Textarea isRequired value={this.state.answers[12]} justify="center" id={12} onChange={this.handleTextAreaChange} placeholder="Type here" size="sm"/>
                </FormControl>
            </Stack>
            
            </>
        )
    }

}
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
              "Poor pavement quality","Lack of street crossings (e.g. zebra crossings)","High traffic speed","Lack of trees/green spaces","Unattractive building development and design","Air pollution","Noise pollution","Litter/poor street cleanliness","Safety from crime","Poor road and infrastucture design","Traffic congestion","Lack of street furniture (e.g. benches)"            
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
        .then(res => {
            if(res.ok){
                this.props.completePage()
            }
            else{
                alert("An error has occurred. Please try again.")
            }
        })
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
        if(this.state.answers.length == 14 && !(this.state.answers.includes(undefined) || this.state.answers.includes("")) ){
            return true
        }
        return false
    }

    render(){
        return(
            <>
            <Box>
                <HStack direction="row" spacing={0} p={4} justify="space-between">
                    <Box>
                        <Heading fontSize={{md:"3xl", base:"2xl"}} pl={5}>Current Issues in the Walking Environment</Heading>
                        <Text fontSize={{lg:"xl",md:"md",sm:"xs"}} pl={5} pt={4} maxW={{lg:"100%", sm:"80%"}}>Think about the locality you live in. Which of the following issues do you experience? Click on each issue multiple times to choose a colour and indicate the following:</Text>
                        <Stack pl={5} pt={4} direction={{md:"row",base:"column"}}>
                            <Badge fontSize={{md:"md",base:"xs"}} variant="solid" colorScheme="red">Red: Major Issue</Badge>
                            <Badge fontSize={{md:"md",base:"xs"}} variant="solid" colorScheme="orange">Orange: Somewhat of an issue</Badge>
                            <Badge fontSize={{md:"md",base:"xs"}} variant="solid" colorScheme="green">Green: Not an Issue</Badge>
                        </Stack>
                    </Box>

                    <Tooltip display={{md:"flex",base:"none"}} isDisabled={this.allAnswered()} label="Please answer all questions to proceed">
                        <span>
                        <Button ml={9} display={{md:"flex",base:"none"}} onClick={this.submit} isDisabled={!this.allAnswered()} rightIcon={<ArrowForwardIcon/>} colorScheme="auburn">Next</Button>
                        </span>
                    </Tooltip>
                    
                </HStack>
            </Box>

            <SimpleGrid columns={{lg:3,md:2,base:1}} spacing={5} p={4}>
                {this.state.issues.map((x,i) => 
                <IssueBox key={i} num={i} text={x} setAnswer={this.setAnswer}></IssueBox>
                )}  
            </SimpleGrid>

            <Divider p={4}/>

            <Stack direction="column" spacing={6} p={8} pr={{md:16,base:2}} pl={{md:16,base:2}}>
                <FormControl isRequired>
                    <FormLabel fontSize={{md:"xl",base:"md"}}>Do any of these factors discourage you from walking within your locality? If yes, which factors and why?</FormLabel>
                    <Textarea isRequired value={this.state.answers[12]} justify="center" id={12} onChange={this.handleTextAreaChange} placeholder="Type here" size="sm"/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize={{md:"xl",base:"md"}}>Do you experience any other problems related to transport in your locality?</FormLabel>
                    <Textarea isRequired value={this.state.answers[13]} justify="center" id={13} onChange={this.handleTextAreaChange} placeholder="Type here" size="sm"/>
                </FormControl>

                <Tooltip display={{md:"none",base:"flex"}} isDisabled={this.allAnswered()} label="Please answer all questions to proceed">
                    <span>
                    <Button width="100%" display={{md:"none",base:"flex"}} onClick={this.submit} isDisabled={!this.allAnswered()} rightIcon={<ArrowForwardIcon/>} colorScheme="auburn">Next</Button>
                    </span>
                </Tooltip>
            </Stack>
            
            

            </>
        )
    }

}
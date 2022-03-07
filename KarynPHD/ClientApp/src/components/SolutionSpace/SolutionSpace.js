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
    HStack,VStack,Button, Tooltip
  } from "@chakra-ui/react";
import { SolutionBox } from "./SolutionBox";
import Cookies from 'universal-cookie';
import {CustomToast} from '../CustomToast'

export class SolutionSpace extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          solutions:[],
          currentSolutionDetails:{},
          answers:[{'rating':'','opinion':'','encouraged':''},{'rating':'','opinion':'','encouraged':''},{'rating':'','opinion':'','encouraged':''},{'rating':'aa','opinion':'aa','encouraged':'aa'}],
          currentSolution:1,
          totalSolutions:2
        };
        
        this.CustomToastElement = React.createRef()

        this.setAnswers = this.setAnswers.bind(this)
        this.getCurrentSolutionDetails = this.getCurrentSolutionDetails.bind(this)
        this.incrementCurrentSolution = this.incrementCurrentSolution.bind(this)
        this.decrementCurrentSolution = this.decrementCurrentSolution.bind(this)
    }

    componentDidMount(){
        fetch('solution', {"method":"GET"})
        .then(res =>{
            if(res.ok){
                return res.json()
            }
            else{
                if(window.confirm("An error has occurred. Please try again.")){
                    window.location.reload()
                }
            }
        })
        .then(data => this.setState({solutions:data},() => this.getCurrentSolutionDetails()))
    }

    getCurrentSolutionDetails(){
        let currentSolutionDetails = this.state.solutions.find(x => x.number == this.state.currentSolution)
        this.setState({currentSolutionDetails:currentSolutionDetails})
    }

    setAnswers(key, answer){
        let currentAnswers = this.state.answers
        currentAnswers[this.state.currentSolution][key] = answer

        this.setState({answers:currentAnswers})
    }

    allAnswered(){
        let answers = this.state.answers.slice()

        if(answers.length == 4){
            answers.shift()
        }

        let validation = answers.every(x => x.rating && x.opinion && x.encouraged)

        return validation
    }

    incrementCurrentSolution(){

        if(this.state.currentSolution == this.state.totalSolutions){
            if(this.allAnswered()){
                const cookies = new Cookies();

                fetch('solution',{
                        method:'POST',
                        body:JSON.stringify({"Answers":this.state.answers,"PostedBy":cookies.get('username')}),
                        headers:{'Content-Type': 'application/json'} 
                    })
                .then(val => this.setCompletionCookie())
                .then(val => this.props.completePage())
                .catch(error => alert("An error has occurred. Please try again."))

            }
            else{
                this.CustomToastElement.current.toastError('Please fill in all questions!')
            }       
        }
        else{
            window.scrollTo({top:0, behavior:"smooth"})
            let newCurrentSolution = this.state.currentSolution + 1
            this.setState({currentSolution:newCurrentSolution}, ()=> this.getCurrentSolutionDetails())
        }     
    }

    setCompletionCookie(){
        //Incrementing completion cookie anyway, just in case user doesnt press Swal button
        const cookies = new Cookies();
        let completion = parseInt(cookies.get('completion')) + 1

        const current = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(current.getFullYear() + 1);

        cookies.set('completion', completion, { path: '/', expires:nextYear })
    }

    decrementCurrentSolution(){
        let newCurrentSolution = this.state.currentSolution - 1

        this.setState({currentSolution:newCurrentSolution}, ()=> this.getCurrentSolutionDetails())
    }

    render(){
        return(
            <>
            <CustomToast ref={this.CustomToastElement} />

            <Box>
                <HStack spacing={0} p={4} >
                    <Box>
                        <Heading fontSize={{md:"3xl", base:"2xl"}} pl={5}>Solution Space</Heading>
                        <Text fontSize={{lg:"lg",md:"md",sm:"xs"}} pl={5} pt={4} maxW={{lg:"100%", sm:"80%"}}>The following 4 ideas have been proposed by different stakeholders. What do you think of these solutions?</Text>
                    </Box>
                </HStack>
                <SolutionBox number={this.state.currentSolutionDetails.number} title={this.state.currentSolutionDetails.title} description={this.state.currentSolutionDetails.description} 
                    img1Title={this.state.currentSolutionDetails.img1Title} img1Url={this.state.currentSolutionDetails.img1Url} img2Title={this.state.currentSolutionDetails.img2Title} 
                    img2Url={this.state.currentSolutionDetails.img2Url} credits={this.state.currentSolutionDetails.credits} currentSolution={this.state.currentSolution} totalSolutions={this.state.totalSolutions} 
                    answers={this.state.answers} setAnswers={this.setAnswers} incrementCurrentSolution={this.incrementCurrentSolution} decrementCurrentSolution={this.decrementCurrentSolution}>                  
                </SolutionBox>
            </Box>
            </>
        )
    }
}

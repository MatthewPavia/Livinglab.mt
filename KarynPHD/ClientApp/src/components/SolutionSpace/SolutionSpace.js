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

export class SolutionSpace extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          solutions:[],
          currentSolutionDetails:{},
          answers:[{'rating':'','opinion':'','encouraged':''},{'rating':'','opinion':'','encouraged':''},{'rating':'','opinion':'','encouraged':''},{'rating':'','opinion':'','encouraged':''}],
          currentSolution:1,
          totalSolutions:2
        };
        
        this.setAnswers = this.setAnswers.bind(this)
        this.getCurrentSolutionDetails = this.getCurrentSolutionDetails.bind(this)
        this.incrementCurrentSolution = this.incrementCurrentSolution.bind(this)
        this.decrementCurrentSolution = this.decrementCurrentSolution.bind(this)
    }

    componentDidMount(){
        fetch('solution', {"method":"GET"})
        .then(res => res.json())
        .then(data => this.setState({solutions:data},() => this.getCurrentSolutionDetails()))
    }

    getCurrentSolutionDetails(){
        let currentSolutionDetails = this.state.solutions.find(x => x.number == this.state.currentSolution)
        this.setState({currentSolutionDetails:currentSolutionDetails})
    }

    setAnswers(key, answer){
        let currentAnswers = this.state.answers
        currentAnswers[this.state.currentSolution][key] = answer

        this.setState({answers:currentAnswers},()=>console.log(this.state.answers))
    }

    incrementCurrentSolution(){

        if(this.state.currentSolution == this.state.totalSolutions){
            const cookies = new Cookies();
            fetch('solution',{
                method:'POST',
                body:JSON.stringify({"Answers":this.state.answers,"PostedBy":cookies.get('username')}),
                headers:{'Content-Type': 'application/json'} 
                })
            .then(res => res.json())
        }
        else{
            let newCurrentSolution = this.state.currentSolution + 1
            this.setState({currentSolution:newCurrentSolution}, ()=> this.getCurrentSolutionDetails())
        }     
    }

    decrementCurrentSolution(){
        let newCurrentSolution = this.state.currentSolution - 1

        this.setState({currentSolution:newCurrentSolution}, ()=> this.getCurrentSolutionDetails())
    }

    render(){
        return(
            <>
            <Box>
                <HStack spacing={0} p={4} >
                    <Box>
                        <Heading fontSize={{md:"3xl", sm:"2xl"}} pl={5}>Solution Space</Heading>
                        <Text fontSize={{lg:"lg",md:"md",sm:"xs"}} pl={5} pt={4} maxW={{lg:"100%", sm:"80%"}}>Tell us what you think about these proposed solutions</Text>
                    </Box>
                </HStack>
                <SolutionBox number={this.state.currentSolutionDetails.number} title={this.state.currentSolutionDetails.title} description={this.state.currentSolutionDetails.description} img1Title={this.state.currentSolutionDetails.img1Title} img1Url={this.state.currentSolutionDetails.img1Url} img2Title={this.state.currentSolutionDetails.img2Title} img2Url={this.state.currentSolutionDetails.img2Url} currentSolution={this.state.currentSolution} totalSolutions={this.state.totalSolutions} answers={this.state.answers} setAnswers={this.setAnswers} incrementCurrentSolution={this.incrementCurrentSolution} decrementCurrentSolution={this.decrementCurrentSolution}></SolutionBox>
            </Box>
            </>
        )
    }
}

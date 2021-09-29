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

export class SolutionSpace extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          answers:[{'rating':'','opinion':'','encouraged':''},{'rating':'','opinion':'','encouraged':''},{'rating':'','opinion':'','encouraged':''},{'rating':'','opinion':'','encouraged':''}],
          currentSolution:0
        };
        
        this.setAnswers = this.setAnswers.bind(this)
    }

    setAnswers(key, answer){
        let currentAnswers = this.state.answers
        currentAnswers[this.state.currentSolution][key] = answer

        this.setState({answers:currentAnswers},()=>console.log(this.state.answers))
    }

    render(){
        return(
            <>
            <Box>
                <HStack spacing={0} p={4} >
                    <Box>
                        <Heading fontSize={{md:"3xl", sm:"2xl"}} pl={5} >Solution Space</Heading>
                        <Text fontSize={{lg:"lg",md:"md",sm:"xs"}} pl={5} pt={4} maxW={{lg:"100%", sm:"80%"}}>Tell us what you think about these proposed solutions</Text>
                    </Box>
                </HStack>
                <SolutionBox currentSolution={this.state.currentSolution} setAnswers={this.setAnswers}></SolutionBox>
            </Box>
            </>
        )
    }
}

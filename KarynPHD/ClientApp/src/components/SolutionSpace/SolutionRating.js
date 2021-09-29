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
    HStack,VStack,Button, Tooltip,FormLabel
  } from "@chakra-ui/react";

export class SolutionRating extends Component {
    render(){
        return(
            <>
            <HStack display={{md:"flex",base:"none"}} justifyContent="center" p={4}>
                <Text fontWeight={700} pr={40} fontSize={"xl"}>How would you rate this solution?</Text>
                <HStack spacing={4}>
                    <Tooltip label="Strongly Oppose"><button value={1} onClick={this.props.handleRatingChange} style={{fontSize:"45px"}}>😧</button></Tooltip>
                    <Tooltip label="Somewhat Oppose"><button value={2} onClick={this.props.handleRatingChange} style={{fontSize:"45px"}}>😕</button></Tooltip> 
                    <Tooltip label="Neutral"><button value={3} onClick={this.props.handleRatingChange} style={{fontSize:"45px"}}>😐</button></Tooltip> 
                    <Tooltip label="Somewhat Favour"><button value={4} onClick={this.props.handleRatingChange} style={{fontSize:"45px"}}>😀</button></Tooltip> 
                    <Tooltip label="Strongly Favour"><button value={5} onClick={this.props.handleRatingChange} style={{fontSize:"45px"}}>😍</button></Tooltip>                   
                </HStack>
            </HStack>

            <VStack display={{md:"none",base:"block"}} columns={{md:2,sm:1}} justifyContent="center" p={4}>
                <FormLabel>How would you rate this solution?</FormLabel>
                <HStack spacing={4}>
                    <Tooltip label="Strongly Oppose"><button value={1} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😧</button></Tooltip>
                    <Tooltip label="Somewhat Oppose"><button value={2} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😕</button></Tooltip> 
                    <Tooltip label="Neutral"><button value={3} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😐</button></Tooltip> 
                    <Tooltip label="Somewhat Favour"><button value={4} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😀</button></Tooltip> 
                    <Tooltip label="Strongly Favour"><button value={5} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😍</button></Tooltip>                   
                </HStack>
            </VStack>
            </>
        )
    }
}
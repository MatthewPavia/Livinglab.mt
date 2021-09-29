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

    constructor(){
        super();

        this.state = {
           clickedButton:0
        }

        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.isClicked = this.isClicked.bind(this)

    }

    handleRatingChange(event){
        this.props.handleRatingChange(event)
        this.setState({clickedButton:event.target.value})
    }

    isClicked(button){
        if(button == this.state.clickedButton){
            return true
        }
        return false
    }

    render(){

        return(
            <>
            <HStack display={{md:"flex",base:"none"}} justifyContent="center" p={4}>
                <Text fontWeight={700} pr={40} fontSize={"xl"}>How would you rate this solution?</Text>
                <HStack spacing={4}>
                    <Tooltip isOpen={this.isClicked(1)} label="Strongly Oppose"><button value={1} className={'emojiButton'} onClick={this.handleRatingChange} style={{fontSize:"45px"}}>😧</button></Tooltip>
                    <Tooltip isOpen={this.isClicked(2)} label="Somewhat Oppose"><button value={2} className={'emojiButton'} onClick={this.handleRatingChange} style={{fontSize:"45px"}}>😕</button></Tooltip> 
                    <Tooltip isOpen={this.isClicked(3)} label="Neutral"><button value={3} className={'emojiButton'} onClick={this.handleRatingChange} style={{fontSize:"45px"}}>😐</button></Tooltip> 
                    <Tooltip isOpen={this.isClicked(4)} label="Somewhat Favour"><button value={4} className={'emojiButton'} onClick={this.handleRatingChange} style={{fontSize:"45px"}}>😀</button></Tooltip> 
                    <Tooltip isOpen={this.isClicked(5)} label="Strongly Favour"><button value={5} className={'emojiButton'} onClick={this.handleRatingChange} style={{fontSize:"45px"}}>😍</button></Tooltip>                   
                </HStack>
            </HStack>

            <VStack display={{md:"none",base:"block"}} columns={{md:2,sm:1}} justifyContent="center" p={4}>
                <FormLabel>How would you rate this solution?</FormLabel>
                <HStack spacing={4}>
                    <Tooltip isOpen={this.isClicked(1)} label="Strongly Oppose"><button value={1} className={'emojiButton'} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😧</button></Tooltip>
                    <Tooltip isOpen={this.isClicked(2)} label="Somewhat Oppose"><button value={2} className={'emojiButton'} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😕</button></Tooltip> 
                    <Tooltip isOpen={this.isClicked(3)} label="Neutral"><button value={3} className={'emojiButton'} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😐</button></Tooltip> 
                    <Tooltip isOpen={this.isClicked(4)} label="Somewhat Favour"><button value={4} className={'emojiButton'} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😀</button></Tooltip> 
                    <Tooltip isOpen={this.isClicked(5)} label="Strongly Favour"><button value={5} className={'emojiButton'} onClick={this.props.handleRatingChange} style={{fontSize:"28px"}}>😍</button></Tooltip>                   
                </HStack>
            </VStack>
            </>
        )
    }
}
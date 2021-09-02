import React, { Component } from "react";
import {
  chakra,
  Box,
  Flex,
  Textarea,
  IconButton
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { data } from "jquery";

export default class NoteInput extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isInvalid:false,
      colour:"",
      inputText: ""
    };   
    
    this.randomColour = this.randomColour.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    this.randomColour()
  }

  randomColour(){
    let number = Math.floor(Math.random() * (4 - 1) + 1);
  
    if(number == 1){
      this.setState({colour:"yellow.200"})
    }
    else if(number == 2){
      this.setState({colour:"pink.200"})
    }
    else{
      this.setState({colour:"cyan.200"})
    }
  }
  
  handleChange(event){
  
    if(event.target.value.length > 280){
      this.setState({isInvalid:true})
    }
    else{
      this.setState({isInvalid:false, inputText:event.target.value})
    }
  }

  handleSubmit(){
    console.log(JSON.stringify(this.state.inputText))
    fetch('note', {
      method:'POST',
      body:JSON.stringify(this.state.inputText), 
      headers: {
        'Content-Type': 'application/json',
      },
    }).then()
    .catch(error => console.log(error))
  }

 render(){
    return (
      <>
        <Box
          w="full"
          maxW="sm"
          mx="auto"
          px={4}
          py={3}
          bg={"white"}
          shadow="md"
          rounded="md"
          padding={2}
          bg={this.state.colour}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span pl={4} fontSize="md" color={"gray.700"}>
              Leave a suggestion
            </chakra.span>        
          </Flex>

          <Box padding="3" >
            <Textarea
              h={52}
              size="md"
              resize={"none"}
              onBlur={this.handleChange}
              placeholder="Enter Text Here (280 Characters)"
              isInvalid={this.state.isInvalid}
            />
          </Box>

          <Flex justifyContent="space-between">
            <chakra.span fontSize="sm" color={"gray.500"}></chakra.span>
            <IconButton
              colorScheme="auburn"
              size="sm"
              aria-label="Search database"
              icon={<CheckIcon />}
              onClick={this.handleSubmit}
            />
          </Flex>
        </Box>
      </>
    );
 }
}

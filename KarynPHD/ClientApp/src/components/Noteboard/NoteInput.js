import React, { Component } from "react";
import {
  chakra,
  Box,
  Flex,
  Textarea,
  IconButton,
  CloseButton
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { data } from "jquery";
import Cookies from 'universal-cookie';

export default class NoteInput extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isInvalid:false,
      colour:"",
      inputText: "",
      noteHasAlreadyBeenEntered:true
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
      this.setState({colour:"#F8E689"})
    }
    else if(number == 2){
      this.setState({colour:"#EF9A69"})
    }
    else{
      this.setState({colour:"#8DDCD8"})
    }
  }
  
  handleChange(event){
    if((event.target.value.length > 280) || (event.target.value.length <= 1) ){
      this.setState({isInvalid:true})
    }
    else{
      this.setState({isInvalid:false, inputText:event.target.value})
    }
  }

  handleSubmit(){
    const cookies = new Cookies();


    if(this.state.inputText.length <= 1){
      this.setState({isInvalid:true})
    }
    else{
      this.setState({isInvalid:false})
      fetch('note', {
        method:'POST',
        body:JSON.stringify({"Text":this.state.inputText.trim(),"PostedBy":cookies.get('username')}), 
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(this.props.toggleNoteInputDisplay)
      .then(this.props.refreshBoard)
      .then(this.props.ideaSubmitted)
      .catch(error => console.log(error))
    }
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
              Submit an idea
            </chakra.span>
            {this.state.noteHasAlreadyBeenEntered ?
            <CloseButton onClick={this.props.toggleNoteInputDisplay}></CloseButton> : <></> }        
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

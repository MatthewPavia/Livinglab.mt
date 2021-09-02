import React, { Component } from "react";
import {
  chakra,
  Box,
  Flex,
  Textarea,
  IconButton,
  Container,
  Text,
  HStack,Button, Tooltip
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { data } from "jquery";
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

export default class Note extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      colour:"",
    };   
    
    this.randomColour = this.randomColour.bind(this);
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
          mt={3}
          bg={this.state.colour}
        >
          <Flex justifyContent="space-between" alignItems="self-end">
            <HStack>
                <chakra.span fontSize="lg" color="red.500">
                    <Tooltip label="Leave a like">
                        <button><BsHeart></BsHeart></button>
                    </Tooltip>                  
                </chakra.span>
                <Text>
                    5
                </Text>
            </HStack>        
          </Flex>

          <Box padding="3" >
            <Container
              h={52}
              size="md"
              resize={"none"}
            >
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis risus, sodales eu diam sed.</Text>
            </Container>
          </Box>
        </Box>
      </>
    );
 }
}

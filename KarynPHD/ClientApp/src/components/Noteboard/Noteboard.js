import { Box, Center, Square, Circle, Flex, HStack, SimpleGrid, Container, Text, IconButton, Tooltip  } from "@chakra-ui/react";
import React, { Component } from "react";
import NoteInput from "./NoteInput";
import Note from "./Note";
import { AddIcon } from '@chakra-ui/icons'

export default class Noteboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          displayInput: false
        };       
        
        const notes = []
      }

    render(){
        return(
            <>
                <Box  width='100%' height='100%' position='relative'>
                    <Box position='absolute' width='100%' height='100%'>
                        <Box p={4}>
                            <HStack spacing={12}>
                                <Text fontSize={{md:"3xl", sm:"2xl"}} pl={10}>Suggestion Noteboard</Text>
                                <Tooltip label="Add a note">
                                    <IconButton
                                    variant="outline"
                                    colorScheme="auburn"
                                    aria-label="Call Sage"
                                    fontSize="20px"
                                    size="sm"
                                    icon={<AddIcon />}
                                    onClick={() => this.setState({displayInput:true})}
                                    />
                                </Tooltip>
                                
                            </HStack>
                        </Box>
                        <Box overflowY="auto">
                            <SimpleGrid columns={{md:4, sm:1}} pl={2} pr={2}>
                                <Note></Note>  
                                <Note></Note>  
                                <Note></Note>
                                <Note></Note>   
                            </SimpleGrid>
                            <SimpleGrid columns={{md:4, sm:1}} pl={2} pr={2}>
                                <Note></Note>  
                                <Note></Note>  
                                <Note></Note>
                                <Note></Note>   
                            </SimpleGrid>
                            <SimpleGrid columns={{md:4, sm:1}} pl={2} pr={2}>
                                <Note></Note>  
                                <Note></Note>  
                                <Note></Note>
                                <Note></Note>   
                            </SimpleGrid>
                            <SimpleGrid columns={{md:4, sm:1}} pl={2} pr={2}>
                                <Note></Note>  
                                <Note></Note>  
                                <Note></Note>
                                <Note></Note>   
                            </SimpleGrid>
                        </Box> 
                    </Box> 
                   
                    {this.state.displayInput ?
                    <> 
                    <Box position="fixed" width='100%' height='100%' bg='rgba(151, 153, 156, 0.6)' zIndex={5}></Box>
                    <Box position='fixed' width='100%' height='100%' left={0} top={300} zIndex={10}>
                        <NoteInput></NoteInput> 
                    </Box></> : <></>  }
                                      
                </Box>                
            </>                  
        )    
    }
}
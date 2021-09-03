import { Box, Center, Square, Circle, Flex, HStack, SimpleGrid, Container, Text, IconButton, Tooltip  } from "@chakra-ui/react";
import React, { Component } from "react";
import NoteInput from "./NoteInput";
import Note from "./Note";
import { AddIcon } from '@chakra-ui/icons'

export default class Noteboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          displayInput: false,
          notes:[]
        };       
        
        this.toggleNoteInputDisplay = this.toggleNoteInputDisplay.bind(this)
        this.displayNotes = this.displayNotes.bind(this)
        this.splitToChunks = this.splitToChunks.bind(this)
        this.disableScrolling = this.disableScrolling.bind(this)
        this.enableScrolling = this.enableScrolling.bind(this)
        this.fetchNoteData = this.fetchNoteData.bind(this)

    }

    componentDidMount(){
        this.fetchNoteData()
    }

    fetchNoteData(){
        fetch('note', {"method":"GET"}).then(res => res.json()).then(data => this.setState({notes:data}))
    }

    disableScrolling(){
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
    }

    enableScrolling(){
        window.onscroll=function(){};
    }

    toggleNoteInputDisplay(){
        if(this.state.displayInput == true){
            this.setState({displayInput:false})
            this.enableScrolling()
        }
        else{
            this.setState({displayInput:true})
            this.disableScrolling()
        }
    }

    splitToChunks(array, parts) {
        if (parts < 2)
        return [array];

        var len = array.length,
                out = [],
                i = 0,
                size;

        if (len % parts === 0) {
            size = Math.floor(len / parts);
            while (i < len) {
                out.push(array.slice(i, i += size));
            }
        }

        else {

            parts--;
            size = Math.floor(len / parts);
            if (len % size === 0)
                size--;
            while (i < size * parts) {
                out.push(array.slice(i, i += size));
            }
            out.push(array.slice(size * parts));

        }

        return out;
    }

    displayNotes(){
        let notes = this.state.notes
        let notesNum = notes.length

        let parts = notesNum/4

        let splitNotes = this.splitToChunks(notes, parts)

        return(
            <Box overflowY="auto" pb={3}>            
                {
                    splitNotes.map( (x,i) =>
                        <SimpleGrid key={i} columns={{lg:4, md:2, sm:1}} px={{lg:200, md:5, sm:5}} pr={2} spacing={4}>
                            {x.map( y =>
                                <Note key={y.id} text={y.text} likes={y.likes} id={y.id} refreshBoard={this.fetchNoteData}></Note>
                            )}
                        </SimpleGrid>
                    )
                }
            </Box>
        )
        
    }

    render(){
        return(
            <>
                <Box  width='100%' height='100%' position='relative' >
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
                                    onClick={this.toggleNoteInputDisplay}
                                    />
                                </Tooltip>
                                
                            </HStack>
                        </Box>


                        {this.displayNotes()}
                    </Box> 
                   
                    {this.state.displayInput ?
                    <> 
                    <Box position="fixed" width='100%' height='100%' bg='rgba(196, 196, 196, 0.6)' zIndex={5}></Box>
                    <Box position='fixed' width='100%' height='100%' left={0} top={300} zIndex={10}>
                        <NoteInput toggleNoteInputDisplay={this.toggleNoteInputDisplay} refreshBoard={this.fetchNoteData}/>
                    </Box></> : <></>  }
                                      
                </Box>                
            </>                  
        )    
    }
}
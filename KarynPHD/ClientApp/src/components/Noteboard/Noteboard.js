import {Heading,Button, Box, Select, Center, Square, Circle, Flex, HStack, VStack, SimpleGrid, Container, Text, IconButton, Tooltip, Stack, Spinner  } from "@chakra-ui/react";
import React, { Component } from "react";
import NoteInput from "./NoteInput";
import Note from "./Note";
import { AddIcon, ArrowForwardIcon, CheckIcon, RepeatIcon } from '@chakra-ui/icons'
import { Footer } from '../Nav/Footer';
import {CustomToast} from '../CustomToast'
import { ToastContainer, toast } from 'react-toastify';
import LanguageContext from "../../languages/LanguageContext";
import Swal from 'sweetalert2'

export default class Noteboard extends Component {
    static contextType = LanguageContext;
    constructor(props) {
        super(props);
        this.state = { 
          displayInput: false,
          notes:[],
          sorting:'recent',
          ideaHasBeenSubmitted:false
        };       

        this.CustomToastElement = React.createRef()
        
        this.toggleNoteInputDisplay = this.toggleNoteInputDisplay.bind(this)
        this.displayNotes = this.displayNotes.bind(this)
        this.splitToChunks = this.splitToChunks.bind(this)
        this.disableScrolling = this.disableScrolling.bind(this)
        this.enableScrolling = this.enableScrolling.bind(this)
        this.fetchNoteData = this.fetchNoteData.bind(this)
        this.changeSorting = this.changeSorting.bind(this)
        this.ideaSubmitted = this.ideaSubmitted.bind(this)
        this.Swal = this.Swal.bind(this)
    }

    componentDidMount(){
        this.fetchNoteData()
        setInterval(this.fetchNoteData, 30000);
    }

    fetchNoteData(){
        fetch('idea/Get/'+this.state.sorting, {"method":"GET"})
        .then(res => { 
            if(res.ok){
                return res.json()
            }
            else{
                if(window.confirm("An error has occurred. Please try again.")){
                    window.location.reload()
                }
            }
        })
        .then(data => this.setState({notes:data}))   
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
                        <SimpleGrid key={i} columns={{xl:4,lg:2, md:2, sm:1}} px={{lg:200, md:5, sm:5}} pr={2} spacing={4}>
                            {x.map( y =>
                                <Note maxW="20%" key={y.id} text={y.text} likes={y.likes} id={y.id} refreshBoard={this.fetchNoteData}></Note>
                            )}
                        </SimpleGrid>
                    )
                }
            </Box>
        )
        
    }

    changeSorting(event){
        if(event.target.value != this.state.sorting){
            this.setState({sorting:event.target.value}, () => this.fetchNoteData())
        }
    }

    ideaSubmitted(){
        if(this.state.ideaHasBeenSubmitted == false){
            this.CustomToastElement.current.toastInfo('Thanks for the idea! You may add more ideas or continue!')
        }
        this.setState({ideaHasBeenSubmitted:true})
    }

    Swal(){
        Swal.fire({
            title: 'Thank you for your participation!',
            text:""/*"Please consider also participating in my questionairre: googl.forms/skdfjaksd"*/,
            icon:'success',
            width: 600,
            padding: '3em',
            background: '#fff',
            backdrop: `
              rgba(75,104,96,0.7)
            `,
            allowOutsideClick:false,
            confirmButtonColor: '#b87160',
            confirmButtonText: 'Complete'
          }).then(result => {
                if(result.isConfirmed){
                    this.props.completePage()
                }
            }
          )
    }
    
    render(){
        const language = this.context;
        return(
            <>
                <CustomToast ref={this.CustomToastElement} />

                <Box width='100%' height='100%' position="relative" >
                        <HStack spacing={4} p={4} justify="space-between">
                            <Box>
                                <Heading fontSize={{md:"3xl", sm:"2xl"}} pl={5} >{language.Noteboard.Title}</Heading>
                                <Text fontSize={{lg:"lg",md:"md",sm:"xs"}} pl={5} pt={4} maxW={{lg:"60%", sm:"80%"}}>{language.Noteboard.Description}
                                </Text>
                            </Box>

                            {!this.props.isCompleted ?
                            <Tooltip isDisabled={this.state.ideaHasBeenSubmitted} label={language.Noteboard.NextTooltip}>
                                <span>
                                <Button mr={4} display={{md:"flex",base:"none"}} onClick={this.Swal} isDisabled={!this.state.ideaHasBeenSubmitted} rightIcon={<CheckIcon/>} colorScheme="auburn">{language.Noteboard.Next}</Button>
                                </span>
                            </Tooltip> : <></>}
                        </HStack>
                        
                        <HStack>
                            <Button ml={9} display={{md:"flex",base:"none"}} rightIcon={<AddIcon />} colorScheme="auburn" variant="outline" onClick={this.toggleNoteInputDisplay}>
                                {language.Noteboard.Add}
                            </Button>

                            <Select p={2} pl={5} onChange={this.changeSorting} maxWidth="max-content" size={{md:"sm",base:"sm"}} placeholder="Sort By">
                                <option value="recent">Recent</option>
                                <option value="likes">Likes</option>
                            </Select>
                            
                            {/*<Tooltip label="Refresh board">
                                <IconButton icon={<RepeatIcon/>} size='sm' variant="outline" onClick={() => this.fetchNoteData()}></IconButton>
                            </Tooltip>*/}
                            
                        </HStack>

                        {/*Displayed for mobile only */}
                        <HStack display={{md:"none",base:"flex"}} justify="center">
                            <Button pr={4} rightIcon={<AddIcon />} colorScheme="auburn" variant="outline" onClick={this.toggleNoteInputDisplay}>
                            {language.Noteboard.Add}
                            </Button>

                            {!this.props.isCompleted ?
                            <Tooltip isDisabled={this.state.ideaHasBeenSubmitted} label={language.Noteboard.NextTooltip}>
                                <span>
                                <Button onClick={this.Swal} isDisabled={!this.state.ideaHasBeenSubmitted} rightIcon={<CheckIcon/>} colorScheme="auburn">{language.Noteboard.Next}</Button>
                                </span>
                            </Tooltip> : <></>}
                        </HStack>

                        

                        {this.state.notes.length < 1 ? 
                        <Spinner mt={12} mb={12} marginLeft="auto" marginRight="auto" thickness='4px' display="block" justify="space-between" size='xl' color="auburn.500" emptyColor='gray.200'></Spinner>
                        : this.displayNotes()  }
                   
                    {this.state.displayInput ?
                    <> 
                    <Box position="absolute" bottom={0} top={0} width='100%' height='100%' backgroundColor='rgba(196, 196, 196, 0.6)' zIndex={5}></Box>
                    <Box position='fixed' width='100%' height='100%' left={0} top={{md:300,sm:200,base:150}} zIndex={10}>
                        <NoteInput ideaSubmitted={this.ideaSubmitted} completePage={this.props.completePage} toggleNoteInputDisplay={this.toggleNoteInputDisplay} refreshBoard={this.fetchNoteData}/>
                    </Box></> : <></>  }
                                                         
                </Box>   
                            
            </>                  
        )    
    }
}
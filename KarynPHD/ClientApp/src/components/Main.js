import { Flex,  CircularProgress, Box, Text} from '@chakra-ui/react';
import React, { Component } from 'react';
import { Login } from './Login';
import NavMenu from './Nav/NavMenu';
import Noteboard from './Noteboard/Noteboard';
import { Footer } from './Nav/Footer';
import {SolutionSpace} from './SolutionSpace/SolutionSpace'

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          currentCompletion:2
        };         
        this.pageToDisplay = this.pageToDisplay.bind(this);

    }

    pageToDisplay(){
        if(this.state.currentCompletion == 0){
            return(<></>)
        }
        else if(this.state.currentCompletion == 1){
            return(<Noteboard></Noteboard>)
        }
        if(this.state.currentCompletion == 2){
            return(<SolutionSpace></SolutionSpace>)
        }
    }

    render(){
        return(
            <>  
                <Box width='100%' height='100%' position='relative'>
                    <NavMenu currentCompletion={this.state.currentCompletion}></NavMenu>    
                    {!this.props.isAuth ? 
                    <Box position='absolute' width='100%' height='100%' zIndex='10'>
                        <Login></Login>
                    </Box>
                    : <></>}            
                </Box>
                {this.pageToDisplay()}         
            </>
        )
    }

}
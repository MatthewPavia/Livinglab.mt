import { Flex,  CircularProgress, Box, Text} from '@chakra-ui/react';
import React, { Component } from 'react';
import { Login } from './Login';
import NavMenu from './Nav/NavMenu';
import Noteboard from './Noteboard/Noteboard';
import { Footer } from './Nav/Footer';
import {SolutionSpace} from './SolutionSpace/SolutionSpace'
import Cookies from 'universal-cookie';

export class Main extends Component {
    constructor(props) {
        super(props);

        this.state = { 
          currentCompletion:1
        };         
        this.pageToDisplay = this.pageToDisplay.bind(this);
        this.completePage = this.completePage.bind(this);
    }

    componentDidMount(){
        const cookies = new Cookies();

        if(cookies.get('completion') === undefined){
            this.setCompletionCookie(cookies)
        }
        else{
            this.setState({currentCompletion:cookies.get('completion')})
        }
    }

    setCompletionCookie(cookies){
        const current = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(current.getFullYear() + 1);
        cookies.set('completion', this.state.currentCompletion, { path: '/', expires:nextYear });
    }

    completePage(){
        let current = this.state.currentCompletion
        current = parseInt(current) + 1

        const cookies = new Cookies();
        this.setState({currentCompletion:current},()=>this.setCompletionCookie(cookies))
    }

    pageToDisplay(){
        if(this.state.currentCompletion == 0){
            return(<></>)
        }
        else if(this.state.currentCompletion == 1){
            return(<Noteboard completePage={this.completePage}></Noteboard>)
        }
        if(this.state.currentCompletion == 2){
            return(<SolutionSpace completePage={this.completePage}></SolutionSpace>)
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
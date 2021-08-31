import { Flex,  CircularProgress, Box, Text} from '@chakra-ui/react';
import React, { Component } from 'react';
import { Login } from './Login';


export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          
        };         
    }

    render(){
        return(
            <>      
                <Box width='100%' height='100%' position='relative'>
                    {!this.props.isAuth ? 
                    <Box position='absolute' width='100%' height='100%' zIndex='10'>
                        <Login></Login>
                    </Box>
                    : <></>}
                    <Text position='relative' width='100%' height='100%'>TEST</Text>
                </Box>
            </>
        )
    }

}
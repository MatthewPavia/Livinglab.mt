import { Stack,  Container, Box, Text} from '@chakra-ui/react';
import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          
        };         
    }


    render(){
        return(
            <Box
            bg={'eucalyptus.100'}
            color={'gray.900'}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>© 2021 Mobilitazzjoni. All rights reserved</Text>
                
            </Container>
            </Box>
        )
    }

}
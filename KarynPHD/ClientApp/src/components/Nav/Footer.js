import { Stack,HStack,  Container, Box, Text, Link} from '@chakra-ui/react';
import React, { Component } from 'react';
import { TermsOfUse } from '../Info/TermsOfUse';
import { Link as ReachLink } from 'react-router-dom'

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          year : new Date().getFullYear()
        };         
    }


    render(){
        return(
            <Box
            bg={'white.200'}
            color={'gray.900'}
            height="10"
            pb={2}
            mt={2}
            ml={8}
            mr={8}>
                <Stack
                    maxW={'100%'}
                    direction={{ md: 'row', base:"column" }}
                    spacing={4}
                    height="10"
                    justify={{ base: 'center', md: 'space-between' }}
                    align="center">

                    <Text fontSize={{md:"sm",base:"xs"}}>© {this.state.year} IdeaLab.mt all rights reserved. Website developed by Matthew Pavia.</Text>
                    <HStack pb={2} spacing={8}>
                        <Text fontSize={{md:"sm",base:"xs"}} fontWeight="semibold"><Link as={ReachLink} to="/terms" color="eucalyptus.700">Terms of Use</Link></Text>
                        <Text fontSize={{md:"sm",base:"xs"}} fontWeight="semibold"><Link as={ReachLink} to="/privacypolicy" color="eucalyptus.700">Privacy Policy</Link></Text>
                    </HStack>
                </Stack>
            </Box>
        )
    }

}
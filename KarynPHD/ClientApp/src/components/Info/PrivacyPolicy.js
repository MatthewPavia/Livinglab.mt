import { OrderedList,VStack, UnorderedList,ListItem,Box,Heading, Text} from '@chakra-ui/react';
import React, { Component } from 'react';
import { Footer } from '../Nav/Footer';

export class PrivacyPolicy extends Component {

    render(){
        return(
            <Box height={{md:"100vh",base:"max"}} bg="#97b4ac" >
                <Box p={6}>
                    <VStack p={4} align="left" >
                    <Heading size="2xl">Privacy Policy</Heading>
                    <Text pt={2}>IdeaLab is an online living lab platform created for data collection purposes for PhD research. Users of the website will remain anonymous throughout participation and within the database. At no point in time will you be asked for your email address, first or last name or date of birth. </Text>
                    <Heading pt={4} size="md">Personal data we collect</Heading>
                    <Text pt={1}>During registration as a new User, you will be asked to provide: </Text>
                    <OrderedList pl={12}>
                        <ListItem><Text>Gender</Text></ListItem>
                        <ListItem><Text>Locality of residence</Text></ListItem>
                        <ListItem><Text>Age</Text></ListItem>
                    </OrderedList>
                    <Text pt={1}>This personal data is collected to create an anonymous User profile and facilitate data collection and analysis. This also allows for the identification and authentication of Users, improves security, ensures participants are over the age of 18 and avoids spam and abuse. No personal data will be collected through the use of cookies when using this website. We do not share your information with third parties. </Text>
                    <Heading pt={4} size="md">Cookies</Heading>
                    <Text pt={1}>This website uses ‘cookies’ to improve your experience when you visit our website. It facilitates spam detection and site navigation. You can delete cookies using your browser settings. We do not track or store your IP address in our database. </Text>
                    <Heading pt={4} size="md">Your rights</Heading>
                    <Text pt={1}>Your rights allow you to access any personal data we hold about you by contacting the researcher on karyn.scerri.15@um.edu.mt. All data collected will be stored for the duration of this research project. Should you wish to opt out of this study at any point in time or withdraw your consent, you may contact the researcher on karyn.scerri.15@um.edu.mt. 
                    The privacy policy may be subject to changes, and it is up to the Users to check this page for updates or possible changes. If a User objects to any change in the policy, the User must not continue to use this Website. 
                    This privacy statement has been drawn up considering the obligations in art. 10 of the European Directive 95/46 / EC, the provisions of European Directive 2002/58 / EC, and the Directive 2009/136 / EC regarding cookies.
                    </Text>
                    <Heading pt={4} size="md">Contact Us</Heading>
                    <Text pt={1} fontWeight="semibold">Researcher: Karyn Scerri</Text>
                    <Text as="u">karyn.scerri.15@um.edu.mt</Text>
                    <Text fontWeight="semibold">Website Administrator: Matthew Pavia</Text>
                    <Text as="u">matthewpavia@gmail.com</Text>
                    </VStack>         
                </Box>
                <Footer></Footer>
            </Box>
            
        )
    }
}
import { OrderedList,VStack, UnorderedList,ListItem,Box,Heading, Text} from '@chakra-ui/react';
import React, { Component } from 'react';
import { Footer } from '../Nav/Footer';

export class TermsOfUse extends Component {

    render(){
        return(
            <Box height="max" bg="#97b4ac">
                <Box p={6}>
                    <VStack p={4} align="left" >
                    <Heading size="2xl">Terms of Use</Heading>
                    <Text pt={2}>Feedback is always welcome and any ideas to improve the platform or suggestions can be forwarded to karyn.scerri.15@um.edu.mt. </Text>
                    <Heading pt={4} size="md">ACCEPTANCE OF TERMS OF USE</Heading>
                    <Text pt={1}>By accessing or using The IdeaLab website you agree that you fully understand and agree to give consent to participate in the research project, approve my analysis of your anonymous answers and be bound by the terms and conditions stated in these Terms of Use. If you do not accept the Terms or object any part of the terms, you must not use the website. </Text>
                    <Heading pt={4} size="md">DESCRIPTION</Heading>
                    <UnorderedList pt={1}>
                        <ListItem><Text>This online living lab platform has been set up as part of a PhD study conducted by researcher Karyn Scerri at the University of Malta regarding the impact of pedestrian intervention on people’s travel behaviour. This platform seeks to engage citizens to share their thoughts, ideas and constructive criticisms of potential pedestrian projects. </Text></ListItem>
                        <ListItem><Text>By joining the living lab, you are affirming that you are over 18 years of age and are fully able to comply with these Terms of Use</Text></ListItem>
                        <ListItem><Text>IdeaLab reserves the right to change, remove or terminate any part of the website, or any content for any reason without notice or liability. IdeaLab cannot be held liable for any messages posted by Users or third parties which violate the rules. Any infringements will be removed by the web administrator and reports of infringements can be forwarded to karyn.scerri.15@um.edu.mt</Text></ListItem>
                        <ListItem><Text>IdeaLab reserves the right to modify these Terms of Use at any point in time without notice, updating the amended terms on the website, and taking effect immediately.</Text></ListItem>
                    </UnorderedList>
                    <Heading pt={4} size="md">USER CONDUCT</Heading>
                    <UnorderedList pt={1}>
                        <ListItem><Text>You must not send, post or submit any content that is unlawful, harmful, abusive, defamatory, vulgar, hateful or otherwise objectionable. </Text></ListItem>
                        <ListItem><Text>Local laws must be abided by, including but not limited to intellectual property laws, online content laws and acceptable content laws. </Text></ListItem>
                    </UnorderedList>
                    <Heading pt={4} size="md">PROPERTY RIGHTS AND COPYRIGHT POLICY</Heading>
                    <Text pt={1}>Data presented on the website respects intellectual property rights of others and any information submitted by Users that infringes copyright shall be removed. By accepting the Terms of Use, you agree to be bound by our Copyright Policy. It is forbidden to reproduce, distribute or transmit the contents of the platform and the platform itself without permission. </Text>
                    <Heading pt={4} size="md">ACCOUNT INFORMATION</Heading>
                    <Text pt={1}>Once the User joins the living lab, the person who created the User profile must use the account. Any other person wishing to join the platform using the same browser must create a new User profile. </Text>
                    <Heading pt={4} size="md">LIMITATION OF LIABILITY</Heading>
                    <Text pt={1}>Use of the website is at the Users own risk, and IdeaLab or any person associated with this platform cannot be held liable for misuse or use in breach of these terms. IdeaLab does not warrant the continuity and availability of the website.  </Text>
                    <Text pt={4}>Certain restrictions and limitations regarding the content and use of the platform are as follows: </Text>
                    <OrderedList>
                        <ListItem><Text>Offensive behaviour, harassment, intimidation or use of fear to silence other Users will not be allowed and will result in the removal of material. </Text></ListItem>
                        <ListItem><Text>Private or confidential data must not be published on the platform </Text></ListItem>
                        <ListItem><Text>Malicious content or links to such content which can damage or disrupt Users’ equipment is not allowed. Any interruptions, technical problems, viruses, or telecommunication failures are not our responsibility. </Text></ListItem>
                        <ListItem><Text>We cannot be held liable for delays or unavailability of the website, third-party actions or any other event beyond our control. </Text></ListItem>
                    </OrderedList> 
                    </VStack>                        
                </Box>
                <Footer></Footer>
            </Box>
        )
    }
}
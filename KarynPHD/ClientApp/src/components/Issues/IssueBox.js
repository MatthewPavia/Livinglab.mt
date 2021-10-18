import { Stack,  Container, Box, Text} from '@chakra-ui/react';
import React, { Component } from 'react';

export class IssueBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          value:0,
          colours:{
              0:"#b3b3b3",
              1:"#DB5461",
              2:"#F58F29",
              3:"#52AA5E"
          }
        };         
    }

    incrementValue(){
        let newValue = this.state.value

        if(newValue < 3){
            newValue++
        }
        else{
            newValue = 1
        }
        this.setState({value:newValue}, () => this.props.setAnswer(this.props.num, this.state.value) )
    }

    render(){
        return(
            <Box rounded={'lg'}
            bg={this.state.colours[this.state.value]}
            boxShadow={'lg'}
            p={8}
            maxW={'100%'}
            value={this.state.value}
            onClick={()=>this.incrementValue()}
            textAlign="center"
            className="issueBox"
            cursor="pointer"><Text fontSize="xl" unselectable="on" userSelect="none">{this.props.text}</Text></Box>
        )
    }

}
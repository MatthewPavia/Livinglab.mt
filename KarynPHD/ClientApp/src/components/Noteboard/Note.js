import React, { Component } from "react";
import {
  chakra,
  Box,
  Flex,
  Textarea,
  IconButton,
  Container,
  Text,
  HStack,Button, Tooltip
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { data } from "jquery";
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import Cookies from 'universal-cookie';

export default class Note extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      colour:"",
    };   
    
    this.randomColour = this.randomColour.bind(this);
    this.likeNote = this.likeNote.bind(this);
    this.unlikeNote = this.unlikeNote.bind(this);
    this.updateLikedNoteList = this.updateLikedNoteList.bind(this);
    this.removeFromLikedNoteList = this.removeFromLikedNoteList.bind(this);
    this.isNoteAlreadyLiked = this.isNoteAlreadyLiked.bind(this);
  }

  componentDidMount(){
    this.randomColour()
  }

  randomColour(){
    let number = Math.floor(Math.random() * (4 - 1) + 1);
  
    if(number == 1){
      this.setState({colour:"#F8E689"})
    }
    else if(number == 2){
      this.setState({colour:"#EF9A69"})
    }
    else{
      this.setState({colour:"#8DDCD8"})
    }
 }

 likeNote(){
    fetch('note/AddLike/'+this.props.id,
    {"method":"POST", "headers": {'Content-Type': 'application/json'}})
    .then(this.props.refreshBoard).then(this.updateLikedNoteList)
 }

 unlikeNote(){
  fetch('note/RemoveLike/'+this.props.id,
  {"method":"POST", "headers": {'Content-Type': 'application/json'}})
  .then(this.props.refreshBoard).then(this.removeFromLikedNoteList).then(this.isNoteAlreadyLiked)
}
  
 updateLikedNoteList(){
  const cookies = new Cookies();

  let likedByUser = cookies.get('likes')

  if(likedByUser == undefined){
    let likedByUserList = []

    const current = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(current.getFullYear() + 1);

    likedByUserList.push(this.props.id)
    cookies.set('likes', JSON.stringify(likedByUserList), { path: '/', expires:nextYear })
  }
  else{
    likedByUser.push(this.props.id)

    const current = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(current.getFullYear() + 1);

    cookies.set('likes', JSON.stringify(likedByUser), { path: '/', expires:nextYear })
  }
 }

 removeFromLikedNoteList(){
  const cookies = new Cookies();

  let likedByUser = cookies.get('likes')

  console.log(likedByUser)

  const index = likedByUser.indexOf(this.props.id);
  if (index > -1) {
    likedByUser.splice(index, 1);
  }

  console.log(likedByUser)

  const current = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(current.getFullYear() + 1);

  cookies.set('likes', JSON.stringify(likedByUser), { path: '/', expires:nextYear })
 }

 isNoteAlreadyLiked(){
  const cookies = new Cookies();
  let likedByUser = cookies.get('likes')

  if (likedByUser === undefined){
    return false
  }

  return likedByUser.includes(this.props.id)
 }

 render(){
    return (
      <>
        <Box
          w="full"
          maxW="sm"
          mx="auto"
          px={4}
          py={3}
          bg={"white"}
          shadow="md"
          rounded="md"
          mt={3}
          bg={this.state.colour}
        >
          <Flex justifyContent="space-between" alignItems="self-end">
            <HStack>
                <chakra.span fontSize="lg" color="#a63a3c">
                    <Tooltip label={this.isNoteAlreadyLiked() ? "Remove heart" : "Leave a heart"}>

                        {this.isNoteAlreadyLiked() ? 
                          <button onClick={this.unlikeNote}><BsFillHeartFill></BsFillHeartFill></button>
                        : <button onClick={this.likeNote}><BsHeart></BsHeart></button> }

                    </Tooltip>                  
                </chakra.span>
                <Text pb={1} fontWeight="semibold">
                    {this.props.likes}
                </Text>
            </HStack>        
          </Flex>

          <Box padding="3" >
            <Container
              h={52}
              size="md"
              resize={"none"}
              overflowY={"auto"}
            >
                <Text>{this.props.text}</Text>
            </Container>
          </Box>
        </Box>
      </>
    );
 }
}

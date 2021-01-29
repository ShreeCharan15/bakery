import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import React from 'react'
import { Component, useEffect, useState } from "react";
import {  Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from './firebase'
import Phone from "./phone";
 class Login extends Component{
     toggle=()=>this.setState({isOpen:!this.state.isOpen})

    constructor(props)
    {
        super(props);
        this.state={
            isOpen:false,
            phone:"",
        }
    }



    
     lo=()=>{
         if(firebase.auth().currentUser)
        return  <Button outline onClick={()=>{
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                this.setState({})
              }).catch((error) => {
                // An error happened.
              });
         }}>Logout</Button>
         else
         return <Button outline onClick={this.toggle}>Login</Button>
     }

    render()
    {
        return (
            <>
             {this.lo()}
        
              <Modal style={{backgroundColor:"#2D3748",borderColor:"#2D3748"}} backdrop={false} isOpen={this.state.isOpen} toggle={this.toggle} >
              <ModalHeader style={{backgroundColor:"#2D3748",borderColor:"#2D3748"}} toggle={this.toggle}>Login / Sign Up</ModalHeader>
              <ModalBody style={{backgroundColor:"#2D3748",borderColor:"#2D3748"}}>
           <Phone toggle={this.toggle}></Phone>
            
              </ModalBody>
              <ModalFooter style={{backgroundColor:"#2D3748",borderColor:"#2D3748"}}>
                <Button color="secondary" outline onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            </>
          )
    }


}
export default Login
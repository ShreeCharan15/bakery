import { Input, InputGroup, InputLeftAddon, PinInput, PinInputField, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from 'react'
import { Component, useEffect, useState } from "react";
import {  Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from './firebase'
class Phone extends Component{
    constructor(props)
    {
        super(props);
        this.recaptcha = React.createRef();
        this.state={
            isOpen:false,
            phone:"",
            sendingOTP:false,
            verifying:false,
            otp:"",
            otpSent:false,
        }
    }
    sendOtp=()=>{
        
        return <InputGroup>
     <InputLeftAddon children="+91" />
     <Input type="number"
     phone={this.state.phone}
     onChange={this.handleChange}
     placeholder="phone number" />
   </InputGroup>
     }


     
     startLogin=()=>{
         this.setState({sendingOTP:true})
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber("+91"+this.state.phone, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              this.setState({otpSent:true,sendingOTP:false})
              // ...
            }).catch((error) => {
                this.setState({otpSent:false,sendingOTP:false})
              // Error; SMS not sent
              // ...
            });
     }
     componentDidUpdate()
     {
        if(this.recaptcha && !window.recaptchaVerifier)
        {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {
                'size': 'invisible',
                'callback': function (response) {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                  // ...
                  this.startLogin()
                },
                'expired-callback': function () {
                  // Response expired. Ask user to solve reCAPTCHA again.
                  // ...
                }
             });
             window.recaptchaVerifier.render().then(function (widgetId) {
               window.recaptchaWidgetId = widgetId;
             });
        }
     }
     componentWillUnmount()
     {
         delete window.recaptchaVerifier
     }

    handleChange = (event) => {
        if(this.state.phone.length<10)
        this.setState({phone:event.target.value})
    }


    loginwithotp=()=>{
        this.setState({verifying:true})
        window.confirmationResult.confirm(this.state.otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            var credential = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, this.state.otp)
            firebase.auth().signInWithCredential(credential).then(()=>{
                this.props.toggle()
                
            }).catch((err)=>this.setState({verifying:false}))
            // ...
            
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            this.setState({verifying:false})
          });
    }
    
    render()
    {   
        return <>
         {this.state.sendingOTP?<SkeletonText></SkeletonText>:!this.state.otpSent?this.sendOtp():
         
         this.state.verifying?<SkeletonText></SkeletonText>:<div>
             <PinInput otp onChange={(st)=>this.setState({otp:st})}>
  <PinInputField />
  <PinInputField />
  <PinInputField />
  <PinInputField />
  <PinInputField />
  <PinInputField />
</PinInput>
         </div>
         }
         <div  ref={(ref)=>this.recaptcha=ref} ></div>
         {this.state.sendingOTP?<SkeletonText></SkeletonText>:!this.state.otpSent?   <Button style={{marginLeft:"auto",marginTop:"10px"}}
                      color="primary" onClick={()=>this.startLogin()}  disabled={this.state.phone.length!==10}>Send OTP</Button>:
                      this.state.verifying?<SkeletonText></SkeletonText>:<Button style={{marginLeft:"auto",marginTop:"10px"}}
                      color="primary" onClick={()=>this.loginwithotp()}  disabled={this.state.otp.length!==6}>Verify OTP</Button>
         
        }
      
             
        </>
    }
}
export default Phone
import { useDispatch, useSelector } from "react-redux"
import shortid from "shortid"
import { add, clearCart, remove } from "./redux/ActionCreator"
import firebase from './firebase'
import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputLeftElement, Select, Skeleton, SkeletonText, Spinner, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"
import { PhoneIcon, EmailIcon, CheckCircleIcon, CloseIcon } from '@chakra-ui/icons'
import {  Modal, ModalBody, } from 'reactstrap';

 const Payment=(props)=>{

const placeOrder=()=>{
  setPay(0)
  
  firebase.firestore().collection("Orders").doc()
  .set({items:{...cart},"email":email,"alternate":alternatePhone,"phone":user.user.phoneNumber,
  "uid":user.user.uid,
  "time":Date.now()
  ,"address":address,"paymode":paymode,"pincode":pincode,"delivery":deliveryInstructions})
  .then(()=>{
    dispatch(clearCart())
    setPay(1)
  }).catch((err)=>setPay(2))

}

  const done=()=>{
    return  <Modal style={{backgroundColor:"#2D3748",borderColor:"#2D3748"}} backdrop={false} isOpen={pay!==-1}  >
    <ModalBody style={{backgroundColor:"#2D3748",borderColor:"#2D3748",padding:"100px"}}>
    <div className="row justify-content-center">
    {pay===0?<Spinner className="col-auto" thickness="4px"speed="0.65s"emptyColor="gray.200"color="blue.500"size="xl"/>
    :pay===1?<Icon as={CheckCircleIcon} color="green.500" w={10} h={10}></Icon>
    :pay===2?<Icon as={CloseIcon} color="red.500" w={10} h={10}></Icon>:null
  }
<div className="col-12" style={{textAlign:"center",marginTop:"10px"}}>
    {pay===0?"Payment processing":pay===1?"Payment successful! Order placed":pay===2?"Payment failed!":""}
</div>
<div className="col-12" style={{textAlign:"center",marginTop:"10px"}}>
    {pay===1?"Order will be delivered in 12 hours":""}
</div>
<div className="col-12" style={{textAlign:"center",marginTop:"10px"}}>
    {pay===1?"Track your orders in the 'my orders'":""}
</div>
<div className="col-12" style={{textAlign:"center",marginTop:"10px"}}>
    <Button ><Link to="/orders" className="nav-link">Go to my orders</Link></Button>
</div>
    </div>
    </ModalBody>
  </Modal>
  }


    const dispatch=useDispatch();
    const cart=useSelector((state)=>state.cart)
    const user=useSelector((state)=>state.user)
    const [paymode,setPayMode]=useState("Card")
    const [address,setAddress]=useState("")
    const [pay,setPay]=useState(-1)
    const [email,setEmail]=useState("")
    const error={}

    const [pincode,setPinCode]=useState("")
    const [acceptterms,setAcceptterms]=useState(false)
    const [deliveryInstructions,setDeliveryInstructions]=useState("")

    const [alternatePhone,setAlternatePhone]=useState("")
    const Card=()=>{
        return <div className="row">
            <div className="col-12">
            <Input style={{margin:"10px 5px"}} value={"XXXX XXXX XXXX XXXX"}  variant="filled" placeholder="Card Number" />
            </div>
            <div className="col-12">
            <Input style={{margin:"10px 5px"}} value={"XXXXXXXXXXXXXXXX"}  variant="filled" placeholder="Card Holder Name" />
            </div>
            <div className="col-6">
            <Input style={{margin:"10px 5px"}} value={"XX/XX"} variant="filled" placeholder="Expiry" />
            </div>
            <div className="col-6">
            <Input style={{margin:"10px 5px"}} value={"XXX"} variant="filled" placeholder="CVV" />
            </div>
            <div className="col-12">
            <Checkbox style={{margin:"10px 5px"}} defaultIsChecked>Save Card</Checkbox>
            </div>
        </div>
    }

    const COD=()=>{
        return <p>Please tender exact change</p>
    }

    const UPI=()=>{
        return <div className="row">
             <div className="col-12">
            <Input style={{margin:"10px 5px"}} value={"aedvewgwrgwrgrgr"}  variant="filled" placeholder="UPI ID" />
            </div>
        </div>
    }
    useEffect(()=>{
    

        if(!user.user && !user.loading)
        {
            props.history.goBack()
        }
        
    })
    let total=0;
    let totno=0;
    Object.keys(cart).forEach((k)=>{
      if(!k.endsWith("Price"))
      {
        total+=cart[k]*cart[k+"Price"]
        totno+=cart[k]
      }
     
    })
    if(email!=="")
    {
      let emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!emailRegex.test(email))
      error['email']="Invalid Email"
    }else if(error['email']){
      delete error.email
    }
    
    if(pincode!=="")
    {
      let pinCodeRegex=/[1-9][0-9]{5}/
      if (!pinCodeRegex.test(pincode))
      error['pincode']="Invalid pincode"
    }else if(error['pincode']){
      delete error.pincode
    }
    if(address!=="")
    {
      if(address.length<10)
      error['address']="At least 10 characters required"
    }else if(error['address']){
      delete error.address
    }
    if(user.user)
    {
      if(totno>0)
      {
        return <div className="container">
          {done()}
        <div className="row" style={{marginTop:"20px"}}>
            <div className="col-12 col-md-6">
            <div className="row align-items-center">
              <div className="col">Name</div>
              <div className="col-3">Qty</div>
              <div className="col-auto">Price</div>
              </div>
               <div style={{marginTop:"10px",color:"#9A9DA2"}}>
               {Object.keys(cart).map((k,i)=>
              {
                if(k.endsWith("Price"))
                return null
                else
                return           <div key={shortid.generate()} className="row align-items-center">
                <div className="col">{k}</div>
                
                <Button className="col-1 " 
          variant="outlined" disabled={cart[k]?cart[k]>4?true:false:false}
          onClick={()=>dispatch(add(k,cart[k+"Price"]))}
          >+</Button>
          <div className="col-1" style={{paddingTop:"7px",textAlign:"center"}} >{cart[k]?cart[k]:0}</div>
          <Button className="col-1 " variant="outlined" 
          disabled={cart[k]?cart[k]===0?true:false:true}
          onClick={()=>dispatch(remove(k))}
          >-</Button>
          <div className="col-auto">{"\u20B9 "+(cart[k]*cart[k+"Price"])}</div>
                </div>
              }
               )}
               </div>

              {(total>0)?
              <div>
                 <hr style={{margin:"10px 2px"}}></hr>
               <div className="row">
                 <div className="col">Item total</div>
                 <div className="col-auto">{"\u20B9 "+total}</div>
               </div>
               <div className="row">
                 <div className="col">Taxes</div>
                 <div className="col-auto" style={{textAlign:"left"}}>{"\u20B9 "+total*(0.05)}</div>
               </div>
               <div className="row">
                 <div className="col">Delivery</div>
                 <div className="col-auto" style={{textAlign:"left"}}>{"\u20B9 60"}</div>
               </div>
               <hr style={{margin:"10px 2px"}}></hr>
               <div className="row">
                 <div className="col">To pay</div>
                 <div className="col-auto" style={{textAlign:"left"}}>{"\u20B9 "+(total+total*(0.05)+60)}</div>
               </div>
              </div>:null
              }
            </div>
        <div className="col-12 col-md-6">
        <Select value={paymode} onChange={(event)=>setPayMode(event.target.value)} placeholder="Select payment mode">
  <option value="Card">Card</option>
  <option value="Cash on delivery">Cash on delivery</option>
  <option value="UPI">UPI</option>
</Select>
{paymode==="Card"?Card():paymode==="Cash on delivery"?COD():UPI()}
        </div>
        </div>
        <hr style={{margin:"10px 2px"}}></hr>
        <div className="row" style={{marginTop:"20px",color:"#9A9DA2"}}>
        <div className="col-12 col-md-6" >
                <div className="row" >
                    <div className="col-12" style={{marginTop:"10px"}}>
                    <FormControl isRequired>
                <FormLabel>Primary phone number</FormLabel>
                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents="none"
                                    children={<PhoneIcon color="gray.300" />}
                                    />
                                    <Input readOnly disabled value={user.user.phoneNumber} type="tel" placeholder="Phone number" />
                                </InputGroup>
                </FormControl>
                    </div>
                    <div className="col-12" style={{marginTop:"10px"}} >
                    <FormControl >
                <FormLabel>Alternate Phone number</FormLabel>
                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents="none"
                                    children={"+91"}
                                    />
                                    <Input
                                    
                                    value={alternatePhone}
                                    onChange={(event)=>{
                                        if(event.target.value.length<=10)
                                        setAlternatePhone(event.target.value)
                                    }}
                                    type="number" placeholder="Alternate Phone number" />
                                </InputGroup>
                </FormControl>
                                
                    </div>

                    
                    <div className="col-12" style={{marginTop:"10px"}}>
                    <FormControl >
                <FormLabel>Delivery instructions</FormLabel>
                <Textarea
        value={deliveryInstructions}
        onChange={(event)=>setDeliveryInstructions(event.target.value)}
        placeholder="Enter any delivery instructions"
        size="xs"
      />
     
                </FormControl>
                    
                    </div>
                </div>
        </div>
            <div className="col-12 col-md-6">
              <FormControl isRequired isInvalid={error['address']}>
                <FormLabel>Address</FormLabel>
                <Textarea
            
          value={address}
          onChange={(event)=>setAddress(event.target.value)}
          placeholder="Enter address"
          size="xs"
                    />
                                    <FormErrorMessage>{error['address']}</FormErrorMessage>

              </FormControl>

              <FormControl isRequired isInvalid={error['pincode']}>
                <FormLabel>Pin Code</FormLabel>
                <Input type="number" value={pincode} onChange={(event)=>setPinCode(event.target.value)} ></Input>
                <FormErrorMessage>{error['pincode']}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={error['email']}>
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents="none"
                                    children={<EmailIcon color="gray.300" />}
                                    />
                                    <Input
                                    isRequired
                                    value={email}
                                    onChange={(event)=>{
                                        
                                        setEmail(event.target.value)
                                    }}
                                    type="email" placeholder="Email address" />
                                </InputGroup>
                                <FormErrorMessage>{error['email']}</FormErrorMessage>
                </FormControl>
                <Checkbox style={{margin:"10px 5px"}} 
                    checked={acceptterms}
                    onChange={(event)=>setAcceptterms(event.target.checked)}
                    ><small>I have read and agree to the 
                      <span style={{color:"#4FD1C5"}}> terms and conditions</span > and <span style={{color:"#4FD1C5"}}>data policy</span> </small></Checkbox>
              
     
      
    
            </div>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-auto">
            <Button 
            onClick={()=>placeOrder()}
            disabled={error['email']||error['address']||error['pincode']||(email==="")||(pincode==="")||address==="" || !acceptterms}

            style={{marginLeft:"auto"}}>Confirm and pay</Button>
            </div>
        </div>
    </div>
      }
      else{
        return <div className="container" style={{paddingTop:"20px"}}>
          {done()}
          <h1 className="display-3"> Empty cart :(</h1>
            <h1 className="display-4" style={{color:"#9A9DA2"}}> Add items to your cart and come back</h1>
        </div>
      }
    }
    else
    return <div className="container" style={{marginTop:"20px"}}>
    <Skeleton height="200px"></Skeleton>
    <SkeletonText></SkeletonText>
    <br/>
    <SkeletonText></SkeletonText>
    </div>
}
export default withRouter(Payment)
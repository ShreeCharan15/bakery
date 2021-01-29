import { Button, useDisclosure,Drawer,DrawerOverlay,DrawerContent 
    ,DrawerCloseButton,DrawerHeader,DrawerBody,DrawerFooter, Badge} from "@chakra-ui/react"
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import shortid from "shortid"
import { add, clearCart, remove } from "./redux/ActionCreator"
import firebase from './firebase'

function Cart() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const dispatch=useDispatch();
    const cart=useSelector((state)=>state.cart)
    let total=0;
    let totno=0;
    Object.keys(cart).forEach((k)=>{
      if(!k.endsWith("Price"))
      {
        total+=cart[k]*cart[k+"Price"]
        totno+=cart[k]
      }
     
    })
    return (
      <>
        <Button ref={btnRef} colorScheme="cyan900" color="Cart"  onClick={onOpen}>
         Cart
          <Badge variant="solid" style={{borderRadius:"50%",marginBottom:"20px"}} colorScheme="purple">
    {totno}
  </Badge>
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Cart<hr style={{margin:"5px 0px"}}></hr></DrawerHeader>
  
              <DrawerBody>
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

              <Button style={{marginTop:"50px",width:"100%"}} onClick={()=>{
                dispatch(clearCart())
              }}>Clear Cart</Button>
              </DrawerBody>
  
              <DrawerFooter>
                
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button color="blue" disabled={!firebase.auth().currentUser}>{!firebase.auth().currentUser?"Login to proceed":"Proceed to pay"}</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    )
  }
  export default Cart;
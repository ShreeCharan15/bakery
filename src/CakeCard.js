import { Button } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap"
import { add, remove } from "./redux/ActionCreator";

export const CakeCard=({item})=>{
  const dispatch=useDispatch();
  const cart=useSelector((state)=>state.cart)
  
    return <div style={{height:"100%"}}>
        <Card style={{backgroundColor:"#2D3748",height:"100%"}}>
        <CardImg  style={{height:"200px"}} top width="100%" src={item.image} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{item.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{"\u20B9 "+item.price}</CardSubtitle>
          <CardText style={{color:"#9A9DA2"}}><small>{item.desc}</small></CardText>
         
         
        </CardBody>
        <CardFooter style={{color:"#9A9DA2"}}>
          <div className="row">
          <div className="col"></div>
          <Button className="col-2 col-md-1" 
          variant="outlined" disabled={cart[item.name]?cart[item.name]>4?true:false:false}
          onClick={()=>dispatch(add(item.name,item.price))}
          >+</Button>
          <div className="col-2 col-md-1" style={{paddingTop:"7px",textAlign:"center"}} >{cart[item.name]?cart[item.name]:0}</div>
          <Button className="col-2 col-md-1" variant="outlined" 
          disabled={cart[item.name]?cart[item.name]===0?true:false:true}
          onClick={()=>dispatch(remove(item.name))}
          >-</Button>
          </div>
          </CardFooter>
      </Card>
    </div>
}
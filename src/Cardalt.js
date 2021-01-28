import { Badge } from "@chakra-ui/react"
import {  withRouter } from "react-router-dom"
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap"

 const CardAlt=(props)=>{
    const item=props.item
    return <Card onClick={()=>{
        props.history.push("/"+props.type+"/"+item.name)
    }} style={{backgroundColor:"#2D3748",height:"100%"}}>
        <Badge variant="subtle" 
        colorScheme={item.tag==="bestseller"?"red"
        :item.tag==="new"?"green"
        :"purple"}>
            {item.tag}</Badge>
    <CardImg  style={{height:"100px"}} top width="100%" src={item.image} alt="Card image cap" />
    
    <CardBody>
      <CardTitle tag="h5">{item.name}</CardTitle>
      <CardSubtitle tag="h6" className="mb-2 text-muted">{"\u20B9 "+item.price}</CardSubtitle>
      <CardText style={{color:"#9A9DA2"}}><small>{item.description}</small></CardText>
     
     
    </CardBody>
  </Card>
}
export default withRouter(CardAlt)
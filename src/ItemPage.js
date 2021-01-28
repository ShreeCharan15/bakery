import { Badge, Button, Skeleton, SkeletonText } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import shortid from "shortid"
import Cardalt from "./Cardalt"
import { add, getCakes, getCookies, remove } from "./redux/ActionCreator"
import { Card, CardBody, CardFooter} from "reactstrap"

export const ItemPage=(props)=>{
    let a=useParams();
    let p=useLocation().pathname.split("/")[1]
    const dispatch=useDispatch();

    let items=useSelector(state=>state[props.type])
    useEffect(() => {
        if(!items.loading && !items.items && !items.error)
        {
            if(p==="cookies")
            dispatch(getCookies())
            else if(p==="cakes")
            dispatch(getCakes())
            
        }
      }, [items]);
     
      let cart=useSelector(state=>state.cart)
    if(items.items)
    { let item=items.items.filter((v)=>v.name===(a.itemName))[0]
        let sug=items.items.filter((v)=>v.name!==(a.itemName))
        return <div className="container">
       
        <div className="row justify-content-center" style={{marginTop:"30px"}}>
            <div className="col-12 col-md-4">
            <img style={{maxHeight:"300px",borderRadius:"20px"}} width="100%" className="img-fluid"  src={item.image} alt="ima"></img>
            </div>
            <div className="col" >
             <div className="row" style={{height:'100%'}}>
             <Badge style={{margin:"10px"}} variant="subtle" 
        colorScheme={item.tag==="bestseller"?"red"
        :item.tag==="new"?"green"
        :"purple"}>
            {item.tag}</Badge>
             <h1 className="display-4 col-12 align-self-start" style={{margin:"10px",fontSize:"30px"}}> {item.name}</h1>
            <h1 className="display-4 col-12 align-self-start" style={{margin:"10px",fontSize:"25px",color:"#9A9DA2"}}> {"\u20B9 "+item.price}</h1>
           <br/>
            <h1 className=" col-12 align-self-end" style={{margin:"10px",marginTop:"auto",fontSize:"20px",color:"#9A9DA2"}}> {item.desc}</h1>
           
            <div className="row " style={{margin:"10px",marginTop:"30px"}} >
         
           <Button className="col-2 col-md-1 " 
 
           variant="outlined" disabled={cart[item.name]?cart[item.name]>4?true:false:false}
           onClick={()=>dispatch(add(item.name,item.price))}
           >+</Button>
           <div className="col-2 col-md-1" style={{paddingTop:"7px",textAlign:"center"}} >{cart[item.name]?cart[item.name]:0}</div>
           <Button className="col-2 col-md-1" variant="outlined" 
           disabled={cart[item.name]?cart[item.name]===0?true:false:true}
           onClick={()=>dispatch(remove(item.name))}
           >-</Button>
           </div>
 
             </div>
            </div>
        </div>
        <h1 className="display-4" style={{marginTop:"50px",color: "#9A9DA2",fontSize:"25px"}}>Also check out</h1>
        <div className="row ">
        {sug.map((item,index)=><div key={shortid.generate()} className="col-6 col-md-2" style={{margin:"5px 0px"}}>
                 <Cardalt type={props.type} item={item}></Cardalt>
             </div>)}
        </div>
     </div>
    }
    else if(items.error)
    return <div>ERROR</div>
    else {
        let a=[1,2,3,4,5,8]
        return <div className="container" style={{marginTop:"20px"}}>
        <Skeleton height="200px" style={{borderRadius:"20px"}}></Skeleton>
        <br/>
        <SkeletonText></SkeletonText>
        <h1 className="display-4" style={{marginTop:"50px",color: "#9A9DA2",fontSize:"25px"}}>Also check out</h1>
        <div className="row">
        {a.map((v)=>
        <div key={shortid.generate()} className="col-6 col-md-2" style={{margin:"10px 0px"}}>
            <Card style={{backgroundColor:"#2D3748"}}>
        
        <div style={{height:"100px",backgroundColor: "#1B212D"}}></div>
        <CardBody>
          <SkeletonText></SkeletonText>
          
          
         
         
        </CardBody>
        <CardFooter style={{color:"#9A9DA2"}}>
          
          </CardFooter>
      </Card>
            </div>
        )}
        </div>
    </div>}

}
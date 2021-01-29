import  CardAlt  from "./Cardalt"
import shortid from "shortid"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {  getOthers } from "./redux/ActionCreator"
import { Card, CardBody, CardFooter} from "reactstrap"
import { SkeletonText } from "@chakra-ui/react"
export const Others=(props)=>{
    const dispatch=useDispatch();
    const others=useSelector((state)=>state.others)
    useEffect(() => {
        if(!others.loading && !others.items && !others.error)
        dispatch(getOthers())
      }, [others]);
    return <div className="container">
    <h1 className="display-4" style={{margin:"10px",color: "#2D3748"}}>Others</h1>
   {ite(others,"others")}
</div>
}
const ite=(others,type)=>{
    if(others.error)
      return <div>error</div>
      else if (others.items)
    return <div className="row justify-content-start">
        {others.items.map((item,index)=><div key={shortid.generate()} className="col-6 col-md-2" style={{margin:"10px 0px"}}>
    <CardAlt type={type} item={item}></CardAlt>
</div>)}
    </div>
    else {
        let a=[1,2,3,4,5,6,7]
        return <div className="row justify-content-start" >
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
    }
}
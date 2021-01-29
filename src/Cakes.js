import  CardAlt from "./Cardalt"
import shortid from "shortid"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getCakes } from "./redux/ActionCreator"
import { Card, CardBody, CardFooter } from "reactstrap"
import { SkeletonText } from "@chakra-ui/react"

export const Cakes=(props)=>{
    const dispatch=useDispatch();
    const cakes=useSelector((state)=>state.cakes)
    useEffect(() => {
        if(!cakes.loading && !cakes.items && !cakes.error)
        dispatch(getCakes())
      }, [cakes]);
    return <div className="container">
        <h1 className="display-4" style={{margin:"10px",color: "#2D3748"}}>Cakes</h1>
       {ite(cakes,"cakes")}
    </div>
}

const ite=(cakes,type)=>{
    if(cakes.error)
      return <div>error</div>
      else if (cakes.items)
    return <div className="row justify-content-start">
        {cakes.items.map((item,index)=><div key={shortid.generate()}  className="col-6 col-md-2" style={{margin:"10px 0px"}}>
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
import  CardAlt  from "./Cardalt"
import shortid from "shortid"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getCookies } from "./redux/ActionCreator"
import { Card, CardBody, CardFooter } from "reactstrap"
import { SkeletonText } from "@chakra-ui/react"
export const Cookies=(props)=>{
    const dispatch=useDispatch();
    const cookies=useSelector((state)=>state.cookies)
    useEffect(() => {
        if(!cookies.loading && !cookies.items && !cookies.error)
        dispatch(getCookies())
      }, [cookies]);
    return <div className="container">
    <h1 className="display-4" style={{margin:"10px",color: "#2D3748"}}>Cookies</h1>
   {ite(cookies,"cookies")}
</div>
}
const ite=(cookies,type)=>{
    if(cookies.error)
      return <div>error</div>
      else if (cookies.items)
    return <div className="row justify-content-start">
        {cookies.items.map((item,index)=><div key={shortid.generate()} className="col-6 col-md-2" style={{margin:"10px 0px"}}>
    <CardAlt type={type} item={item}></CardAlt>
</div>)}
    </div>
    else {
        let a=[1,2,3,4,5,6]
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
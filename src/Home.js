import shortid from "shortid"
import { CakeCard } from "./CakeCard"
import { useDispatch, useSelector } from "react-redux"
import { getHome } from "./redux/ActionCreator"
import { useEffect } from "react"
import {  Card, CardBody, CardFooter } from "reactstrap"
import { SkeletonText } from "@chakra-ui/react"

export const Home=(props)=>{
    const dispatch=useDispatch();
    const home=useSelector((state)=>state.home)
    useEffect(() => {
        if(!home.loading && !home.items && !home.error)
        dispatch(getHome())
      }, [home]);
      
    return <div>
        <div className="jumbotron" style={{marginBottom: "50px",backgroundColor: "#1B212D",paddingTop:"10px"}}>
           <div className="container ">
            <div className="row justify-content-center">
                <div className="col-auto" style={{textAlign: "center",}}>
                    <h1 className="display-2" style={{fontWeight: "400",color: "#4FD1C5"}}>Cake O Clock</h1>
            <p className="display-4" style={{color: "#9A9DA2",fontSize: "25px",marginTop:"10px"}}>The best blah blah blah blah.</p>
           </div>
                </div>
            </div>
          </div>
        <div className="container">
           
                {ite(home)}
        </div>
    </div>
    
}
const ite=(home)=>{
    if(home.error)
      return <div>error</div>
      else if (home.items)
    return <div className="row justify-content-center">
        {home.items.map((item,index)=><div key={shortid.generate()} className="col-12 col-md-3" style={{margin:"5px"}}>
    <CakeCard item={item}></CakeCard>
</div>)}
    </div>
    else {
        let a=[1,2,3,4,5,6,7,8]
        return <div className="row justify-content-center" >
        {a.map((v)=>
        <div key={shortid.generate()} className="col-12 col-md-3" style={{margin:"5px"}}>
            <Card style={{backgroundColor:"#2D3748"}}>
        
        <div style={{height:"200px",backgroundColor: "#1B212D"}}></div>
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

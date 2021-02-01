import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {  getOrders } from "./redux/ActionCreator"
import {  Skeleton, SkeletonText } from "@chakra-ui/react"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from "@chakra-ui/react"
  import { Progress } from "@chakra-ui/react"
import { withRouter } from "react-router-dom"
import shortid from "shortid"
 const Orders=(props)=>{
    const dispatch=useDispatch();
    const orders=useSelector((state)=>state.orders)
    const user=useSelector((state)=>state.user)
    function msToTime(duration) {
       let minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
    
      return [hours,minutes];
    }
   
    const it=(item)=>{
      let d= null
      if(item.time)
      d=new Date(item.time)

      let tt=item.time+43200000-Date.now()
      
      let hl=msToTime(tt)[0]
      let ml=msToTime(tt)[1]

      let tot=0;
      Object.keys(item.items).filter((v)=>!v.endsWith("Price"))
      .forEach((it)=>{
        tot=item.items[it+"Price"]*item.items[it]
      })
        return <AccordionItem key={shortid.generate()}>
    <AccordionButton>
     <div className="row justify-content-start" style={{width:"100%"}}>
         <div className="col-12 col-md" style={{textAlign:"start"}}>
            Order Id : {item.time}
         </div>
         <div className="col-12 col-md-auto" style={{textAlign:"start"}}>
            {"\u20B9 "+(tot+tot*(0.05)+60)}
         </div>
         
         <div className="col-12 " style={{textAlign:"start",color: "#9A9DA2"}}>
            {d?(d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() +", "+(d.getHours()%12)+":"+d.getMinutes()+" "+(d.getHours()>12?"PM":"AM")):""}
         </div>
         <div className="col-12" >
         <AccordionIcon />
         </div>
     </div>
      
    </AccordionButton>
    <AccordionPanel pb={4} style={{color: "#9A9DA2"}}>
     {Object.keys(item.items).filter((v)=>!v.endsWith("Price")).map((it)=>
      <div key={shortid.generate()} className="row">
        <div className="col">{it}</div>
        <div className="col-auto">x {item.items[it]}</div>
        <div className="col-auto">{"\u20B9 "+item.items[it+"Price"]*item.items[it]}</div>
      </div>
     )}
     <div className="row">
        <div className="col">Taxes</div>
        <div className="col-auto">{"\u20B9 "+tot*(0.05)}</div>
      </div>
      <div className="row">
        <div className="col">Delivery</div>
        <div className="col-auto">{"\u20B9 60"}</div>
      </div>
      <br/>
     {
       tt>0? <>
       <Progress value={Math.floor(100-((hl/12)*100))} size="xs" colorScheme="pink"/>
       <p style={{marginTop:"5px",color: "#9A9DA2"}}>Will be delivered within {hl+" hours, "+ml+" mins"}</p>
       </>
       :<p style={{marginTop:"5px",color: "#9A9DA2"}}>Ordered delivered!</p>
     }
    </AccordionPanel>
  </AccordionItem>
    }
    useEffect(() => {
        if(!user.loading && user.user)
        {
        
        dispatch(getOrders(user.user.uid))
        }else if(!user.loading && !user.user && !user.error)
        {
          props.history.goBack()
        }
      }, [user]);
      if(user.error || orders.error)
      return <div className="container" style={{paddingTop:"20px"}}>
       Error
    </div>
      else if(user.user && orders.items)
    return <div className="container" style={{paddingTop:"20px",paddingBottom:"20px"}}>
      <Accordion defaultIndex={[]} allowMultiple>
      {orders.items.map((item)=>it(item))}
      </Accordion>
       
    </div>
    else return <div className="container" style={{paddingTop:"20px"}}>
    <Skeleton height="100px"></Skeleton>
    <SkeletonText></SkeletonText>
    <br/>
    <Skeleton height="100px"></Skeleton>
    <SkeletonText></SkeletonText>
</div>
}
export default withRouter(Orders)
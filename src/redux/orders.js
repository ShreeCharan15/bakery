export const Orders=(state={
    loading:false,error:null,items:null,
}, action)=>{
    switch(action.type){
        case "ORDERSLOADING":
           return {...state,loading:true,error:null,items:null}
            
        case "ORDERSERROR":
            return {...state,loading:false,error:action.err,items:null}
        
        case "ADDORDERS":
            return {...state,loading:false,error:null,items:action.items}
        default:
            return state;
    }
}
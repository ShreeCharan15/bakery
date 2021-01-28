export const Others=(state={
    loading:false,error:null,items:null,
}, action)=>{
    switch(action.type){
        case "OTHERSLOADING":
           return {...state,loading:true,error:null,items:null}
            
        case "OTHERSERROR":
            return {...state,loading:false,error:action.err,items:null}
        
        case "ADDOTHERS":
            return {...state,loading:false,error:null,items:action.items}
        default:
            return state;
    }
}
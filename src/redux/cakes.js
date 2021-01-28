export const Cakes=(state={
    loading:false,error:null,items:null,
}, action)=>{
    switch(action.type){
        case "CAKESLOADING":
           return {...state,loading:true,error:null,items:null}
            
        case "CAKESERROR":
            return {...state,loading:false,error:action.err,items:null}
        
        case "ADDCAKES":
            return {...state,loading:false,error:null,items:action.items}
        default:
            return state;
    }
}
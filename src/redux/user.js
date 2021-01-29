
export const User=(state={
    loading:true,error:null,user:null,
}, action)=>{
    switch(action.type){
        case "USERSLOADING":
           return {...state,loading:true,error:null,user:null}
            
        case "USERSERROR":
            return {...state,loading:false,error:action.err,user:null}
        
        case "ADDUSERS":
            return {...state,loading:false,error:null,user:action.items}
        default:
            return state;
    }
}
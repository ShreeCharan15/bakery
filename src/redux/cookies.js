export const Cookies=(state={
    loading:false,error:null,items:null,
}, action)=>{
    switch(action.type){
        case "COOKIESLOADING":
           return {...state,loading:true,error:null,items:null}
            
        case "COOKIESERROR":
            return {...state,loading:false,error:action.err,items:null}
        
        case "ADDCOOKIES":
            return {...state,loading:false,error:null,items:action.items}
        default:
            return state;
    }
}
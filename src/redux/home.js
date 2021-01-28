export const Home=(state={
    loading:false,error:null,items:null,
}, action)=>{
    switch(action.type){
        case "HOMELOADING":
           return {...state,loading:true,error:null,items:null}
            
        case "HOMEERROR":
            return {...state,loading:false,error:action.err,items:null}
        
        case "ADDHOME":
            return {...state,loading:false,error:null,items:action.items}
        default:
            return state;
    }
}
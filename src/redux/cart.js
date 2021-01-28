
export const Cart=(state={
    
}, action)=>{
    switch(action.type){
        case "ADD":
            if(state[action.item])
            {
                let s={...state,[action.item]:state[action.item]+1, };
                localStorage.setItem("cart",JSON.stringify(s))
                return s
            }
            else
             {
                let s= {...state, [action.item]:1,[action.item+"Price"]:action.price};
                localStorage.setItem("cart",JSON.stringify(s))
                return s
            }
            
        case "REMOVE":
            if(state[action.item])
            {   if(state[action.item]>1)
                {
                    let s={...state,[action.item]:state[action.item]-1 };
                    localStorage.setItem("cart",JSON.stringify(s))
                    return s
                }
                else
                {
                    let s={...state}
                    delete s[action.item]
                    delete s[action.item+"Price"]
                    localStorage.setItem("cart",JSON.stringify(s))
                    return s;
                }
            }
            else
            return {...state};
        
        case "INIT":
            return {...action.item}
        case "CLEAR":
            return {}
        default:
            return state;
    }
}
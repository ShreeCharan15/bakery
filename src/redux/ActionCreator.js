import firebase from '../firebase'
export const add=(item,price)=>(dispatch)=>{
    dispatch(addItem(item,price))
}
export const remove=(item)=>(dispatch)=>{
    dispatch(removeItem(item))
}
export const addItem=(item,price)=>({
    type:"ADD",
    item:item,
    price:price
});

export const removeItem=(item)=>({
    type:"REMOVE",
    item:item
});

export const initCart=()=>(dispatch)=>{
    let c=localStorage.getItem("cart")
            if(c)
            {
                let s={}
              c=JSON.parse(c)
              Object.keys(c).forEach((val)=>{
                if(!val.endsWith("Price")){
                   s[val]=parseInt(c[val])
                   s[val+"Price"]=parseInt(c[val+"Price"])
                }
              })
            dispatch(init(s))
            }else
            dispatch(init({}))
}

export const clearCart=()=>(dispatch)=>{
    localStorage.removeItem("cart")
    dispatch(clear())
}
export const init=(item)=>({
    type:"INIT",
    item:item,
});
export const clear=()=>({
    type:"CLEAR",
});

const rand=(j,n)=>{
    let r=[]
    for(let i=0;i<n;i++)
    r.push((Math.floor(Math.random() * j) + 1))
   return  r 
}

export const getHome=()=>(dispatch)=>{
    dispatch(homeLoading())
    let h=[]
    firebase.firestore().collection("Cakes").where('index', 'in', rand(7,3)).limit(3).get()
    .then((cakes)=>{
        let c=cakes.docs.map((ck)=>ck.data())
        h=[...c]
        firebase.firestore().collection("Cookies").where('index', 'in', rand(6,3)).limit(3).get()
    .then((cookies)=>{
        let c=cookies.docs.map((ck)=>ck.data())
        h=[...h,...c]
        firebase.firestore().collection("Others").where('index', 'in', rand(7,3)).limit(3).get()
        .then((others)=>{
            let c=others.docs.map((ck)=>ck.data())
            h=[...h,...c]
            dispatch(addHome(h))
        }).catch((err)=>{
            dispatch(homeFailed(err))
        })
    }).catch((err)=>{
        dispatch(homeFailed(err))
    })
    })
    .catch((err)=>{
        dispatch(homeFailed(err))
    })
}

export const addHome=(items)=>({
    type:"ADDHOME",
    items:items
});
export const homeLoading=()=>({
    type:"HOMELOADING"
});
export const homeFailed=(errmess)=>({
    type:"HOMEERROR",
    err: errmess
});


export const getCookies=()=>(dispatch)=>{
    dispatch(cookiesLoading());
    firebase.firestore().collection("Cookies").get().then((cookies)=>{
        dispatch(addCookies(cookies.docs.map((d)=>d.data())))
    }).catch((err)=>{
        dispatch(cookiesFailed(err))
    })
}

export const addCookies=(items)=>({
    type:"ADDCOOKIES",
    items:items
});
export const cookiesLoading=()=>({
    type:"COOKIESLOADING"
});
export const cookiesFailed=(errmess)=>({
    type:"COOKIESERROR",
    err: errmess
});


export const getCakes=()=>(dispatch)=>{
    dispatch(cakesLoading());
    firebase.firestore().collection("Cakes").get().then((cakes)=>{
        dispatch(addCakes(cakes.docs.map((d)=>d.data())))
    }).catch((err)=>{
        dispatch(cakesFailed(err))
    })
}

export const addCakes=(items)=>({
    type:"ADDCAKES",
    items:items
});
export const cakesLoading=()=>({
    type:"CAKESLOADING"
});
export const cakesFailed=(errmess)=>({
    type:"CAKESERROR",
    err: errmess
});







export const getOthers=()=>(dispatch)=>{
    dispatch(othersLoading());
    firebase.firestore().collection("Others").get().then((others)=>{
        dispatch(addOthers(others.docs.map((d)=>d.data())))
    }).catch((err)=>{
        dispatch(othersFailed(err))
    })
}

export const addOthers=(items)=>({
    type:"ADDOTHERS",
    items:items
});
export const othersLoading=()=>({
    type:"OTHERSLOADING"
});
export const othersFailed=(errmess)=>({
    type:"OTHERSERROR",
    err: errmess
});
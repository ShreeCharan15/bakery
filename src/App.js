import './App.css';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Home } from './Home';
import { Cookies } from './Cookies';
import { useDispatch } from "react-redux"

import { Cakes } from './Cakes';
import { Others } from './Others';

import { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,Collapse } from 'reactstrap';
import { useEffect } from 'react';
import  Cart  from './Cart';
import { initCart } from './redux/ActionCreator';
import { ItemPage } from './ItemPage';
import Login from './Login';

function App() {
  const dispatch=useDispatch();
  dispatch(initCart());
  const HomePage=()=><>
  <Header></Header>
  <Home></Home>
  </>
  const CakePage=()=><>
  <Header></Header>
  <Cakes></Cakes>
  </>
  const CookiePage=()=><>
  <Header></Header>
  <Cookies></Cookies>
  </>

const ItemPagePage=(type)=>()=><>
<Header></Header>
<ItemPage type={type}></ItemPage>
</>

const OthersPage=()=><>
<Header></Header>
<Others ></Others>
</>
  return (
    <div className="App" style={{backgroundColor:"#171923",color:"whitesmoke",minHeight:"100vh"}}>
      
      <div  style={{paddingTop:"57px"}}>
        <Switch>
          <Route exact path="/home" component={HomePage}></Route>
          <Route exact path="/cookies" component={CookiePage}></Route>
          <Route exact path="/cakes" component={CakePage}></Route>
          <Route exact path="/others" component={OthersPage}></Route>
          <Route path="/cakes/:itemName" component={ItemPagePage("cakes")}></Route>
          <Route path="/cookies/:itemName" component={ItemPagePage("cookies")}></Route>
          <Route path="/others/:itemName" component={ItemPagePage("others")}></Route>
          <Redirect to="/home"/>;
        </Switch>
      </div>
    </div>
  );
}
const Header=()=>{
  let p=useLocation().pathname.split('/')[1];
  
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const [show, setShow] = useState(false);
  useEffect(() => {
    if(p!=="home")
    setShow(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if(currentScrollY>100 && !show)
      {
        setShow(true)
      }
      else if(currentScrollY<100 && show)
      {
        if(p==="home")
        setShow(false)
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [show]);
  return (
    
    <div>
      <Navbar fixed="top" dark style={{backgroundColor:"#1B212D"}} expand="md">
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand href="/https://cakeclock.herokuapp.com/home" className={"mr-auto"+(show?" d-block":" d-none")}>
          <h1 style={{fontWeight: "400",color:" #4FD1C5",fontSize: "30px"}}>Cake O Clock</h1>
        </NavbarBrand>
        
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar style={{marginLeft:"auto"}}>
            <NavItem>
              <Link className="nav-link" to="/cookies">Cookies</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" to="/cakes">Cakes</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" to="/others">Others</Link>
            </NavItem>
          </Nav>
        </Collapse>
        <Cart></Cart>
        <Login></Login>
      </Navbar>
      
    </div>
  );
  
  
  
  
}

export default App;

import React from 'react';
import Navbar from './components/Navbar';
import Home from "./views/Home";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Signup from "./views/Signup";
import Store from "./views/Store";

function App() {

    let component;
    
    switch (window.location.pathname){
        case "/":
            component = <Home />
            break
        case "/login":
            component = <Login />
            break
        case "/logout":
            component = <Logout />
            break
        case "/signup":
            component = <Signup />
            break
        case "/store":
            component = <Store />
            break
        default:
            component = <Home />
    }
    return (
        <>
            <Navbar />
            <div className="component">
                {component}
            </div>
       </>
        )
}

export default App
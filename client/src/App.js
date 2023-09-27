import React from 'react';
import Navbar from './components/Navbar';
import Home from "./views/Home";

function App() {

    let component;
    
    switch (window.location.pathname){
        case "/":
            component = <Home />
            break
    }
    return (
        <>
            <Navbar />
            {component}
       </>
        )
}

export default App
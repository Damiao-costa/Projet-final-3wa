import React from "react";
import { useState,useRef } from "react";

const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const form = useRef(null);
  
    const formSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const res = await fetch('/signup', { 
            method: 'POST', 
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return (
        <>
            <form ref={form} onSubmit={formSubmit}>
                <h2>Log in</h2>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required onChange={e=>setEmail(e.target.value)}/>
                <div className="email error"></div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required onChange={e=>setPassword(e.target.value)}/>
                <div className="password error"></div>
                <button type="Submit">Log in</button>
            </form>
        </>
    );
}
export default App;
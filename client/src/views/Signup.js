import React from "react";
import { useState } from "react";

const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCom, setPasswordCom] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
  
    const formSubmit = async (e) => {
        e.preventDefault()

        setEmailError('');
        setPasswordError('');
        
        if(password === passwordCom)
        {
            try {
                const res = await fetch('/signup', { 
                method: 'POST', 
                body: JSON.stringify({ email, password }),
                headers: {'Content-Type': 'application/json'}
                });
                const data = await res.json();
                if(data.errors){
                    setEmailError(data.errors.email);
                    setPasswordError(data.errors.password);
                }else if(data.user){
                    window.location.pathname = '/';
                }          
                setEmail('');
                setPassword('');
                setPasswordCom('');
                
            }
            catch (err) {
                console.log(err);
            }
        }else{}
        
    }
    
    return (
        <>
            <form onSubmit={formSubmit}>
                <h2>Sign up</h2>
                <label htmlFor="email">Email</label>
                <input type="email" value={email} name="email" required onChange={e=>setEmail(e.target.value)}/>
                <h4 className="email error">{emailError}</h4>
                <label htmlFor="password">Password</label>
                <input type="password" autoComplete="on" name="password" value={password}  required onChange={e=>setPassword(e.target.value)}/>
                <h4 className="password error">{passwordError}</h4>
                <label htmlFor="passwordCom">Comfirm Password</label>
                <input type="password" autoComplete="on" value={passwordCom} name="passwordCom" required onChange={e=>setPasswordCom(e.target.value)}/>
                <h4 className="password error">{passwordError}</h4>
                <button type="Submit">Sign up</button>
            </form>
        </>
    );
}
export default App;
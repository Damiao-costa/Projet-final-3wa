import React from "react";

class App extends React.Component{

    render() {
        
        return (
            
            <div >
                <form>
                    <h2>Sign up</h2>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                    <div className="email error"></div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                    <div className="password error"></div>
                    <button>Sign up</button>
                </form>
            </div>
        );
        
    }
}
export default App;
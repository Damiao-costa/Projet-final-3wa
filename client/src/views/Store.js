import React from 'react';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={apiResponse: []}
    }
    callAPI(){
        fetch("http://127.0.0.1:5000/data")
            .then(res => res.json())
            .then(res => this.setState({apiResponse: res}))
              
    }

    componentDidMount()
    {
        this.callAPI();
    }
    
    render() {
        return (
            <div className="App">
                <h1>Here Is The Catalogue</h1>
                <ul className="catalogue">
                {this.state.apiResponse.map((object)=>{
                    let name = 
                    <li key={object.ListId} className='product'>Name: {object.Name} 
                        <br></br>Price: {object.Price}
                        <br></br>Stock: {object.Stock} 
                        <br></br>Description: {object.Description}
                    </li>
                return name;
                })}
                </ul>
            </div>
        );
    }
}
export default App;
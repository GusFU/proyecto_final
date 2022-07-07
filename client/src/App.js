
    import React, { Component } from "react";
    import { BrowserRouter ,Link } from "react-router-dom";
    import MainComponent from "./components/Main";
    import "./App.css"
    class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
                <div className="App">
                   <BrowserRouter>
                    
                    <MainComponent />
                    </BrowserRouter>
                </div>
            
        );
    }
    }
    export default App;

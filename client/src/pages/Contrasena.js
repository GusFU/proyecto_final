
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Componente funcional -> 
function Contrasena() {
    const [email, setEmail] = useState("");



    return (
        <div className="App">
            <header className="App-header">
                <div class="nav" >
                    <h1>facegus</h1>
                </div>

            </header>
            <div>
                <div>
                    <h2>Login</h2>
                    <label>Email
                        <input type="email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    
                    <p></p>
                    
                </div>
               
            </div>
            
        </div>
    );

}

export default Contrasena;




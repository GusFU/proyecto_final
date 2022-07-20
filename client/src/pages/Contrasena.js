
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Componente funcional -> 
function Contrasena() {
    const [email, setEmail] = useState("");
    const [resultado, setResultado] = useState("")
    const [link, setLink] = useState("");


    const verified = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        };
        fetch("confirmuser", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                setResultado(res)
                setLink(res.link)
                console.log(res.link)
            });



    }

    return (
        <div className="App">
            <header className="App-header">
                <div class="nav" >
                    <h1>facegus</h1>
                </div>

            </header>
            <div>
                <div>
                    <h2>Introduce tu email y te enviaremos un link para que puedas cambiar tu contraseña</h2>
                    <label>Email
                        <input type="email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <button onClick={() => verified()}>Enviar</button>
                    <p></p>

                </div>
              
            </div>

        </div>
    );

}

export default Contrasena;




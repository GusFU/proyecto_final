
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//Componente funcional -> 
function Cambiocontrasena() {
    const { email, token } = useParams()
    const [contrasena, setContrasena] = useState("")
    const [mensaje, setMensaje] = useState("")
    const cambiar = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, contrasena, token }),
        };
        fetch("/confirmuser1", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                setMensaje(res.message)


            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <div class="nav" >
                    <h1>facegus</h1>
                </div>

            </header>
            <div class="fondo1">
                <div class="fondo2">
                    
                        <label>Nueva contrasena
                            <input type="text" onChange={(e) => setContrasena(e.target.value)} />
                        </label>
                        <button onClick={() => cambiar()}>Enviar</button>
                        <p>{mensaje === "" ? "" : "Contraseña cambiadacierra esta ventana y haz login"}</p>
                    
                </div>

            </div>

        </div>
    );

}

export default Cambiocontrasena;




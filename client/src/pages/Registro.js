import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Registro() {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [cumpleanos, setCumpleanos] = useState("");
    const [alias, setAlias] = useState("");
    const [estado_civil, setEstado_civil] = useState("");
    const [pais, setPais] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [registrado, setRegistrado] = useState("");
    useEffect(() => {
       
        if (registrado === true) {
            localStorage.setItem("registrado",registrado)
    
    
          navigate('/');
        }
      }, [registrado]);

    const sendRegister = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, apellido1, apellido2, cumpleanos, alias, estado_civil, pais, email, contrasena })
        };
        fetch("register", requestOptions)
            .then((response) => response.json())
            .then((res) => setRegistrado(res.registro));

    };


    return (
        <div className="App">
            <header className="App-header">
                <div class="nav" >
                    <h1>facegus</h1>
                </div>

            </header>
            <p>{!registrado ? "El email ya esta registrado": registrado==="" ? "":""}</p>
            <label>Nombre
                <input type="nombre" onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label>Primer apellido
                <input type="apellido1" onChange={(e) => setApellido1(e.target.value)} />
            </label>
            <label>Segundo apellido
                <input type="apellido2" onChange={(e) => setApellido2(e.target.value)} />
            </label>
            <label>Cumpleaños
                <input type="cumpleanos" onChange={(e) => setCumpleanos(e.target.value)} />
            </label>
            <label>Alias
                <input type="alias" onChange={(e) => setAlias(e.target.value)} />
            </label>
            <label>Estado civil
                <input type="estado_civil" onChange={(e) => setEstado_civil(e.target.value)} />
            </label>
            <label>Pais
                <input type="pais" onChange={(e) => setPais(e.target.value)} />
            </label>
            <label>Email
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>Contraseña
                <input type="contrasena" onChange={(e) => setContrasena(e.target.value)} />
            </label>

           
            <button onClick={() => sendRegister()}>Registrate</button>
        </div>
    )

}

export default Registro;
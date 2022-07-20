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
        <div class="nav App-logo" >
          <h1 class="cuadrado">facegus</h1>
        </div>
      </header>
            <div class="fondo1">
                <div class="fondo2">
            <p>{registrado ? "": registrado==="" ? "":"El email ya esta registrado"}</p>
            <label>Nombre</label>
                <input type="text" onChange={(e) => setNombre(e.target.value)} />
            
            <label>Primer apellido</label>
                <input type="text" onChange={(e) => setApellido1(e.target.value)} />
            
            <label>Segundo apellido</label>
                <input type="text" onChange={(e) => setApellido2(e.target.value)} />
            
            <label>Cumpleaños</label>
                <input type={"date"} onChange={(e) => setCumpleanos(e.target.value)} />
            
            <label>Alias</label>
                <input type="text" onChange={(e) => setAlias(e.target.value)} />
            
            <label>Estado civil</label>
                <input type="text" onChange={(e) => setEstado_civil(e.target.value)} />
            
            <label>Pais</label>
                <input type="text" onChange={(e) => setPais(e.target.value)} />
            
            <label>Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
            
            <label>Contraseña</label>
                <input type="password" onChange={(e) => setContrasena(e.target.value)} />
            
            </div>
            </div>
           
            <button onClick={() => sendRegister()}>Registrate</button>
        </div>
    )

}

export default Registro;
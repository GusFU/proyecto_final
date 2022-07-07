
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Componente funcional -> 
function Principal() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loginOk, setLoginOk] = useState(2);
  const [token, setToken] = useState("")
  const [registrado, setRegistrado] = useState("")
  useEffect(() => {
   setRegistrado(localStorage.getItem("registrado"))
    }, []);



  useEffect(() => {
    if(token){
      localStorage.setItem("token",token)
    }
    if (loginOk == 1) {


      navigate('/profile');
    }
  }, [loginOk]);

  const sendLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contrasena }),
    };
    fetch("login", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        setToken(res.token)
        setLoginOk(res.loginOk)
      });
   





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
          <div>
            <span>{registrado ? "registrado correctamente":""}</span>
            <h2>Login</h2>
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <br></br>

            <label >Contraseña</label>
            <input type="password" onChange={(e) => setContrasena(e.target.value)} />

            <p> {loginOk == 1 ? "" : loginOk == 0 ? "Email o contraseña incorrectos" : ""}</p>
            <button onClick={() => sendLogin()}>Login</button>
          </div>
          <a href="./registro" id="nameD"><b>Registro</b></a>
          <div>
           <img  src={require(`../DSC06632.JPG`)}  /> 
            <p>Si has olvidado tu contraseña pincha <a href="./contrasena">aqui</a></p>
          </div>
        </div>

      </div>
    </div>
  );

}

export default Principal;




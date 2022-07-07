import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import List from "../components/List";


function Profile() {
    const navigate = useNavigate()
    const [token] = useState(localStorage.getItem("token"));
    const [mejores_fotos,setMejores_fotos]=useState("");
    const [cada_comentario,setCada_comentario]=useState("");
    const [nombres_comentarios,setNombres_comentarios]=useState("");

    useEffect(() => {
        if(token){
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token }),
                };
            fetch("profile", requestOptions)
            .then((response) => response.json())
            .then((res) => {
              setMejores_fotos(res.las10_fotos)
              setCada_comentario(res.cada_comentario)
              setNombres_comentarios(res.nombres_comentarios)
            });
        }
        
        if (!token) {
            navigate('/');
        }
    }, []);


console.log(mejores_fotos)

    return (
        <div className="App">
            <Header/>
            <div class="body">
            <div class="10fotos">
            {mejores_fotos ? <List items={mejores_fotos} />:""}
            </div>
            </div>
            
        </div>
    )

}

export default Profile;
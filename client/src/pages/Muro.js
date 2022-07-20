import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Mejores_fotos1 from "../components/Mejores_fotos1";
import Comentarios from "../components/Comentarios";
import Fotos from "../components/Fotos";

import { useParams } from "react-router-dom";


function Muro() {
    
    const { usuario} = useParams()
    const [usuario1] = useState(localStorage.getItem("usuario"));
    const [mejores_fotos, setMejores_fotos] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [fotosMuro, setFotosMuro] = useState("");
    const [subircomentario, setSubircomentario] = useState("");
   

    useEffect(() => {
        if (usuario) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario }),
            };
            fetch("/profile", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    setMejores_fotos(res.las10_fotos)
                    setComentarios(res.todo)
                    setFotosMuro(res.fotosMuro)
                    

                });

        } else {
           console.log("ok")
        }


    }, [usuario]);

    const sendComentario = () => {
        if (subircomentario != "") {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subircomentario, usuarioescrito: usuario1, usuariorecibido: usuario }),
            };
            fetch("/subircomentario", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    window.location.reload();
                });
        }

    };

   



    return (
        <React.StrictMode>
            <div className="App">
                <Header />
                
                <div className="body">

                    <Mejores_fotos1 name={mejores_fotos} />
                     <div class="container">
                        <div class="subir">
                            <div class="subircomentario">
                                <h2>
                                    Escribe un comentario para su muro
                                </h2>
                                <input type="text" onChange={(e) => setSubircomentario(e.target.value)} />
                                <button onClick={() => sendComentario()}>Enviar</button>
                            </div>
                           
                            
                        </div>
                        
                        <Comentarios name={comentarios} />
                        <h2 class="subircomentario">FOTOS</h2>
                        <Fotos fotos={fotosMuro} id1={usuario1}/>
                    </div> 
                </div>

            </div>
        </React.StrictMode>
    )

}

export default Muro;
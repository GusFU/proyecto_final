import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Mejores_fotos1 from "../components/Mejores_fotos1";
import Comentarios from "../components/Comentarios";
import Fotos from "../components/Fotos";
import Botonbuscaramigos from "../components/Botonbuscaramigos";
import Amigos from "../components/Amigos";

function Profile() {
    const navigate = useNavigate()
    const [usuario] = useState(localStorage.getItem("usuario"));
    const [mejores_fotos, setMejores_fotos] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [fotosMuro, setFotosMuro] = useState("");
    const [subircomentario, setSubircomentario] = useState("");
    const [images, setImages] = useState("");
    const [amigos, setAmigos] = useState("");
    

    useEffect(() => {
        if (usuario) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario }),
            };
            fetch("profile", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    setMejores_fotos(res.las10_fotos)
                    setComentarios(res.todo)
                    setFotosMuro(res.fotosMuro)
                    setAmigos(res.amigos)

                });

        } else {
            navigate('/');
        }


    }, [usuario]);

    const sendComentario = () => {
        if (subircomentario != "") {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subircomentario, usuarioescrito: usuario, usuariorecibido: usuario }),
            };
            fetch("subircomentario", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    window.location.reload();
                });
        }

    };

    const sendImage = () => {
        const formdata = new FormData();
        formdata.append("archivo", images);

        fetch("http://localhost:5000/files/post", {
            method: "POST",
            body: formdata,
        })


        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: images.name, usuario: usuario }),
        };
        fetch("subirfoto", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                window.location.reload();
            });
    }



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
                                    Escribe un comentario para tu muro
                                </h2>
                                <input type="text" onChange={(e) => setSubircomentario(e.target.value)} />
                                <button onClick={() => sendComentario()}>Enviar</button>
                            </div>
                            <div class="subircomentario">
                                <h2>
                                    Sube una imagen para tu muro
                                </h2>
                                <input type="file" name="file" accept="image/*" onChange={(e) => setImages(e.target.files[0])}></input>
                                <button onClick={() => sendImage()}>Enviar</button>
                            </div>
                            <div class="subircomentario">
                            <Botonbuscaramigos />
                            </div>
                        </div>
                        <div class="amigos">
                            <h2>tus amigos</h2>
                            <Amigos amigos={amigos}/>
                        </div>
                        <Comentarios name={comentarios} />
                        <div class="amigos">
                        <h2 >FOTOS</h2>
                        <Fotos fotos={fotosMuro} id1={usuario}/>
                        </div>
                    </div>
                </div>

            </div>
        </React.StrictMode>
    )

}

export default Profile;
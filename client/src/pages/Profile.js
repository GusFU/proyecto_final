import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Mejores_fotos1 from "../components/Mejores_fotos1";
import Comentarios from "../components/Comentarios";
import Fotos from "../components/Fotos";
import Botonbuscaramigos from "../components/Botonbuscaramigos";


function Profile() {
    const navigate = useNavigate()
    const [usuario] = useState(localStorage.getItem("usuario"));
    const [mejores_fotos, setMejores_fotos] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [fotosMuro, setFotosMuro] = useState("");
    const [subircomentario, setSubircomentario] = useState("");
    const [images, setImages] = useState("");

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
                        <div class="subircomentario">
                            <label>
                                Escribe un comentario para tu muro
                            </label>
                            <input type="text" onChange={(e) => setSubircomentario(e.target.value)} />
                            <button onClick={() => sendComentario()}>Enviar</button>
                            <p>
                                Sube una imagen para tu muro
                            </p>
                            <input type="file" name="file" accept="image/*" onChange={(e) => setImages(e.target.files[0])}></input>
                            <button onClick={() => sendImage()}>Enviar</button>
                            <Botonbuscaramigos/>
                        </div>
                        <Comentarios name={comentarios} />
                        <Fotos fotos={fotosMuro} />
                    </div>
                </div>

            </div>
        </React.StrictMode>
    )

}

export default Profile;
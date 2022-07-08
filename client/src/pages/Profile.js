import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Mejores_fotos1 from "../components/Mejores_fotos1";
import Comentarios from "../components/Comentarios";



function Profile() {
    const navigate = useNavigate()
    const [token] = useState(localStorage.getItem("token"));
    const [mejores_fotos, setMejores_fotos] = useState("");
    const [comentarios, setComentarios] = useState("");

    useEffect(() => {
        if (token) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            };
            fetch("profile", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    setMejores_fotos(res.las10_fotos)
                    setComentarios(res.comentarios)
                  
                });
        }

        if (!token) {
            navigate('/');
        }
    }, [token]);




    return (
        <React.StrictMode>
            <div className="App">
                <Header />
                <div className="body">
                    <Mejores_fotos1 name={mejores_fotos} />
                   
                </div>

            </div>
        </React.StrictMode>
    )

}

export default Profile;
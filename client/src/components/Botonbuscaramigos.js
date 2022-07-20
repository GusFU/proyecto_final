import React, { useState, useEffect } from "react";

function Botonbuscaramigos(props) {
    const [usuario] = useState(localStorage.getItem("usuario"));
    const [amigo, setAmigo] = useState("");
    const [infoamigo, setInfoamigo] = useState("");
    const [encontrado, setEncontrado] = useState("");
    const [ok, setOk] = useState("");

    const sendBuscar = () => {
        setOk("")
        if (amigo != "") {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, amigo }),
            };
            fetch("buscaramigo", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    setEncontrado(res.amigo)
                    if (res.amigo == 1) {
                        setInfoamigo(res.infoamigo)
                        
                    }

                });
        }
    }
    const hacerAmigo = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario:usuario, infoamigo:infoamigo }),
        };
        fetch("haceramigo", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                 setOk(res.ok)

            });

    }
    return (
        <div class="amigo">
            <h2>
                Escribe el email de tu amigo
            </h2>
            <input type="text" onChange={(e) => setAmigo(e.target.value)} />
            <button onClick={() => sendBuscar()}>Buscar amigo</button>
            <p>{encontrado === 1 ? `¿Quieres ser amigo de ${infoamigo.nombre}?` : encontrado === 0 ? "El email no corresponde a ningun usuario" : ""}</p>
            {encontrado === 1 ? <button onClick={() => hacerAmigo()}>!Si es mi amigo¡</button> : ""}
            <p>{ok==2?`Ya eras amigo de ${infoamigo.nombre}`:ok==1?`Te has heco amigo de ${infoamigo.nombre}`:""}</p>
        </div>

    )
}

export default Botonbuscaramigos;
import React, { useState, useEffect } from "react";

function Botonbuscaramigos(props) {
    const [usuario] = useState(localStorage.getItem("usuario"));
    const [amigo,setAmigo] = useState("");
    const [infoamigo,setInfoamigo] = useState("");
    const [encontrado,setEncontrado] = useState("");
    const sendBuscar = () => {
        if(amigo!=""){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario,amigo}),
        };
        fetch("buscaramigo", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                setEncontrado(res.amigo)
                if(requestOptions.amigo==1){
                    setInfoamigo(res.infoamigo)

                }

            });
    }
    }
const hacerAmigo = () => {

}
    return (
        <div>
            <label>
                Escribe el email de tu amigo
            </label>
            <input type="text" onChange={(e) => setAmigo(e.target.value)} />
            <button onClick={() => sendBuscar()}>Buscar amigo</button>
            <p>{encontrado ===1 ?`¿Quieres ser amigo de ${infoamigo.nombre}?`:encontrado===0?"El email no corresponde a ningun usuario":""}</p>
            {encontrado===1 ?<button onClick={() => hacerAmigo()}>!Si es mi amigo¡</button>:""}
        </div>

    )
}

export default Botonbuscaramigos;
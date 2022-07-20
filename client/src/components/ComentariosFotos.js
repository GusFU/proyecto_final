import React, { useState, useEffect } from "react";
function ComentariosFotos(props) {

    const [comentariof, setComentariof] = useState("");
    const [idFoto, setIdFoto] = useState(props.id);
    const [subircomentario, setSubircomentario] = useState("");
    const [usuario] = useState(localStorage.getItem("usuario"));
    useEffect(() => {


        if (idFoto) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_foto: idFoto }),
            };
            fetch("/comentfotos", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    setComentariof(res.comentariosf)
                    
                });
        }

        

    }, [idFoto]);
    const sendcomentario = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_foto: idFoto,comentario:subircomentario,usuario}),
        };
        fetch("/subircomentfotos", requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                
            });
    }
   

    return (
        <div class="comentf">
            <input type="text" onChange={(e) => setSubircomentario(e.target.value)} />
            <button onClick={() => sendcomentario()}>Comentar foto</button>
            <h2>comentarios</h2>
            {comentariof ==0? <p>NO HAY COMENTARIOS</p> : (comentariof).map(item => {

                return (

                    <p>{item.mensaje}</p>



                )
            })
            }
        </div>
    )

}
export default ComentariosFotos;
import React, { useState, useEffect } from "react";
function ComentariosFotos(props) {

    const [comentariof, setComentariof] = useState("");
    const [idFoto, setIdFoto] = useState(props.id);

    useEffect(() => {


        if (idFoto) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_foto: idFoto }),
            };
            fetch("comentfotos", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    setComentariof(res.comentariosf)
                    
                });
        }

        

    }, [idFoto]);
   

    return (
        <div class="comentf">
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
import React, { useState, useEffect } from "react";

function Comentarios(props) {

    return(
<div class="comentarios">
    
            {!props.name ? "" :(props.name).map(item => {
                
                return (

                    <p><span class="nombres">{item.nombre.nombre}:</span>{item.comentario}</p>
        )})}
            </div>
    );

    }

    export default Comentarios;


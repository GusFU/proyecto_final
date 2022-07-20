import React, { useState, useEffect } from "react";

function Amigos(props) {
  
    
    


    return(
        
<div class="amigos">
{!props.amigos ? "" :(props.amigos).map(item => {
                return (
                    <div class="amigo">
                        <p>{item.nombre} {item.apellido1}</p>
                        <img class="logo1" src={require(`../../public/images/`+item.foto_perfil)} width="50" />
                        <a href={`./amigos/${item.id}`} ><b>Ver muro</b></a>
                    </div>
      )})}
</div>


    )
    }

    export default Amigos;
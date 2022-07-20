import React, { useState, useEffect } from "react";
import ComentariosFotos from "./ComentariosFotos";
import Botonlike from "./Botonlike";
import Botondislike from "./Botondislike";



function Fotos(props) {
   const [fotos, setFotos] = useState(props.fotos);
   const [id1, setId1] = useState(props.id);
   useEffect(() => {
   
         setFotos(props.fotos)
    

      
  }, [props]);

   return (
        
      <div class="fotos">
        
         {!fotos ? "" : (fotos).map(item => {

            return (
               <div class="fotos1">
                  <img class="fotos" src={require(`../../public/images/` + item.foto)} width="150" />
                   <ComentariosFotos id={item.id_foto} /> 
                  <Botonlike id={item.id_foto} id1={id1}/>
                  <Botondislike id={item.id_foto} id1={id1}/>
               </div>

            )
         })}

      </div>
   )
}

export default Fotos;


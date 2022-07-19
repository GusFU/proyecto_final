import React, { useState, useEffect } from "react";
import ComentariosFotos from "./ComentariosFotos";
import Botonlike from "./Botonlike";
import Botondislike from "./Botondislike";



function Fotos(props) {
   const [fotos, setFotos] = useState("");
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
                  <Botonlike id={item.id_foto}/>
                  <Botondislike id={item.id_foto}/>
               </div>

            )
         })}

      </div>
   )
}

export default Fotos;


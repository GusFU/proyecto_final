import React, { useState, useEffect } from "react";

function Botonlike(props) {
    const [usuario] = useState(localStorage.getItem("usuario"));
    const sendmegusta = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id:props.id,usuario }),
        };
        fetch("megusta", requestOptions)
            .then((response) => response.json())
            .then((res) => {

            });
    }
    


    return(
        
<button onClick={() => sendmegusta()}>Me gusta</button>


    )
    }

    export default Botonlike;
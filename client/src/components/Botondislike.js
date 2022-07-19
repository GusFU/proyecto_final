import React, { useState, useEffect } from "react";

function Botondislike(props) {
    const [usuario] = useState(localStorage.getItem("usuario"));
    const sendnomegusta = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id:props.id,usuario }),
        };
        fetch("nomegusta", requestOptions)
            .then((response) => response.json())
            .then((res) => {

            });
    }
    


    return(
        
<button onClick={() => sendnomegusta()}>No me gusta</button>


    )
    }

    export default Botondislike;
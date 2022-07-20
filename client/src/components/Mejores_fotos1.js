import React, { useState, useEffect } from "react";

function Mejores_fotos1(props) {

   



    return (
<div class="banners">
            {!props.name ? "" :(props.name).map(item => {
                return (
        <img class="logo1" src={require(`../../public/images/`+item)} width="150" />)})}
            </div>
    );

}

export default Mejores_fotos1;


import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Principal from "../pages/Principal";
import Registro from "../pages/Registro";
import Profile from "../pages/Profile";
import Contrasena from "../pages/Contrasena";
import Cambiocontrasena from "../pages/Cambiocontrasena";
import Muro from "../pages/Muro";

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <Routes>
                <Route path="/" element={<Principal />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contrasena" element={<Contrasena />} />
                <Route path="/cambiocontrasena/:email/:token/" element={<Cambiocontrasena/>}/>
                <Route path="/amigos/:usuario/" element={<Muro/>} />
            </Routes>
        </div>
        );
    }
}
export default Main;

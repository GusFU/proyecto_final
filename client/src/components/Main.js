import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Principal from "../pages/Principal";
import Registro from "../pages/Registro";
import Profile from "../pages/Profile";
import Contrasena from "../pages/Contrasena";
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
            </Routes>
        </div>
        );
    }
}
export default Main;

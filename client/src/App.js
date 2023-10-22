import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Store from "./pages/Store";
import "react-toastify/dist/ReactToastify.css";

//On a (pour l'instant) 4 routes avec une Bar de navigation qui se présente seulement si on est connecté par soit un nouveau compte ou un compte existant
export default function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route element={<Navbar />}>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/store" element={<Store />} />
            </Route>
        </Routes>
        <footer>@DamiaoCostaSantos, Developpeur Full Stack, All rights reserved</footer>
    </BrowserRouter>
    );
}

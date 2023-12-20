import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import welcome from "../assets/welcome.webp";

export default function Home() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [user,setUser] = useState('');

    //On lance le moment qu'on essaye de charger la page la fonction de verification qui se trouve dans le back office pour verifier que l'utilisateur est connecté
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login");
            } else {
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    {
                        withCredentials: true,
                    }
                );
                if (!data.status) {
                    removeCookie("jwt");
                    navigate("/login");
                } else {
                    setUser(data.user);
                }
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    return (
        <>
        <title>Store of Damiao COSTA SANTOS</title>
        <div className="mainSection">
            <h1>Welcome to my Store!</h1>
            <div id="moveUp">
                <img src={welcome} alt="Welcome Image" className="welcome"></img>
            </div>
            <h2>In this store we feature a variety of products for any occasion!</h2>
            <div className="textBox">
                <h3>In order to access the many products at our disposal please use the store page to view said products!</h3>
                <p>This site was made for a project and thus is void of content but for your store I will do my best to satisfy your needs involving both performance but also visual and editorial choices!</p>
            </div>
        </div>
        </>
    );
}

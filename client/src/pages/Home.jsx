import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);

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
                }
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    return (
        <>
        <div className="private">
            <h1>Welcome to my store</h1>
        </div>
        </>
    );
}

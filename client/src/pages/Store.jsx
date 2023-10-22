import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Store() {
    
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [docs,setDocs] = useState([]); //La valeur qui contient les données de la bdd pour les produits

    //On lance le moment qu'on essaye de charger la page la fonction de verification qui se trouve dans le back office pour verifier que l'utilisateur est connecté
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {         //Si le cookie n'existe pas on est renvoyé sur la page login
                navigate("/login");
            } else {
                const { data } = await axios.post(
                    "http://localhost:4000",
                    {},
                    {
                        withCredentials: true,
                    }
                );
                if (!data.status) {     //Si le serveur ne valide pas le json web token on delete le cookie invalide et on revoie vers la page login
                    removeCookie("jwt");
                    navigate("/login");
                } else
                {                       //Si tout les verifications se passe sans probléme on envoye une demande pour récupérer les données des produits via axios
                    await axios.get("http://localhost:4000/store")
                        .then((res)=>setDocs(res.data));
                }
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    return (
        <>
        <div className="private">
            <h1>Here Is the Store Page</h1>
            <h2>On this page you can view products and contact us regarding the purchase of these products</h2>
            <ul className="catalogue">
                {docs.map((object)=>{
                    let name = 
                    <li key={object.ListId} className='product'>{object.Name} 
                        <br></br>Price: {object.Price}
                        <br></br>Stock: {object.Stock} 
                        <br></br>Description: {object.Description}
                    </li>
                return name;
                })}
            </ul>
        </div>
        </>
    );
}

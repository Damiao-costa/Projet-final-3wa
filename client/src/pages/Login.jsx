import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() {
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {       //Si on est déjà connecté on est redirigé vers la page d'acceuil
        if (cookies.jwt) {
            navigate("/");
        }
    }, [cookies, navigate]);

    const [values, setValues] = useState({ email: "", password: "" }); //Les valeurs rentrée dans le formulaire

    const generateError = (error) =>    //On affiche des erreurs pour que les utilisateurs comprennent ce qu'ils on fait incorrectement via toast qui le rend en pop-up non intrusif
        toast.error(error, {
        position: "bottom-right",
    });

    const handleSubmit = async (event) => { //Quand on submit le formulaire on envoye la data du formulaire au serveur et le serveur nous renvoye une réponse
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/login",
                {
                ...values,
                },
                { withCredentials: true }
            );
            if (data) {  //Si la réponse contient des erreurs on les envoye au utilisateur sinon on navigate vers la page d'acceuil et l'utilisateur seras en mode connecté
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/");
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    return (
        <div className="container">
        <h1>Welcome to my Store</h1>
        <h2>Pour voir le catalogue avec les produits ils faut que vous vous connectez!</h2>
        <form className="login" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" autoComplete="current-email"
                    onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" autoComplete="current-password"
                    onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />
            </div>
            <button className="formButton" type="submit">Submit</button>
            <span>
                Vous avez pas de compte ?<Link to="/register"> <u>Registrez vous</u></Link>
            </span>
        </form>
        <ToastContainer />
        </div>
    );
}

export default Login;

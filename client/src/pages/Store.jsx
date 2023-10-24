import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Store() {
    
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [docs,setDocs] = useState([]); //La valeur qui contient les données de la bdd pour les produits
    const [user,setUser] = useState('');
    const [values,setValues] = useState({ Name: "", Price: 0, Stock: 0, Description: "",ListId: null });

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
                        setUser(data.user);
                }
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    const generateError = (error) =>    //On affiche des erreurs pour que les utilisateurs comprennent ce qu'ils on fait incorrectement via toast qui le rend en pop-up non intrusif
        toast.error(error, {
        position: "bottom-right",
    });

    const handleUpdate = async (e,object) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/update",
                {
                    ...object,
                },
                { withCredentials: true }
            );
            if (data) {  //Si la réponse contient des erreurs on les envoye au utilisateur sinon on navigate vers la page d'acceuil et l'utilisateur seras en mode connecté
                if (data.errors) {
                    generateError(data.errors);
                } else {
                    navigate(0);
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    const handleDelete = async (e,id) =>{
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/delete",
                {
                    id,
                },
                { withCredentials: true }
            );
            if (data) {  //Si la réponse contient des erreurs on les envoye au utilisateur sinon on navigate vers la page d'acceuil et l'utilisateur seras en mode connecté
                if (data.errors) {
                    generateError(data);
                } else {
                    navigate(0);
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    const handleAdd = async (e,object) =>{
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/add",
                {
                    ...object,
                },
                { withCredentials: true }
            );
            if (data) {  //Si la réponse contient des erreurs on les envoye au utilisateur sinon on navigate vers la page d'acceuil et l'utilisateur seras en mode connecté
                if (data.errors) {
                    const { ListId } = data.errors;
                    generateError(ListId);
                } else {
                    navigate(0);
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <>
        <div className="private">
            {user === "admin" ? 
            <div className="titleAdmin">
                <h1>Voici votre catalogue Admin</h1>  
                <h2>Vous pouvez modifier les produits puis les envoyer</h2>
            </div>
            :<div className="titleAdmin">
                <h1>Voici notre catalogue</h1>  
                <h2>Sur cette page vous pouvez voir nos produits</h2>
            </div>}
            
            <ul className="catalogue">
                {user === "admin" ? docs.map((object)=>{
                    let name =
                        <li key={object.ListId} className='product'>
                            <form onSubmit={(e) => handleUpdate(e,object)}>
                                <label>Nom:</label>
                                <input defaultValue={object.Name} name="Name" 
                                onChange={(e) => object.Name = e.target.value}/>

                                <label>Prix:</label>
                                <input type="number" defaultValue={object.Price} name="Price" 
                                onChange={(e) => object.Price = parseInt(e.target.value) || 0}/>

                                <label>Stock:</label>
                                <input type="number" defaultValue={object.Stock} name="Stock" 
                                onChange={(e) => object.Stock = parseInt(e.target.value) || 0}/>

                                <label>Description:</label>
                                <input defaultValue={object.Description} name="Description" 
                                onChange={(e) => object.Description = e.target.value}/>

                                <label>ListId:</label>
                                <input type="number" defaultValue={object.ListId} name="ListId"
                                onChange={(e) => object.ListId = parseInt(e.target.value)}/>

                                <button type="submit">Edit</button>
                                <button onClick={(e) => handleDelete(e,object._id)}>Delete</button>   
                            </form>                     
                        </li>
                return name;})
                : docs.map((object)=>{
                    let name = 
                    <li key={object.ListId} className='product'>
                        <p>{object.Name}</p>
                        <p>Price: {object.Price}</p>
                        <p>Stock: {object.Stock}</p>
                        <p>Description: {object.Description}</p>
                    </li>
                return name;
                })}
                {user === "admin" ? 
                <li key="newProductBox" className='product'>
                    <h3>Nouveau Produit</h3>
                    <form onSubmit={(e) => handleAdd(e,values)}>
                        <label>Nom:</label>
                        <input defaultValue={values.Name} name="Name" 
                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}/>

                        <label>Prix:</label>
                        <input type="number" defaultValue={values.Price} name="Price" 
                        onChange={(e) => setValues({ ...values, [e.target.name]: parseInt(e.target.value) || 0})}/>

                        <label>Stock:</label>
                        <input type="number" defaultValue={values.Stock} name="Stock" 
                        onChange={(e) => setValues({ ...values, [e.target.name]: parseInt(e.target.value) || 0 })}/>

                        <label>Description:</label>
                        <input defaultValue={values.Description} name="Description" 
                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}/>

                        <label>ListId:</label>
                        <input type="number" defaultValue={values.ListId} name="ListId"
                        onChange={(e) => setValues({ ...values, [e.target.name]: parseInt(e.target.value)})}/>

                        <button type="submit">Ajouter</button>
                    </form>                     

                </li>: ""}
            </ul>
        </div>
        <ToastContainer />
        </>
    );
}

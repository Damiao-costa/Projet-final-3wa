import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Navbar(){
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    
    //Fonction delete la cookie contenant le json web token et redirige vers la page login
    const logOut = () => {
        removeCookie("jwt");
        navigate("/login");
    };

    return (
    <>
    <nav>
        <a href="/">Home</a>
        <ul>
            <a href="/store">Store Page</a>
            <a href="" onClick={logOut}>Log out</a>
        </ul>
    </nav>
    <Outlet />
    </>
    );
}
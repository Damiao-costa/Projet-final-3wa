export default function Navbar(){
    return <nav className="nav">
        <a href="/" className="site-title">Home</a>
        <ul>
            <li>
                <a href="/store">Store</a>
            </li>
            <li>
                <a href="/login">Login</a>
            </li>
            <li>
                <a href="/logout">Logout</a>
            </li>
        </ul>
    </nav>
}
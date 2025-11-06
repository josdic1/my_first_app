import { NavLink } from "react-router-dom"
import { useApp } from "../hooks/useApp"


function NavBar() {
    const { loading, user, logout } = useApp()
return (
<>
{!user?.id || loading ? 
<div>
<nav>
    You must <NavLink to="/login">Login</NavLink> to use this App
</nav>
</div>
: 
<div>
<nav>
    <NavLink to="/"> Home </NavLink>
    <NavLink to="/products/new"> New Product </NavLink>
    <NavLink onClick={logout} to="/login"> Logout </NavLink>  
</nav>
</div>}
</>
)}

export default NavBar

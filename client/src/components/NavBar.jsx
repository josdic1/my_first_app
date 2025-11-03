import { NavLink } from "react-router-dom"
import { useUser } from "../hooks/useUser"


function NavBar() {
    const { loading, user, logout } = useUser()
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

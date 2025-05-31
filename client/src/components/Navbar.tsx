import { NavLink } from 'react-router'
import './Header.css'

function Navbar() {
  return (
    <nav>
        <NavLink to="/" end className="navlink">Home</NavLink>
        <NavLink to="/dashboard" className="navlink">Dashboard</NavLink>
        <NavLink to="/about" className="navlink">About</NavLink>
    </nav>
  )
}

export default Navbar
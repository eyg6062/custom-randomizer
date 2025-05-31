import Navbar from "./Navbar"
import { NavLink } from "react-router"
import './Header.css'

import reactLogo from '../assets/react.svg'


function Header () {
    return (
        <header>
            <NavLink to="/" end className="logo-navlink">
                <img src={reactLogo} width="40px"/>
                <h1 className="title">Custom Randomizer</h1>
            </NavLink>
            <Navbar />
        </header>
    )
}

export default Header

import Navbar from "./Navbar"
import { NavLink } from "react-router"
import './Header.css'

import diceIcon from '../assets/dice.png'
import { Image } from "@mantine/core"


function Header () {
    return (
        <header>
            <NavLink to="/" end className="logo-navlink">
                <Image
                    src={diceIcon} 
                    h="auto"
                    w={54}
                    fit="contain"
                />
                <h1 className="title">Custom Randomizer</h1>
            </NavLink>
            <Navbar />
        </header>
    )
}

export default Header

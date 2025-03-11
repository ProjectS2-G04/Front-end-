import React from 'react'
import { Link } from 'react-router-dom';
import './home.css'
import homeLogo from "../assets/logo.png"
import homeUser from "../assets/user.png"

const home = () => {
  return (
    <div className='home-container'>
        <heder className="home-header">
                <img src={homeLogo} alt="Medeciel Logo" />
             <nav>
             <Link to="/profile">  
             <img src={homeUser} alt="Profile Icon" />
             </Link>
             <Link to="/" > <button className="deconnexion-button">Déconnexion</button></Link>
             </nav>
        </heder>
    </div>
  )
}

export default home

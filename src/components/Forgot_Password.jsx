
import React from 'react'
import { useNavigate  } from "react-router-dom";
import { useState } from 'react';
import './Forgot_Password.css'
import OnlineDoctoramico from "/src/assets/OnlineDoctor-amico.svg";

import logo from '../assets/logo.png'
import { MdEmail } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
function Forgot_Password() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Vérifier si l'email est valide
      const emailRegex = /^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$/;
      if (!emailRegex.test(email)) {
        alert("Veuillez entrer un email valide au format nom(3ch).prenom@esi-sba.dz");
        return;
      }
  
      // Si l'email est valide, passer à la page "enter-code"
      navigate("/enter-code");
    };
      
  return (
    <div className="container-Forgot-password">
    <div className="logoandtitle">
        <div className="logo-forgotpassword">
            <img src={logo} alt="Logo" />
        </div>
        <div className="title">
            <h1>Mot de passe oublié</h1>
            <p>vous inquiétez pas, nous vous enverrons des instructions de réinitialisation</p>
        </div>
    </div>
  <form action="#" className="forgot-password" onSubmit={handleSubmit} >
    <div className="email">
    <label> <MdEmail className="mdemail"/> Email</label>
    <input type="email"placeholder="Entrer votre email" 
      name="email" 
      value={email}
      onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'email
      required
      />
    </div>
    <button className="reset" type="Submit">Réinitialiser</button>
    <div className="Return">
     <button  className="btn-arrow" onClick={() => navigate("/")}><IoArrowBackCircle className="ioArrowBackCircle"/></button>
     <p>Retour à la connexion</p>
    </div>
  </form>
  <div className="doctor-img">
    <img src={OnlineDoctoramico} alt="" />
  </div>
</div>
  )
}

export default Forgot_Password
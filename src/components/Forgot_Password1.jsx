import React from 'react'
import './Forgot_Password1.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png'
import OnlineDoctoramico from "../assets/OnlineDoctor-amico.svg"
import { IoArrowBackCircle } from "react-icons/io5";
function Forgot_Password1() {
    const navigate = useNavigate();
  const [code, setCode] = useState({ digit1: "", digit2: "", digit3: "", digit4: "" });
  const handleChange = (e, key) => {
    setCode({ ...code, [key]: e.target.value });
  };
  const isCodeComplete = Object.values(code).every(digit => digit !== "");
  const handleContinue = (e) => {
    e.preventDefault();
    if (isCodeComplete) {
      navigate("/reset-password");
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };
  return (
    <div className="container-Forgot-passwordPage1">
    <div className="logoandtitlePage1">
      <div className="logo-forgotpassword">
        <img src={logo} alt="Logo" />
      </div>
      <div className="title">
       <h1>Réinitialisation du mot de passe</h1>
       <p>Nous avons envoyé un code à votre email </p>
      </div>
     </div>
       <form  className="code-a-envoyer" >
         <div className="input-container">
          <input type="text"  maxLength="1" value={code.digit1} onChange={(e) => handleChange(e, "digit1")} required='' />
          <input type="text"  maxLength="1" value={code.digit2} onChange={(e) => handleChange(e, "digit2")} required='' />
          <input type="text"  maxLength="1"  value={code.digit3} onChange={(e) => handleChange(e, "digit3")} required='' />
          <input type="text"  maxLength="1"   value={code.digit4} onChange={(e) => handleChange(e, "digit4")} required='' />
         </div>
         <button className="continuepage1"onClick={handleContinue}>Continuer</button>
          
       </form>
       <div className="Returnepage1">
           <button className='btn-arrow'onClick={() => navigate("/")}><IoArrowBackCircle className="ioArrowBackCircle"/></button>
           <p>Retour à la connexion</p>
        </div>
       <div className="doctor1-img">
         <img src={OnlineDoctoramico} alt="" />
       </div>   
   </div>
  )
}

export default Forgot_Password1
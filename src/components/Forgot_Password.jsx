
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Forgot_Password.css';
import OnlineDoctoramico from "/src/assets/OnlineDoctor-amico.svg";

import { IoArrowBackCircle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import logo from '../assets/logo.png';
function Forgot_Password() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const emailRegex = /^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$/;
      if (!emailRegex.test(email)) {
        alert("Veuillez entrer un email valide au format nom(3ch).prenom@esi-sba.dz");
        return;
      }
    
      try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/send-reset-code/", {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
    
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("resetEmail", email); 
          alert(data.message);
          navigate("/enter-code");
        } else {
          alert(data.error || "Une erreur est survenue.");
        }
      } catch (error) {
        alert("Erreur de connexion au serveur.");
      }
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
      onChange={(e) => setEmail(e.target.value)} 
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
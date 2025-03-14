import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forgot_Password2.css'
import logo from '../assets/logo.png'
import OnlineDoctoramico from "../assets/OnlineDoctor-amico.svg"
import { IoArrowBackCircle } from "react-icons/io5";
function Forgot_Password2() {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
    const handleChange = (e) => {
      setPasswords({ ...passwords, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      let newErrors = {};
      if (passwords.password.length < 8) {
        newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
      }
      if (passwords.password !== passwords.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      alert("Mot de passe réinitialisé avec succès !");
      navigate("/"); // Rediriger vers la connexion
    };
  
    return (
      <div className="container-Forogot-PasswordPage2">
         <div className="logoandtitlePage2">
            <div className="logo-forgotpassword">
              <img src={logo} alt="" />
            </div>
            <div className="title">
              <h1>Définir un nouveau mot de passe</h1>
            </div>
          </div>
          <form action="" className="forgotpasswordpage2"  onSubmit={handleSubmit} >
              <div className="labelandpassword">
                 <label htmlFor="">Nouveau mot de passe</label>
                 <input  type="password" 
              name="password" 
              value={passwords.password} 
              onChange={handleChange} 
              required/>
              {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              <div className="labelandpassword">
                  <label htmlFor="">Confirmer le mot de passe</label>
                 <input  type="password"  
                   name="confirmPassword"
                   value={passwords.confirmPassword} 
                   onChange={handleChange} 
                   required
                  />
                  {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
  
              </div>
             
              <button className="continuepage2" type="Submit">Réinitialiser</button>
              <div className="Returnpage2">
                    <button  className="btn-arrow"  onClick={() => navigate("/")}><IoArrowBackCircle className="ioArrowBackCircle"/></button>
                    <p>Retour à la connexion</p>
              </div>
          </form>
          <div className="doctor-img">
            <img src={OnlineDoctoramico} alt="" />
          </div>
         
      </div>
    )
  }

export default Forgot_Password2
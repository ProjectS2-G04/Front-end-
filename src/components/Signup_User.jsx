import React from 'react'
import { useState } from 'react';
import './Signup_User.css'
import logo from '../assets/logo.png'
import { IoArrowBackCircle } from "react-icons/io5";
function Signup_User() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        role: '' // Nouveau champ pour stocker le rôle sélectionné
      });
    
      const [isValid, setIsValid] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        validateForm(updatedFormData);
      };
    
      const handleRoleChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
        validateForm({ ...formData, role: e.target.value });
      };
    
      const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z]{1,3}\.[a-zA-Z0-9]+@esi-sba\.dz$/;
        return emailRegex.test(email);
      };
    
      const validateForm = (data) => {
        const isFormValid =
          data.nom.trim() !== '' &&
          data.prenom.trim() !== '' &&
          validateEmail(data.email) &&
          data.password.length >= 8 &&
          data.role !== ''; // Vérifie qu'un rôle est sélectionné
        setIsValid(isFormValid);
      };
  return (
    <div className="container-SignupUser">
        <div className="logoandtitleSignupUser">
            <div className="logo-signupuser">
                 <img src={logo} alt="Logo" />
           </div>
            <div className="title-signup">
                 <h1>Inscription</h1>
                 <p>Inscription pour les medecins , assistants medecin et directeures</p>
            </div>
         </div>
         <form action="" className="form-signupUser">
            <div className="inputuser">
            <label htmlFor="nom">Nom</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </div>
            <div className="inputuser">
            <label htmlFor="prenom">Prénom</label>
            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
            </div>
            <div className="inputuser">
               <label htmlFor="email">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                 {!validateEmail(formData.email) && formData.email.length > 0 && (
                 <p style={{ color: 'red', fontSize: '14px' }}>Format invalide (ex: abc.nom@esi-sba.dz)</p>
                )}
            </div>
            <div className="inputuser">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                 {formData.password.length > 0 && formData.password.length < 8 && (
                  <p style={{ color: 'red', fontSize: '14px' }}>Le mot de passe doit contenir au moins 8 caractères</p>
                )}
            </div>
            <div className="chooseuser">
                <div className="user">
                  <input type="radio" name="role" value="Médecin" onChange={handleRoleChange} />
                  <label>Médecin</label>
                </div>
                <div className="user">
                  <input type="radio" name="role" value="Assistant de médecin" onChange={handleRoleChange} />
                  <label>Assistant de médecin</label>
                </div>
                <div className="user">
                  <input type="radio" name="role" value="Directeur" onChange={handleRoleChange} />
                  <label>Directeur</label>
                </div>
            </div>
            {formData.role === '' && (
              <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>Veuillez choisir un rôle</p>
            )}
            <div className="add-ruturn">
                <div className="Return-signup">
                    <button className="btn-arrow"><IoArrowBackCircle className="ioArrowBackCircle" /> </button>
                    <p>Retoure</p>
                </div>
                <button className='add-signup'  disabled={!isValid}>Ajouter</button>
            </div>
         </form>
    </div>
  )
}

export default Signup_User
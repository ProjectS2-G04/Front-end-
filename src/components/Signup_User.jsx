import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Signup_User.css';

function Signup_User() {
  const navigate = useNavigate();
  const initialFormData = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
  };

  const handleRoleChange = (e) => {
    const updatedFormData = { ...formData, role: e.target.value };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
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
      data.role !== '';
    setIsValid(isFormValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    fetch('http://127.0.0.1:8000/api/accounts/user_register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: formData.nom,
        last_name: formData.prenom,
        email: formData.email,
        password: formData.password,
        role: formData.role // Must match valid choices (e.g., "DOCTOR")
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("User registration response:", data);
        if (data.message) {
          // Show alert and clear the form
          window.alert("Enregistré avec succès");
          setFormData(initialFormData);
          setIsValid(false);
          // Redirect to the admin page
          navigate('/Admin_Page');
        } else {
          window.alert("Erreur lors de l'inscription");
        }
      })
      .catch(error => {
        console.error("Error during registration:", error);
        window.alert("Erreur lors de l'inscription");
      });
  };

  return (
    <div className="container-SignupUser">
      <div className="logoandtitleSignupUser">
        <div className="logo-signupuser">
          <img src={logo} alt="Logo" />
        </div>
        <div className="title-signup">
          <h1>Inscription</h1>
          <p>Inscription pour les medecins, assistants medecin et directeurs</p>
        </div>
      </div>
      <form className="form-signupUser" onSubmit={handleSubmit}>
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
        <div className="inputuser">
          <label htmlFor="role">Role</label>
          <select name="role" value={formData.role} onChange={handleRoleChange} required>
            <option value="">--Sélectionnez un rôle--</option>
            <option value="DOCTOR">Médecin</option>
            <option value="ASSISTANT">Assistant médecin</option>
            <option value="DIRECTOR">Directeur</option>
            <option value="PATIENT">Patient</option>
          </select>
        </div>
        <button className="add-signup" type="submit" disabled={!isValid}>Ajouter</button>
      </form>
    </div>
  );
}

export default Signup_User;

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
  const [errors, setErrors] = useState({}); // تخزين الأخطاء

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
    let validationErrors = {};

    if (data.nom.trim() === '') validationErrors.nom = "Le nom est requis.";
    if (data.prenom.trim() === '') validationErrors.prenom = "Le prénom est requis.";
    if (!validateEmail(data.email)) validationErrors.email = "Format invalide (ex: abc.nom@esi-sba.dz)";
    if (data.password.length < 8) validationErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    if (data.role === '') validationErrors.role = "Veuillez sélectionner un rôle.";

    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // تنظيف الأخطاء قبل الإرسال

    fetch('http://127.0.0.1:8000/api/registerAdmin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: formData.nom,
        last_name: formData.prenom,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          window.alert("Enregistré avec succès");
          setFormData(initialFormData);
          setIsValid(false);
          navigate('/AdminPage');
        } else {
          // التحقق مما إذا كان هناك خطأ وإضافته إلى قائمة الأخطاء
          if (data.email) setErrors((prev) => ({ ...prev, email: data.email[0] }));
          if (data.role) setErrors((prev) => ({ ...prev, role: data.role[0] }));
          if (data.message) window.alert(data.message);
        }
      })
      .catch(error => {
        console.error("Error during registration:", error);
        setErrors({ global: "Une erreur s'est produite. Veuillez réessayer." });
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
          {errors.nom && <p className="error-message">{errors.nom}</p>}
        </div>
        <div className="inputuser">
          <label htmlFor="prenom">Prénom</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
          {errors.prenom && <p className="error-message">{errors.prenom}</p>}
        </div>
        <div className="inputuser">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="inputuser">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="inputuser">
          <label htmlFor="role">Rôle</label>
          <select name="role" value={formData.role} onChange={handleRoleChange} required>
            <option value="">--Sélectionnez un rôle--</option>
            <option value="MEDECIN">Médecin</option>
            <option value="ASSISTANT_MEDECIN">Assistant médecin</option>
            <option value="DIRECTEUR">Directeur</option>
            <option value="PATIENT">Patient</option>
          </select>
          {errors.role && <p className="error-message">{errors.role}</p>}
        </div>
        {errors.global && <p className="error-message">{errors.global}</p>}
        <button className="add-signup" type="submit" disabled={!isValid}>Ajouter</button>
      </form>
    </div>
  );
}

export default Signup_User;

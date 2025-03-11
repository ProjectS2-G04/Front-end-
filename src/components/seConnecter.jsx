import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./seConnecter.css";
import seConnecterLogo from "../assets/logo.png";


const seConnecter = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const esiEmailRegex = /^[a-zA-Z0-9._%+-]+@esi-sba\.dz$/;
    if (!formData.email || !formData.password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    if (!esiEmailRegex.test(formData.email)) {
      alert(
        "Veuillez utiliser une adresse email ESI SBA valide (ex: exemple@esi-sba.dz)"
      );
      return;
    }
    if (formData.password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    console.log("Form Data:", formData);
    // Later: Send the data to the backend
    navigate('/home');
  };

  return (
    <div className="seConnecter-container">
      <div className="seConnecter-info">
        <img src={seConnecterLogo} alt="" />
        <p>
          Médeciel est une plateforme de gestion médicale de l’École Supérieure
          de l’Informatique ESI au Sidi BEL Abbesse , facilitant l’accès aux
          soins pour les étudiants, les enseignants et le personnel ATS.
          Bienvenue sur la plateforme médicale dédiée à l’École Supérieure
          d’Informatique. Connectez-vous pour accéder à vos ressources.
        </p>
      </div>
      <div className="seConnecter-form">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <label> Email </label>
          <input
            type="email"
            name="email"
            placeholder="Entrez votre Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label> Mots de passe</label>
          <input
            type="password"
            name="password"
            placeholder="Entrez votre Mots de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="options">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span>Se souvenir de moi</span>
            <a href="/" className="forget-password">
              Mots de passe oublié ?
            </a>
          </div>
          <div className="seConnInscrir-div">
            <button type="submit" className="seConnecter-button">
              Se connecter
            </button>
            <p>
              <a onClick={() => navigate('/sinscrire')} >Créer un compte</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default seConnecter;

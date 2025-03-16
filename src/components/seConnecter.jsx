import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import seConnecterLogo from "../assets/logo.png";
import "./seConnecter.css";

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

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        
        const errorMessage = errorData.detail || "Échec de la connexion";
        throw new Error(errorMessage);
      }
    
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
    
      console.log("Login successful:", data);
      navigate('/home');
    } catch (error) {
      alert(error.message || "Une erreur est survenue");
    }
    
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
            <a href='#' className='forget-password' onClick={(e) => {
                e.preventDefault(); 
                navigate("/forgot-password"); 
            }}> Mots de passe oublié ?</a>
          </div>
          <div className="seConnInscrir-div">
            <button type="submit" className="seConnecter-button">
              Se connecter
            </button>
              <a className='creer-compte-button' onClick={() => navigate('/sinscrire')} >Créer un compte</a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default seConnecter;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import seConnecterLogo from "../assets/logo.png";
import "./seConnecter.css";

const SeConnecter = () => {
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
      alert("Veuillez utiliser une adresse email ESI SBA valide (ex: exemple@esi-sba.dz)");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || errorData.error || "Échec de la connexion";
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Store tokens and user info
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('role', data.role);
      localStorage.setItem('sub_role', data.sub_role || '');
      localStorage.setItem('email', data.email);
      localStorage.setItem('name', `${data.first_name} ${data.last_name}`);

      // Redirect user based on their role
      switch (data.role) {
        case 'DOCTOR':
          navigate('/home');
          break;
        case 'ASSISTANT':
          navigate('/Assitanthome');
          break;
        case 'PATIENT':
          navigate('/Patienthome');
          break;
        case 'ADMIN':
          navigate('/Admin_Page');
          break;
        case 'DIRECTOR':
          navigate('/profile'); 
          break;
        default:
          navigate('/profile');
          break;
      }

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
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Entrez votre Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
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
            <a href="#" className="forget-password" onClick={(e) => {
              e.preventDefault();
              navigate("/forgot-password");
            }}>Mot de passe oublié ?</a>
          </div>
          <div className="seConnInscrir-div">
            <button type="submit" className="seConnecter-button">
              Se connecter
            </button>
            <a className="creer-compte-button" onClick={() => navigate('/sinscrire')}>Créer un compte</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeConnecter;

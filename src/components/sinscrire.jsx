import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import sinscrireLogo from "../assets/logo.png";
import "./sinscrire.css";

const Sinscrire = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const role = formData.role.toUpperCase();  
  
    const data = {
      email: formData.email,
      password: formData.password,
      first_name: formData.prenom,
      last_name: formData.nom,
      sub_role: role,  
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.email || 'Erreur lors de l\'inscription');
      }
    
      const result = await response.json();
      console.log(result);  
      alert("Un lien de vérification a été envoyé à votre adresse email. Veuillez vérifier votre boîte de réception.");
    } catch (error) {
      console.error(error);
      alert(`Erreur lors de l'inscription: ${error.message}`);
    }
    
  };

  return (
    <div className="sinscrire-container">
      <div className="sinscrire-info">
        <img src={sinscrireLogo} alt="Medeciel Logo" />
        <p>
          Médeciel est une plateforme de gestion médicale de l’École Supérieure
          de l’Informatique ESI au Sidi BEL Abbesse , facilitant l’accès aux
          soins pour les étudiants, les enseignants et le personnel ATS.
          Bienvenue sur la plateforme médicale dédiée à l’École Supérieure
          d’Informatique. Connectez-vous pour accéder à vos ressources.
        </p>
      </div>

      <div className="sinscrire-form">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="roles">
            <label>
              <input
                type="radio"
                name="role"
                value="ETUDIANT"
                onChange={() => setFormData({ ...formData, role: "ETUDIANT" })}
                checked={formData.role === "ETUDIANT"}
              />
              étudiant
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="ENSEIGNANT"
                onChange={() => setFormData({ ...formData, role: "ENSEIGNANT" })}
                checked={formData.role === "ENSEIGNANT"}
              />
              enseignant
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="ATS"
                onChange={() => setFormData({ ...formData, role: "ATS" })}
                checked={formData.role === "ATS"}
              />
              ATS
            </label>
          </div>
          <div className="seConnInscrir-div">
            <button type="submit" className="sinscrire-button">S'inscrire</button>
            <a onClick={() => navigate('/')} className="connexion-link">
              Connexion
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sinscrire;

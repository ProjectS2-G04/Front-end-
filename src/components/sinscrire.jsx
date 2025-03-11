import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./sinscrire.css";
import sinscrireLogo from "../assets/logo.png";

const sinscrire = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    username: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const esiEmailRegex = /^[a-zA-Z0-9._%+-]+@esi-sba\.dz$/;
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      formData.role.length === 0
    ) {
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
    // Later: Send data to backend
    navigate('/home');
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
            type="text"
            name="username"
            placeholder="Nom_Utilisateur"
            value={formData.username}
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
                value="étudiant"
                onChange={() => setFormData({ ...formData, role: "étudiant" })}
                checked={formData.role === "étudiant"}
              />
              étudiant
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="enseignant"
                onChange={() =>
                  setFormData({ ...formData, role: "enseignant" })
                }
                checked={formData.role === "enseignant"}
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

export default sinscrire;

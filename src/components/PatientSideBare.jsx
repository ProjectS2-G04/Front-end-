import React from 'react'
import './PatientSideBare.css'
import logo from '/src/assets/logo.png';
import { useNavigate } from 'react-router-dom';

function PatientSideBare() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
    <div className="logo-section">
      <img src={logo} alt="" className="Patient-logo" />
    </div>
    <nav className="nav-buttons">
      <button>Notification</button>
      <button>Ajouter une demande</button>
      <button>Annuler la demande</button>
      <button>Consulter mon dossier</button>
      <button className="profile-btn">👤 Mon profile</button>
    </nav>
  </div>
  )
}

export default PatientSideBare
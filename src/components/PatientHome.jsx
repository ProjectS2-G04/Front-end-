import React from 'react';
import { HiMiniDocumentText } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import homeLogo from "../assets/logo.png";
import homeUser from "../assets/user.png";
import OnlineDoctoramico from "../assets/OnlineDoctor-amico.svg";
import './home.css';

function PatientHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to login or home page
  };

  const handleProfile = () => {
    navigate('/profile'); // Redirect to profile page
  };

  const handleViewMedicalRecord = () => {
    navigate('/dossier-medical'); // Assuming this is the route for viewing the medical record
  };

  const handleExportMedicalRecord = () => {
    navigate('/export-dossier'); // Assuming this is the route for exporting the medical record
  };

  return (
    <div className='home-container'>
      <header className="home-header">
        <img src={homeLogo} alt="Medeciel Logo" />
        <nav>
          <img src={homeUser} onClick={handleProfile} alt="Profile Icon" />
          <button className="deconnexion-button" onClick={handleLogout}>Déconnexion</button>
        </nav>
      </header>
      <div className="options">
        <button onClick={handleViewMedicalRecord}>
          Consulter mon dossier médical <HiMiniDocumentText className='HiMiniDocumentText'/>
        </button>
        <button onClick={handleExportMedicalRecord}>
          Exporter mon dossier médical <HiMiniDocumentText className='HiMiniDocumentText'/>
        </button>
      </div>
      <div className="homeimg">
        <img src={OnlineDoctoramico} alt="Online Doctor Illustration" />
      </div>
    </div>
  );
}

export default PatientHome;
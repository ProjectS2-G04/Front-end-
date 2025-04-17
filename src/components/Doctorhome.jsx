import React from 'react';
import { HiMiniDocumentText } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import homeLogo from "../assets/logo.png";
import homeUser from "../assets/user.png";
import './home.css';
import OnlineDoctoramico from "/src/assets/OnlineDoctor-amico.svg";

function Doctorhome() { // Renamed to match file convention and React best practice
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to login or landing page
  };

  const handleProfile = () => {
    navigate('/profile'); // Redirect to profile page
  };

  return (
    <div className='home-container'>
      <header className="home-header"> {/* Fixed typo: "heder" → "header" */}
        <img src={homeLogo} alt="Medeciel Logo" />
        <nav>
          <img
            src={homeUser}
            alt="Profile Icon"
            onClick={handleProfile} // Using onClick for programmatic navigation
            style={{ cursor: 'pointer' }} // Add cursor pointer for UX
          />
          <button
            className="deconnexion-button"
            onClick={handleLogout} // Using onClick for consistency
          >
            Déconnexion
          </button>
        </nav>
      </header>
      <div className="options">
        <button onClick={() => navigate("/DoctorList")}>
          Consulter les dossiers médicaux <HiMiniDocumentText className='HiMiniDocumentText' />
        </button>
        <button onClick={() => navigate("/CreateFormPatient")}>
          Créer un nouveau dossier <HiMiniDocumentText className='HiMiniDocumentText' />
        </button>
      </div>
      <div className="homeimg">
        <img src={OnlineDoctoramico} alt="Online Doctor Illustration" />
      </div>
    </div>
  );
}

export default Doctorhome;
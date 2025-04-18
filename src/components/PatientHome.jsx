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
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleViewMedicalRecord = async () => {
    try {
      const token = localStorage.getItem('token');
      const subRole = localStorage.getItem('sub_role');

      if (!token || !subRole) {
        throw new Error('Missing authentication information.');
      }

      const decoded = parseJwt(token);
      const userId = decoded?.user_id || decoded?.id || decoded?.sub;
      if (!userId) {
        throw new Error('User ID not found in token.');
      }

      let url = '';
      if (subRole === 'STUDENT') {
        url = '/dossier-medicale/dossiers/etudiants/';
      } else if (subRole === 'TEACHER') {
        url = '/dossier-medicale/dossiers/enseignants/';
      } else if (subRole === 'ATS') {
        url = '/dossier-medicale/dossiers/ats/';
      } else {
        throw new Error('Unknown user role.');
      }

      console.log('URL:', url);

      const response = await fetch(`http://127.0.0.1:8000/api${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dossiers. Status: ${response.status}`);
      }

      const dossiers = await response.json();
      const userDossier = dossiers.find(d => d.user === userId);

      console.log('Dossiers:', dossiers);
      console.log('User Dossier:', userDossier.id);

      if (!userDossier) {
        throw new Error('Dossier not found for this user.');
      }

      if (subRole === 'STUDENT') {
        navigate(`/ReadOnlyStudent/${userDossier.id}`);
      } else if (subRole === 'TEACHER') {
        navigate(`/ReadOnlyTeacher/${userDossier.id}`);
      } else if (subRole === 'ATS') {
        navigate(`/ReadOnlyAts/${userDossier.id}`);
      }

    } catch (error) {
      console.error('Error navigating to dossier:', error.message);
    }
  };

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token format", error);
      return null;
    }
  }


  const handleExportMedicalRecord = () => {
    navigate('/export-dossier');
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
          Consulter mon dossier médical <HiMiniDocumentText className='HiMiniDocumentText' />
        </button>
        <button onClick={handleExportMedicalRecord}>
          Exporter mon dossier médical <HiMiniDocumentText className='HiMiniDocumentText' />
        </button>
      </div>
      <div className="homeimg">
        <img src={OnlineDoctoramico} alt="Online Doctor Illustration" />
      </div>
    </div>
  );
}

export default PatientHome;
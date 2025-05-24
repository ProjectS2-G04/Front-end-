import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientSideBare.css';
import logo from '../assets/logo.png';

const PatientSideBare = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleNotificationClick = () => {
    navigate('/Notification');
  };

  const handleListeDemandesClick = () => {
    navigate('/PatientListeDemandes');
  };

  const handleViewDossierClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const subRole = localStorage.getItem('sub_role')?.toLowerCase();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Veuillez vous connecter pour consulter votre dossier.');
      navigate('/');
      setIsLoading(false);
      return;
    }

    if (!subRole) {
      alert('Impossible de déterminer votre rôle. Veuillez vous reconnecter.');
      navigate('/');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/dossier-medicale/dossiers/by-user/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 404) throw new Error('Dossier non trouvé.');
        if (res.status === 403) throw new Error('Accès interdit.');
        throw new Error(`Erreur serveur: ${res.status}`);
      }

      const data = await res.json();
      const dossierId = data.id;

      let targetPath;
      switch (subRole) {
        case 'student':
        case 'etudiant':
          targetPath = `/dossier/${dossierId}/student`;
          break;
        case 'teacher':
        case 'enseignant':
          targetPath = `/dossier/${dossierId}/teacher`;
          break;
        case 'ats':
        case 'fonctionnaire':
          targetPath = `/dossier/${dossierId}/ats`;
          break;
        default:
          alert('Rôle invalide. Veuillez contacter le support.');
          setIsLoading(false);
          return;
      }

      navigate(targetPath);
    } catch (error) {
      console.error('Erreur lors de la récupération du dossier:', error);
      alert(`Erreur: ${error.message}`);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="Patient-logo" />
      </div>
      <nav className="nav-buttons">
        <button onClick={handleNotificationClick} disabled={isLoading}>
          Notification
        </button>
        <button onClick={handleListeDemandesClick} disabled={isLoading}>
          Liste des demandes
        </button>
        <button onClick={handleViewDossierClick} disabled={isLoading}>
          Consulter mon dossier
        </button>
        <button className="profile-btn" onClick={handleProfileClick} disabled={isLoading}>
          👤 Mon profil
        </button>
      </nav>
    </div>
  );
};

export default PatientSideBare;
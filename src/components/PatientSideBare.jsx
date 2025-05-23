import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientSideBare.css';
import logo from '../assets/logo.png'; 

const PatientSideBare = () => {
  const navigate = useNavigate();

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
    const subRole = localStorage.getItem('sub_role')?.toLowerCase();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Veuillez vous connecter pour consulter votre dossier.');
      navigate('/');
      return;
    }

    if (!subRole) {
      alert('Impossible de déterminer votre rôle. Veuillez vous reconnecter.');
      navigate('/');
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
          targetPath = `/ReadOnlyStudent/${dossierId}`;
          break;
        case 'teacher':
        case 'enseignant':
          targetPath = `/ReadOnlyTeacher/${dossierId}`;
          break;
        case 'ats':
        case 'fonctionnaire':
          targetPath = `/ReadOnlyATS/${dossierId}`;
          break;
        default:
          alert('Rôle invalide. Veuillez contacter le support.');
          return;
      }

      navigate(targetPath);
    } catch (error) {
      alert(`Erreur: ${error.message}`);
      navigate('/');
    }
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        <img src={logo} alt="Logo" className="Patient-logo" />
      </div>
      <nav className="nav-buttons">
        <button onClick={handleNotificationClick}>Notification</button>
        <button onClick={handleListeDemandesClick}>Liste des demandes</button>
        <button onClick={handleViewDossierClick}>Consulter mon dossier</button>
        <button className="profile-btn" onClick={handleProfileClick}>
          👤 Mon profil
        </button>
      </nav>
    </div>
  );
};

export default PatientSideBare;

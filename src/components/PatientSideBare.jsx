// PatientSideBare.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientSideBare.css';
import logo from '../assets/logo.png'; // Adjust path if needed

const PatientSideBare = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    console.log('Navigating to /profile');
    navigate('/profile');
  };

  const handleAddRequestClick = () => {
    console.log('Navigating to /TAkeAppointment');
    navigate('/TAkeAppointment');
  };

  const handleCancelRequestClick = () => {
    console.log('Navigating to /CancelAppointment');
    navigate('/CancelAppointment');
  };

  const handleNotificationClick = () => {
    console.log('Navigating to /Notification');
    navigate('/Notification');
  };

  const handleViewDossierClick = async () => {
    const subRole = localStorage.getItem('sub_role')?.toLowerCase();
    const token = localStorage.getItem('token');
    console.log('View dossier - subRole:', subRole, 'token:', token);

    if (!token) {
      console.error('Token not found in localStorage');
      alert('Veuillez vous connecter pour consulter votre dossier.');
      navigate('/');
      return;
    }

    if (!subRole) {
      console.error('Sub-role not found in localStorage');
      alert('Impossible de déterminer votre rôle. Veuillez vous reconnecter.');
      navigate('/');
      return;
    }

    let targetPath;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/dossier-medicale/dossiers/by-user/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Dossier non trouvé pour cet utilisateur.');
        }
        if (res.status === 403) {
          throw new Error('Accès interdit. Vérifiez votre connexion.');
        }
        throw new Error(`Échec de la récupération du dossier: ${res.status}`);
      }

      const data = await res.json();
      const dossierId = data.id;
      if (!dossierId) {
        throw new Error('ID du dossier non trouvé.');
      }

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
          console.error('Unknown sub-role:', subRole);
          alert('Rôle invalide. Veuillez contacter le support.');
          return;
      }

      console.log('Navigating to:', targetPath);
      navigate(targetPath);
    } catch (error) {
      console.error('Error fetching dossier:', error);
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
        <button onClick={handleAddRequestClick}>Ajouter une demande</button>
        <button onClick={handleCancelRequestClick}>Annuler la demande</button>
        <button onClick={handleViewDossierClick}>Consulter mon dossier</button>
        <button className="profile-btn" onClick={handleProfileClick}>
          👤 Mon profil
        </button>
      </nav>
    </div>
  );
};

export default PatientSideBare;
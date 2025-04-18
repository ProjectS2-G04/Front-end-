import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import SideBareDocs from './SideBareDocs'; // Added import
import './PatientList.css'; // Reuse PatientList.css for consistent styling

function DossierDetail() {
  const { dossierId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dossier, setDossier] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const activeTab = location.state?.activeTab || 'etudiants';

  useEffect(() => {
    const fetchDossier = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/${dossierId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Access forbidden. Please check your credentials.');
          } else if (response.status === 404) {
            throw new Error('Dossier not found.');
          } else if (response.status === 500) {
            throw new Error('Server error. Please try again later.');
          }
          const errorData = await response.text();
          console.error('Error response:', errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dossier Data:', data);
        setDossier(data);
      } catch (err) {
        console.error('Error fetching dossier:', err);
        setError(err.message || 'Failed to load dossier. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDossier();
  }, [dossierId]);

  const handleBack = () => {
    navigate('/PatientList', { state: { activeTab } });
  };

  // Determine role for role-specific fields
  const getRole = () => {
    if (dossier?.Filiere) return 'etudiants';
    if (dossier?.grade && dossier?.specialite) return 'enseignants';
    if (dossier?.grade) return 'ats';
    return 'N/A';
  };

  return (
    <div className="patient-container">
      <SideBareDocs activeTab={activeTab} setActiveTab={() => {}} />
      <div className="patientliste-container">
        <header className="patientliste-header">
          <h1>Dossier Médical</h1>
        </header>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : dossier ? (
          <div className="dossier-details">
            <button className="btn-back" onClick={handleBack}>
              <IoArrowBackCircle className="IoArrowBackCircle" /> Retour
            </button>
            <div className="modal-field">
              <label>Numéro Dossier</label>
              <input type="text" value={dossier.numero_dossier || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Nom</label>
              <input type="text" value={dossier.nom || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Prénom</label>
              <input type="text" value={dossier.prenom || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Email</label>
              <input type="text" value={dossier.email || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Date de naissance</label>
              <input type="text" value={dossier.date_naissance ? new Date(dossier.date_naissance).toLocaleDateString('fr-FR') : 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Lieu de naissance</label>
              <input type="text" value={dossier.lieu_naissance || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Adresse</label>
              <input type="text" value={dossier.adresse || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Téléphone</label>
              <input type="text" value={dossier.numero_telephone || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Sexe</label>
              <input type="text" value={dossier.sexe || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Groupe sanguin</label>
              <input type="text" value={dossier.groupe_sanguin || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Taille (cm)</label>
              <input type="text" value={dossier.taille || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Poids (kg)</label>
              <input type="text" value={dossier.poids || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>IMC</label>
              <input type="text" value={dossier.imc || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Catégorie IMC</label>
              <input type="text" value={dossier.categorie_imc || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Fréquence cardiaque</label>
              <input type="text" value={dossier.frequence_cardiaque || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Pression artérielle</label>
              <input type="text" value={dossier.pression_arterielle || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Fumeur</label>
              <input type="text" value={dossier.fumeur ? 'Oui' : 'Non'} readOnly />
            </div>
            {dossier.fumeur && (
              <div className="modal-field">
                <label>Nombre de cigarettes</label>
                <input type="text" value={dossier.nombre_cigarettes || 'N/A'} readOnly />
              </div>
            )}
            <div className="modal-field">
              <label>Ancien fumeur</label>
              <input type="text" value={dossier.ancien_fumeur ? 'Oui' : 'Non'} readOnly />
            </div>
            <div className="modal-field">
              <label>Affections congénitales</label>
              <input type="text" value={dossier.affections_congenitales || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Maladies générales</label>
              <input type="text" value={dossier.maladies_generales || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Interventions chirurgicales</label>
              <input type="text" value={dossier.interventions_chirurgicales || 'N/A'} readOnly />
            </div>
            <div className="modal-field">
              <label>Réactions allergiques</label>
              <input type="text" value={dossier.reactions_allergiques || 'N/A'} readOnly />
            </div>
            {dossier.dossier_pdf_url && (
              <div className="modal-field">
                <label>Document PDF</label>
                <a href={dossier.dossier_pdf_url} target="_blank" rel="noopener noreferrer">
                  Voir le dossier PDF
                </a>
              </div>
            )}
            {/* Role-specific fields */}
            {getRole() === 'etudiants' && (
              <>
                <div className="modal-field">
                  <label>Filière</label>
                  <input type="text" value={dossier.Filiere || 'N/A'} readOnly />
                </div>
                <div className="modal-field">
                  <label>Niveau</label>
                  <input type="text" value={dossier.Niveau || 'N/A'} readOnly />
                </div>
              </>
            )}
            {getRole() === 'enseignants' && (
              <>
                <div className="modal-field">
                  <label>Grade</label>
                  <input type="text" value={dossier.grade || 'N/A'} readOnly />
                </div>
                <div className="modal-field">
                  <label>Spécialité</label>
                  <input type="text" value={dossier.specialite || 'N/A'} readOnly />
                </div>
              </>
            )}
            {getRole() === 'ats' && (
              <div className="modal-field">
                <label>Grade</label>
                <input type="text" value={dossier.grade || 'N/A'} readOnly />
              </div>
            )}
          </div>
        ) : (
          <p>No dossier data available.</p>
        )}
      </div>
    </div>
  );
}

export default DossierDetail;
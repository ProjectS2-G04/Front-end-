import React, { useState, useEffect } from 'react';
import './Demandes.css';
import SideBareDocs from './SideBareDocs';
import { IoArrowBackCircle } from "react-icons/io5";

function Demandes() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [modeReport, setModeReport] = useState(false);
  const [nouvelleDate, setNouvelleDate] = useState('');
  const [demandesEnAttente, setDemandesEnAttente] = useState([]);
  const [annulations, setAnnulations] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // Added for SideBareDocs

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/rendez-vous/demandes/rdv/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDemandesEnAttente(data))
      .catch((error) => console.error('Error fetching demandesEnAttente:', error));

    fetch('http://127.0.0.1:8000/api/rendez-vous/demandes/annulation/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAnnulations(data))
      .catch((error) => console.error('Error fetching annulations:', error));
  }, []);

  const openModal = (demande) => {
    setSelectedDemande(demande);
    setNouvelleDate(demande.date_demandee);
    setShowModal(true);
    setModeReport(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDemande(null);
    setNouvelleDate('');
    setModeReport(false);
  };

  const confirmerRdv = (demandeId) => {
    console.log('ID de la demande:', demandeId);
    fetch(`http://127.0.0.1:8000/api/rendez-vous/demande/${demandeId}/confirmer/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert(`Rendez-vous confirmé pour ${selectedDemande.nom} le ${selectedDemande.date_demandee}`);
          setDemandesEnAttente((prev) => prev.filter((demande) => demande.id !== demandeId));
        } else {
          response.json().then((data) => {
            console.error('Error confirming demande:', data);
            alert(`Erreur lors de la confirmation de la demande`);
          });
        }
      })
      .catch((error) => console.error('Error confirming demande:', error));
    closeModal();
  };

  const reporterRdv = () => {
    if (!modeReport) {
      setModeReport(true);
    } else {
      if (!nouvelleDate) {
        alert("Veuillez sélectionner une nouvelle date.");
        return;
      }

      fetch(`http://127.0.0.1:8000/api/rendez-vous/demande/${selectedDemande.id}/reporter/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nouvelle_date: nouvelleDate }),
      })
        .then((response) => {
          if (response.ok) {
            alert(`Nouveau rendez-vous pour ${selectedDemande.nom} fixé au ${nouvelleDate}`);
            setDemandesEnAttente((prev) =>
              prev.filter((demande) => demande.id !== selectedDemande.id)
            );
          } else {
            response.json().then((data) => {
              console.error('Error reporting demande:', data);
              alert(`Erreur lors du report de la demande`);
            });
          }
        })
        .catch((error) => console.error('Error reporting demande:', error));

      closeModal();
    }
  };

  const handleDelete = (id) => {
    setAnnulations((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="demandes-annulation">
      <SideBareDocs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        disableDropdown={false} // Added props
      />
      <div className="content">
        {/* Colonne des demandes en attente */}
        <div className="column">
          <h2>Demandes en attente</h2>
          {demandesEnAttente.map((demande) => (
            <div key={demande.id} className="card">
              <div className="card-header">
                <strong>{demande.nom}</strong>
              </div>
              <div className="card-body">
                <p>{demande.motif}</p>
                <a href="#" className="card-link" onClick={() => openModal(demande)}>Voir la notification</a>
              </div>
            </div>
          ))}
        </div>

        {/* Colonne des annulations */}
        <div className="column">
          <h2>Annulations</h2>
          {annulations.map((annul) => (
            <div key={annul.id} className="card">
              <div className="card-header">
                <strong>{annul.nom}</strong>
              </div>
              <div className="card-body">
                <p>
                  Rendez-vous {annul.date_demandee}
                  <span className="time"> ({annul.heure})</span>
                </p>
                <a href="#" className="card-link" onClick={(e) => {
                  e.preventDefault();
                  handleDelete(annul.id);
                }}>
                  Supprimer
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && selectedDemande && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Détails de la demande</h2>
            <p className='nom'><strong>Nom :</strong> {selectedDemande.nom}</p>
            <div className="Motifmladie">
              <p><strong>Motif :</strong> {selectedDemande.motif}</p>
              <p><strong>Description :</strong> {selectedDemande.description}</p>
              {selectedDemande.date_demandee && (
                <p><strong>Date choisie :</strong> {selectedDemande.date_demandee}</p>
              )}
              {modeReport && (
                <div className="date-picker">
                  <label>Nouvelle date :</label>
                  <input
                    type="date"
                    value={nouvelleDate}
                    onChange={(e) => setNouvelleDate(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="modal-buttons">
              <button onClick={closeModal} className='close-button'><IoArrowBackCircle className='IoArrowBackCircle' /></button>
              <button onClick={reporterRdv} className='reschedule'>
                {modeReport ? 'Valider la date' : 'Reporter'}
              </button>
              <button onClick={() => confirmerRdv(selectedDemande.id)} className='confirm'>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Demandes;
import React, { useState, useEffect } from 'react';
import './PatientListeDemandes.css';
import PatientSideBare from './PatientSideBare';
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function PatientListeDemandes() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null);
    const [demandesEnAttente, setDemandesEnAttente] = useState([]);
    const [nouvelleDate, setNouvelleDate] = useState('');
    const [modeReport, setModeReport] = useState(false);

    const navigate = useNavigate();

    const accessToken = localStorage.getItem("token");
    const decoded = parseJwt(accessToken);
    const userId = decoded?.user_id;

    function parseJwt(token) {
        if (!token) return null;
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
        } catch (e) {
            console.error("Erreur de décodage JWT :", e);
            return null;
        }
    }

    useEffect(() => {
        if (!userId) return;

        fetch('http://127.0.0.1:8000/api/rendez-vous/demandes/rdv/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const filtered = data.filter((demande) => demande.patient === userId);
                setDemandesEnAttente(filtered);
            })
            .catch((error) => console.error('Erreur lors du chargement des demandes :', error));
    }, [userId]);

    const openModal = (demande) => {
        setSelectedDemande(demande);
        setNouvelleDate(demande.date_demandee || '');
        setModeReport(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDemande(null);
        setNouvelleDate('');
        setModeReport(false);
    };

    const annulerDemande = (demandeId) => {
        fetch(`http://127.0.0.1:8000/api/rendez-vous/demande/${demandeId}/annuler-demande-patient/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert(`Demande annulée pour ${selectedDemande.nom}`);
                    setDemandesEnAttente((prev) => prev.filter((demande) => demande.id !== demandeId));
                } else {
                    response.json().then((data) => {
                        console.error('Erreur lors de l\'annulation de la demande:', data);
                        alert('Erreur lors de l\'annulation.');
                    });
                }
            })
            .catch((error) => console.error('Erreur lors de la requête POST:', error));
        closeModal();
    };

    return (
        <div className="demandes-annulation">
            <PatientSideBare />
            <div className="my-content">
                <div className="column">
                    <h2>Mes demandes</h2>
                    {demandesEnAttente.map((demande) => (
                        <div key={demande.id} className="card">
                            <div className="card-body">
                                <p>{demande.motif}</p>
                                <a href="#" className="card-link" onClick={() => openModal(demande)}>Voir détails</a>

                            </div>
                        </div>
                    ))}
                    <button className="add-btn" onClick={() => navigate('/TakeAppointment')}>
                        Ajouter une nouvelle demande
                    </button>
                </div>
            </div>

            {showModal && selectedDemande && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Détails de la demande</h2>
                        <div className="Motifmladie">
                            <p><strong>Motif :</strong> {selectedDemande.motif}</p>
                            <p><strong>Description :</strong> {selectedDemande.description}</p>
                            {selectedDemande.date_demandee && (
                                <p><strong>Date choisie :</strong> {selectedDemande.date_demandee}</p>
                            )}
                        </div>
                        <div className="modal-buttons">
                            <button onClick={closeModal} className='close-button'>
                                <IoArrowBackCircle className='IoArrowBackCircle' />
                            </button>
                            <button onClick={() => annulerDemande(selectedDemande.id)} className='confirm'>
                                Annuler la demande
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientListeDemandes;

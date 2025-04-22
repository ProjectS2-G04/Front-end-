import React, { useEffect, useState } from 'react';
import { BsCalendarPlusFill } from "react-icons/bs";
import { IoArrowBackCircle } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import './PatientList.css';
import SideBareDocs from './SideBareDocs';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null); 
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await fetch('http://127.0.0.1:8000/api/dossier-medicale/dossiers/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('Response:', response.status, response.statusText);
          if (response.status === 403) {
            throw new Error('Access forbidden. Please check your credentials.');
          } else if (response.status === 500) {
            throw new Error('Server error. Please try again later or contact support.');
          }
          const errorData = await response.text();
          console.error('Error response:', errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched patients:', data);
        setPatients(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError(err.message || 'Failed to load patients. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const getPatientRole = (patient) => {
    if (patient?.Filiere) return 'etudiants';
    if (patient?.grade && patient?.specialite) return 'enseignants';
    if (patient?.grade) return 'ats';
    return 'N/A';
  };

  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    const role = getPatientRole(patient);
    return (
      (patient?.nom?.toLowerCase() || '').includes(search) ||
      (patient?.prenom?.toLowerCase() || '').includes(search) ||
      (patient?.email?.toLowerCase() || '').includes(search) ||
      role.toLowerCase().includes(search)
    );
  });

  
  const handleDetailsClick = (patient) => {
    console.log('Patient:', patient);
    const role = getPatientRole(patient);
    const newActiveTab = role;
    
    setSelectedPatient({
      id: patient?.id || '',
      nom: patient?.nom || '',
      prenom: patient?.prenom || '',
      email: patient?.email || '',
      dateNaissance: patient?.date_naissance ? new Date(patient.date_naissance).toLocaleDateString('fr-FR') : '',
      telephone: patient?.numero_telephone || '',
      sexe: patient?.sexe || '',
      role: role,
      activeTab: newActiveTab,
    });
    setShowModal(true);
  };

const [name , setname ]= useState("")
  const handleConsultationClick = (patientId, nom, prenom) => {
    const userRole = localStorage.getItem('role');
    
    if (!userRole) {
      console.error('User role not found. Please log in.');
      return;
    }
  
    if (userRole === 'DOCTOR') {
      navigate(`/PrescriptionList/${patientId}`, { state: { nom: nom , prenom : prenom } });
      
    } else if (userRole === 'ASSISTANT') {
      navigate(`/PrescriptionListAssistant/${patientId}`);
    } else {
      console.error('Unknown user role:', userRole);
    }
  };

  const handleAppointmentClick = (patientId) => {
    navigate('/Appointment', { state: { idPatient: patientId } });  
  };

  return (
    <div className="patient-container">
      <SideBareDocs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="patientliste-container">
        <header className="patientliste-header">
          <h1>La liste des patients</h1>
        </header>
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Rechercher un patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="patients-table">
            <thead>
              <tr>
                <th><span>Nom</span></th>
                <th><span>Prénom</span></th>
                <th><span>Email</span></th>
                <th><span>Rôle</span></th>
                <th><span>Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient?.id || Math.random()}>
                    <td>{patient?.nom || 'N/A'}</td>
                    <td>{patient?.prenom || 'N/A'}</td>
                    <td>{patient?.email || 'N/A'}</td>
                    <td>{getPatientRole(patient)}</td>
                    <td>
                      <button
                        className="btn-details"
                        onClick={() => handleDetailsClick(patient)}
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Aucun patient trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {showModal && selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header>
              <button className="close-button" onClick={() => setShowModal(false)}>
                <IoArrowBackCircle className="IoArrowBackCircle" />
              </button>
            </header>
            <div className="modal-buttons">
              <div className="modal-field">
                <label>Nom</label>
                <input type="text" value={selectedPatient.nom} readOnly />
              </div>
              <button
  className="btn-consultation"
  onClick={() => handleConsultationClick(selectedPatient.id, selectedPatient.nom, selectedPatient.prenom)}
>
  <SiGoogledocs className="SiGoogledocs" /> <p>Consultation</p>
</button>
            </div>
            <div className="modal-buttons">
              <div className="modal-field">
                <label>Prénom</label>
                <input type="text" value={selectedPatient.prenom} readOnly />
              </div>
              <button
                className="btn-rdv"
                onClick={() => handleAppointmentClick(selectedPatient.id)}
              >
                <BsCalendarPlusFill className="BsCalendarPlusFill" /> <p>Ajouter un rendez-vous</p>
              </button>
            </div>
            <div className="modal-field">
              <label>Email</label>
              <input type="text" value={selectedPatient.email} readOnly />
            </div>
            <div className="modal-field">
              <label>Date de naissance</label>
              <input type="text" value={selectedPatient.dateNaissance} readOnly />
            </div>
            <div className="modal-field">
              <label>Téléphone</label>
              <input type="text" value={selectedPatient.telephone} readOnly />
            </div>
            <div className="sex-role">
              <div className="modal-field">
                <label>Sexe</label>
                <input type="text" value={selectedPatient.sexe} readOnly />
              </div>
              <div className="modal-field">
                <label>Rôle</label>
                <input type="text" value={selectedPatient.role} readOnly />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientList;
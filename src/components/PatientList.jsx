import React, { useEffect, useState } from 'react';
import { BsCalendarPlusFill } from "react-icons/bs";
import { IoArrowBackCircle } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
import { FaFileMedical } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './PatientList.css';
import SideBareDocs from './SideBareDocs';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [dossiers, setDossiers] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const patientResponse = await fetch('http://127.0.0.1:8000/api/groups/patient/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!patientResponse.ok) {
          console.log('Patient Response:', patientResponse.status, patientResponse.statusText);
          if (patientResponse.status === 403) {
            throw new Error('Access forbidden. Please check your credentials.');
          } else if (patientResponse.status === 500) {
            throw new Error('Server error. Please try again later or contact support.');
          }
          const errorData = await patientResponse.text();
          console.error('Patient Error response:', errorData);
          throw new Error(`HTTP error! Status: ${patientResponse.status}`);
        }

        const patientData = await patientResponse.json();
        console.log('Fetched patients:', patientData);
        setPatients(Array.isArray(patientData.members) ? patientData.members : []);

        const dossierResponse = await fetch('http://127.0.0.1:8000/api/dossier-medicale/dossiers/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!dossierResponse.ok) {
          console.log('Dossier Response:', dossierResponse.status, dossierResponse.statusText);
          if (dossierResponse.status === 403) {
            throw new Error('Access forbidden for dossiers. Please check your credentials.');
          } else if (dossierResponse.status === 500) {
            throw new Error('Server error for dossiers. Please try again later or contact support.');
          }
          const errorData = await dossierResponse.text();
          console.error('Dossier Error response:', errorData);
          throw new Error(`HTTP error for dossiers! Status: ${dossierResponse.status}`);
        }

        const dossierData = await dossierResponse.json();
        console.log('Fetched dossiers:', dossierData);
        const dossierMap = {};
        dossierData.forEach(dossier => {
          if (dossier.user) {
            dossierMap[dossier.user] = dossier;
          }
        });
        setDossiers(dossierMap);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPatientRole = (patient) => {
    return patient?.sub_role || 'N/A';
  };

  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    const role = getPatientRole(patient);
    return (
      (patient?.first_name?.toLowerCase() || '').includes(search) ||
      (patient?.last_name?.toLowerCase() || '').includes(search) ||
      (patient?.email?.toLowerCase() || '').includes(search) ||
      role.toLowerCase().includes(search)
    );
  });

  
  const handleDetailsClick = (patient) => {
    console.log('Patient:', patient);
    const role = getPatientRole(patient);
    const dossier = dossiers[patient.id];

    const patientData = {
      id: patient?.id || '',
      first_name: patient?.first_name || 'N/A',
      last_name: patient?.last_name || 'N/A',
      email: patient?.email || 'N/A',
      dateNaissance: dossier?.date_naissance
        ? new Date(dossier.date_naissance).toLocaleDateString('fr-FR')
        : 'N/A',
      telephone: dossier?.numero_telephone || 'N/A',
      sexe: dossier?.sexe || 'N/A',
      role: role,
      activeTab: role,
    };

    console.log('Selected patient data:', patientData);
    setSelectedPatient(patientData);
    setShowModal(true);
  };

const [name , setname ]= useState("")
  const handleConsultationClick = (patientId, nom, prenom) => {
    const userRole = localStorage.getItem('role');
    if (!userRole) {
      console.error('User role not found. Please log in.');
      setError('User role not found. Please log in.');
      return;
    }

    if (userRole === 'DOCTOR') {
      navigate(`/ConsultationList/${patientId}`, { state: { nom: nom , prenom : prenom } });
      
    } else if (userRole === 'ASSISTANT') {
      navigate(`/ConsultationList/${patientId}`);
    } else {
      console.error('Unknown user role:', userRole);
      setError('Unknown user role.');
    }
  };

  const handleAppointmentClick = (patientId) => {
    navigate('/Appointment', { state: { idPatient: patientId } });
  };

  const handleCreateDossierClick = (patientId, subRole) => {
    const role = subRole || 'STUDENT';
    let route;
    switch (role.toUpperCase()) {
      case 'STUDENT':
        route = '/CreateFormPatient';
        break;
      case 'TEACHER':
        route = '/CreateFormEnseignant';
        break;
      case 'ATS':
        route = '/CreateFormATS';
        break;
      default:
        route = '/CreateFormPatient';
    }
    navigate(route, { state: { patientId } });
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
                    <td>{patient?.last_name || 'N/A'}</td>
                    <td>{patient?.first_name || 'N/A'}</td>
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
                <input type="text" value={selectedPatient.last_name} readOnly />
              </div>
              <button
  className="btn-consultation"
  onClick={() => handleConsultationClick(selectedPatient.id, selectedPatient.nom, selectedPatient.prenom)}
>
  <SiGoogledocs className="SiGoogledocs" /> <p> Consultation  </p>
</button>
            </div>
            <div className="modal-buttons">
              <div className="modal-field">
                <label>Prénom</label>
                <input type="text" value={selectedPatient.first_name} readOnly />
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
            {!dossiers[selectedPatient.id] && (
              <>
                <div className="modal-field">
                  <label>Rôle</label>
                  <input type="text" value={selectedPatient.role} readOnly />
                </div>
                <div className="modal-buttons">
                  <div className="modal-field">
                    <label>Note</label>
                    <input type="text" value="Aucun dossier médical disponible" readOnly />
                  </div>
                  <button
                    className="btn-create-dossier"
                    onClick={() => handleCreateDossierClick(selectedPatient.id, getPatientRole(patients.find(p => p.id === selectedPatient.id)))}
                  >
                    <FaFileMedical className="FaFileMedical" /> <p>Créer Dossier Médical</p>
                  </button>
                </div>
              </>
            )}
            {dossiers[selectedPatient.id] && (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientList;
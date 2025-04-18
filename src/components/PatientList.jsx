import React ,{useEffect , useState} from 'react'
import './PatientList.css'
import SideBareDocs from './SideBareDocs'
import { BsCalendarPlusFill } from "react-icons/bs";
import { SiGoogledocs } from "react-icons/si";
import { IoArrowBackCircle } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';


function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('etudiants'); 
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

        const response = await fetch('http://127.0.0.1:8000/api/accounts/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Access forbidden. Please check your credentials.');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

      
        const filteredData = (data.results || data).filter(
          (user) =>
            user.role === 'PATIENT' ||
            (user.role === 'DIRECTOR' && ['STUDENT', 'TEACHER', 'ATS'].includes(user.sub_role))
        );
        setPatients(filteredData);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError(err.message || 'Failed to load patients. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);
  
 //Pop up 
   const [selectedPatient, setSelectedPatient] = useState(null);
   const [showModal, setShowModal] = useState(false);


  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    return (
      patient.last_name.toLowerCase().includes(search) ||
      patient.first_name.toLowerCase().includes(search) ||
      patient.email.toLowerCase().includes(search) ||
      (patient.sub_role || '').toLowerCase().includes(search)
    );
  });

  
  const handleDetailsClick = (patient) => {
    console.log('Patient:', patient); // Debug the patient object
    setSelectedPatient({
        nom: patient.last_name ?? '',
        prenom: patient.first_name ?? '',
        email: patient.email ?? '',
        dateNaissance: patient.date_naissance ?? '',
        telephone: patient.telephone ?? '',
        sexe: patient.sexe ?? '',
        role: patient.sub_role ?? '',
    });
    setShowModal(true);
  };

  return (
    
    <div className="patient-container">
      <SideBareDocs activeTab={activeTab} setActiveTab={setActiveTab} /> {/* Pass activeTab and setActiveTab */}
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
                  <tr key={patient.id}>
                    <td>{patient.last_name}</td>
                    <td>{patient.first_name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.sub_role || 'N/A'}</td>
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
              
             <button className="close-button" onClick={() => setShowModal(false)}><IoArrowBackCircle className='IoArrowBackCircle' /></button>
        
          </header> 
          <div className="modal-buttons">
             <div className="modal-field">
                <label>Nom</label>
                <input type="text" value={selectedPatient.nom} readOnly />
            </div>
          <button className="btn-consultation"><SiGoogledocs className='SiGoogledocs' /> <p>Consulter le dossier</p></button>
         </div>
      <div className="modal-buttons">
          <div className="modal-field">
            <label>Prénom</label>
            <input type="text" value={selectedPatient.prenom} readOnly />
         </div>
         <button className="btn-rdv"><BsCalendarPlusFill className='BsCalendarPlusFill' /> <p>Ajouter un rendez-vous</p></button>
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

  )
}

export default PatientList;
import React ,{useEffect , useState} from 'react'
import './PatientList.css'
import SideBareDocs from './SideBareDocs'
import { BsCalendarPlusFill } from "react-icons/bs";
import { SiGoogledocs } from "react-icons/si";
import { IoArrowBackCircle } from "react-icons/io5";
function PatientList() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
   
    const filteredPatients = patients.filter((patient) => {
        const search = searchTerm.toLowerCase();
        return (
          patient.nom.toLowerCase().includes(search) ||
          patient.prenom.toLowerCase().includes(search) ||
          patient.email.toLowerCase().includes(search) ||
          patient.role.toLowerCase().includes(search)
        );
      });
    
    

  // Données internes (mockées) – tu pourras les remplacer plus tard par des données API
 
  useEffect(() => {
    const patientsData = [
      { nom: "Mohamed", prenom: "Amin", email: "m.amin@esi-sba.dz", role: "Etudiant" , dateNaissance: "21-08-2004",
        telephone: "05 55 55 55 55",
        sexe: "Homme" },
      { nom: "Fezazi", prenom: "Amina", email: "ak.fezazi@esi-sba.dz", role: "ATS",dateNaissance: "21-08-2004",
        telephone: "05 55 55 55 55",
        sexe: "Femmme" },
      { nom: "AbdELhak ", prenom: "Souliman", email: "abd.fezazi@esi-sba.dz", role: "Enseignant" ,dateNaissance: "21-08-2004",
        telephone: "05 55 55 55 55",
        sexe: "Homme" },
      { nom: "Alaa", prenom: "Fezz", email: "a.fzz@esi-sba.dz", role: "Etudiant"  ,dateNaissance: "21-08-2004",
        telephone: "05 55 55 55 55",
        sexe: "Femme"},
    ];
    setPatients(patientsData);
  }, []);
  
 //Pop up 
   const [selectedPatient, setSelectedPatient] = useState(null);
   const [showModal, setShowModal] = useState(false);

     
    
  return (
    
    <div className="patient-container">
    <SideBareDocs />
    
    <div className="patientliste-container" >
        <header className='patientliste-header'>
         <h1>La liste des patients</h1>
      </header>
      
      <input
          type="text"
          className="search-input"
          placeholder="🔍 Rechercher un patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

       

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
         {/* ❗️Ici on affiche seulement les patients filtrés */}
         {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.nom}</td>
                  <td>{patient.prenom}</td>
                  <td>{patient.email}</td>
                  <td>{patient.role}</td>
                  <td>
                     <button className="btn-details"onClick={() => {
                       setSelectedPatient(patient);
                        setShowModal(true);
                     }}>
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

export default PatientList
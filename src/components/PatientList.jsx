import React ,{useEffect , useState} from 'react'
import './PatientList.css'
import SideBareDocs from './SideBareDocs'

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
      { nom: "Mohamed", prenom: "Amin", email: "m.amin@esi-sba.dz", role: "Etudiant" },
      { nom: "Fezazi", prenom: "Amina", email: "ak.fezazi@esi-sba.dz", role: "ATS" },
      { nom: "AbdELhak ", prenom: "Souliman", email: "abd.fezazi@esi-sba.dz", role: "Enseignant" },
      { nom: "Alaa", prenom: "Fezz", email: "a.fzz@esi-sba.dz", role: "Etudiant" },
    ];
    setPatients(patientsData);
  }, []);

     
    
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
                  <td><button className="btn-details">Détails</button></td>
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
  </div>
  )
}

export default PatientList
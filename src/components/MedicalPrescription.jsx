import React, { useState } from 'react';
import './MedicalPrescription.css';
import SideBareDocs from './SideBareDocs';
import axios from 'axios';

import { useLocation, useNavigate ,  useParams } from 'react-router-dom';

function MedicalPrescription() {
  const { id } = useParams();
  const location = useLocation();
  const nom = location.state?.nom;
  
  const prenom = location.state?.prenom;

  const [formData, setFormData] = useState({
    lastName: nom,
    firstName: prenom,
    age: '',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    medications: [
      { name: '', dosage: '', duration: '' },
      { name: '', dosage: '', duration: '' }
    ],
    newMedication: '',
    newDosage: '',
    newDuration: ''
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMedication = () => {
    const { newMedication, newDosage, newDuration } = formData;
    if (newMedication && newDosage && newDuration) {
      setFormData(prev => ({
        ...prev,
        medications: [
          ...prev.medications,
          { name: newMedication, dosage: newDosage, duration: newDuration }
        ],
        newMedication: '',
        newDosage: '',
        newDuration: ''
      }));
    }
  };
  const handlePrint = () => window.print();


  const handleSave = async () => {
    if (!id) {
      alert("Aucun patient fourni !");
      return;
    }
  
    // Ajout du dernier médicament saisi s'il est complet
    let medicationsToSend = [...formData.medications];
    if (formData.newMedication && formData.newDosage && formData.newDuration) {
      medicationsToSend.push({
        name: formData.newMedication,
        dosage: formData.newDosage,
        duration: formData.newDuration
      });
    }
  
    const data = {
      age: formData.age,
      medicaments: medicationsToSend.map(med => ({
        nom: med.name,
        posologie: med.dosage,
        duree: med.duration
      }))
    };
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://127.0.0.1:8000/api/rendez-vous/create-ordonnance/${id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      alert("Ordonnance créée avec succès !");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de l'ordonnance.");
    }
  };
  
  // const handleSave = async () => {
   
    
  //   if (!id) {
  //     alert("Aucun dossier ID fourni !");
  //     return;
  //   }
  
  //   const data = {
  //     age: formData.age,
  //     medicaments: formData.medications.map(med => ({
  //       nom: med.name,
  //       posologie: med.dosage,
  //       duree: med.duration
  //     }))
  //   };
  
  //   try {
  //     const token = localStorage.getItem('token'); // or wherever you store your auth token
  //     const response = await axios.post(
  //       `http://127.0.0.1:8000/api/rendez-vous/create-ordonnance/${id}/`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );
  
  //     alert("Ordonnance créée avec succès !");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Erreur lors de la création de l'ordonnance.");
  //   }
  // };


  return (
    <div className="medeciel-container">
      <div className="app-layout">
        <SideBareDocs />

        <main className="prescription-content">
          <h1 className="title">Ordonnance médicale</h1>
          <div className="form-grid">
            <div className="form-group">
              <label>Nom</label>
              <input name="lastName" value={formData.lastName} disabled />
            </div>
            <div className="form-group">
              <label>Âge</label>
              <input name="age" value={formData.age} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input name="firstName" value={formData.firstName} readOnly />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input name="date" type="date" value={formData.date} onChange={handleInputChange} />
            </div>
          </div>

          <div className="medications-table">
            <div className="table-header">
              <span>Médicaments</span>
              <span>Posologie</span>
              <span>Durée</span>
            </div>
            {formData.medications.map((med, i) => (
              <div className="table-row" key={i}>
                <span>{med.name}</span>
                <span>{med.dosage}</span>
                <span>{med.duration}</span>
              </div>
            ))}

            <div className="table-row add-row">
              <input
                type="text"
                placeholder="Médicament"
                value={formData.newMedication}
                onChange={(e) => setFormData({ ...formData, newMedication: e.target.value })}
              />
              <input
                type="text"
                placeholder="Posologie"
                value={formData.newDosage}
                onChange={(e) => setFormData({ ...formData, newDosage: e.target.value })}
              />
              <input
                type="text"
                placeholder="Durée"
                value={formData.newDuration}
                onChange={(e) => setFormData({ ...formData, newDuration: e.target.value })}
              />
             
            </div>
            <button className="add-button" onClick={handleAddMedication}>＋</button>
          </div>

          <div className="form-footer">
           <button className="save-btn" onClick={handleSave}>Enregistrer</button>
            <button className="print-btn" onClick={handlePrint}>Imprimer</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MedicalPrescription;

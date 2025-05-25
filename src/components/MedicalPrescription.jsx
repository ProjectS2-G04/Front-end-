import React, { useState } from 'react';
import './MedicalPrescription.css';
import SideBareDocs from './SideBareDocs';
import axios from 'axios';



import { useLocation, useNavigate ,  useParams } from 'react-router-dom';

function MedicalPrescription() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const nom = location.state?.patientLastName;
  const prenom = location.state?.patientFirstName;
  const id = location.state?.consultationId;
  const [medicationSuggestions, setMedicationSuggestions] = useState([]);
  const [medicationSearchTimeout, setMedicationSearchTimeout] = useState(null);

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
  const fetchMedicationSuggestions = async (query) => {
  if (query.length < 3) {
    setMedicationSuggestions([]);
    return;
  }

  try {
    const response = await axios.get(`https://api.fda.gov/drug/label.json`, {
      params: {
        search: `openfda.brand_name:${query}`,
        limit: 100
      }
    });

    const results = response.data.results || [];
    const names = results
      .map(item => item.openfda?.brand_name?.[0])
      .filter(Boolean);
      
    // Enlever doublons
    const uniqueNames = [...new Set(names)];

    setMedicationSuggestions(uniqueNames);
  } catch (error) {
    console.error("Erreur lors de la récupération des médicaments :", error);
    setMedicationSuggestions([]);
  }
};


  const handleSave = async () => {
    
  
    // Ajout du dernier médicament saisi s'il est complet
    let medicationsToSend = [...formData.medications];
    if (formData.newMedication && formData.newDosage && formData.newDuration) {
      medicationsToSend.push({
        name: formData.newMedication,
        dosage: formData.newDosage,
        duration: formData.newDuration
      });
    }
  
     const payload = {
    age: Number(formData.age), // Convert to number just in case
    date: formData.date, // Already in YYYY-MM-DD
    medicaments: medicationsToSend
      .filter(med => med.name && med.dosage && med.duration)
      .map(med => ({
        nom: med.name,
        posologie: med.dosage,
        duree: med.duration
      }))
  };
    console.log("Payload to send:", JSON.stringify(payload, null, 2));
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://127.0.0.1:8000/api/rendez-vous/create/${id}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      alert("Ordonnance créée avec succès !");
      //navigate('/AddConsultation');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message === "Cette consultation a déjà une ordonnance.") {
  alert("⚠ Cette consultation a déjà une ordonnance.");
} else {
  alert("Erreur lors de la création de l'ordonnance.");
}

    }
  };
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
  onChange={(e) => {
    const value = e.target.value;
    setFormData({ ...formData, newMedication: value });

    if (medicationSearchTimeout) {
      clearTimeout(medicationSearchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchMedicationSuggestions(value);
    }, 400); // délai pour éviter les appels trop rapides
    setMedicationSearchTimeout(timeout);
  }}
/> <ul className="suggestions-list">
  {medicationSuggestions.map((suggestion, index) => (
    <li
      key={index}
      onClick={() => {
        setFormData({ ...formData, newMedication: suggestion });
        setMedicationSuggestions([]);
      }}
    >
      {suggestion}
    </li>
  ))}
</ul>
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

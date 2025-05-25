import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBareDocs from './SideBareDocs';
import './AddConsultation.css';

function AddConsultation() {
  const navigate = useNavigate();

  const patientInfo = {
    nom: 'Nessrine',
    prenom: 'الله يبارك عليك',
  };

  const [errors, setErrors] = useState({});
const handleAddPrescription = async () => {
 

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/consultation/check/7/`, {
      method: "POST", // Make sure it matches your backend
      headers: {
        "Content-Type": "application/json",
      },
       body: JSON.stringify({})
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur de l'API :", errorData);
      alert("Erreur lors de la vérification de la consultation !");
      return;
    }

    const data = await response.json();
    
    if (data.existe) {
      console.log("Consultation trouvée :", data);
      alert("Consultation existante trouvée !");
      navigate('/MedicalPrescription', {
         state:  {
          consultationId: data.consultation_id,
          patientFirstName: data.patient_firstname,
          patientLastName: data.patient_lastname
        }});
    } else {
      alert("Vous devez d'abord ajouter une consultation pour ce rendez-vous.");
    }

  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("Échec de la requête : le serveur est injoignable.");
  }
};


const validateForm = () => {
  const newErrors = {};
  for (const key in formData) {
    if (!formData[key]) {
      newErrors[key] = "Ce champ est obligatoire";
    }
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: '',
    temperature: '',
    poids: '',
    taille: '',
    sexe: '',
    tension: '',
    frequence: '',
    test: '',
    status: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
 const handleGoToMaladies = () => {

  if (!validateForm()) return; 

    const payload = {
      ...formData,
      maladies_croniques: [],
      maladies_contagieuses: [],
    };
  localStorage.setItem("consultation_form_data", JSON.stringify(formData));
  navigate('/addDisease'); // Or the route you use
};
 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({ ...prev, [name]: value }));

  // Supprime l'erreur du champ modifié
  setErrors((prevErrors) => {
    const updatedErrors = { ...prevErrors };
    delete updatedErrors[name];
    return updatedErrors;
  });
};

  const handleSave = async () => {
    
    if (!validateForm()) return; 

    const payload = {
      ...formData,
      maladies_croniques: [],
      maladies_contagieuses: [],
    };

    try {
    const response = await fetch(`http://localhost:8000/api/consultation/7/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
  const errorData = await response.json();
  console.error("Erreur de l'API :", errorData);

  if (errorData.error === "Une consultation existe déjà pour ce rendez-vous.") {
    alert("Ce rendez-vous a déjà une consultation.");
  } else {
    alert("Erreur lors de la création de la consultation !");
  }
  return;
}

    const data = await response.json();
    console.log("Consultation créée :", data);
    alert("Consultation créée avec succès !");
    localStorage.removeItem("maladies_selectionnees");
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("Échec de la requête : le serveur est injoignable.");
    }
  };

  return (
    <div className="consultation-container">
      <SideBareDocs />

      <div className="consultation-content">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form className="form-card">
          <label>Nom</label>
          <input type="text" value={patientInfo.nom} readOnly />

          <label>Prénom</label>
          <input type="text" value={patientInfo.prenom} readOnly />

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />  {errors.date && <p className="error-text">{errors.date}</p>}

          <label>Température</label>
          <input
            type="text"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="°C"
          /> {errors.temperature && <p className="error-text">{errors.temperature}</p>}

          <div className="row">
            <div className="half">
              <label>Poids</label>
              <input
                type="text"
                name="poids"
                value={formData.poids}
                onChange={handleChange}
                placeholder="kg"
              />  {errors.poids && <p className="error-text">{errors.poids}</p>}
            </div>

            <div className="half">
              <label>Taille</label>
              <input
                type="text"
                name="taille"
                value={formData.taille}
                onChange={handleChange}
                placeholder="cm"
              /> {errors.taille && <p className="error-text">{errors.taille}</p>}
            </div>
          </div>

          <div className="row">
            <div className="half">
              <label>Sexe</label>
              <select name="sexe" value={formData.sexe} onChange={handleChange}>
                <option value="">--Sélectionner--</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>  {errors.sexe && <p className="error-text">{errors.sexe}</p>}
            </div>

            <div className="half">
              <label>Tension artérielle</label>
              <input
                type="text"
                name="tension"
                value={formData.tension}
                onChange={handleChange}
                placeholder="mmHg"
              />  {errors.tension && <p className="error-text">{errors.tension}</p>}
            </div>

            <div className="half">
              <label>Fréquence cardiaque</label>
              <input
                type="text"
                name="frequence"
                value={formData.frequence}
                onChange={handleChange}
                placeholder="bpm"
              />  {errors.frequence && <p className="error-text">{errors.frequence}</p>}
            </div>
          </div>

          <div className="row">
            <div className="half">
              <label>Test</label>
              <select name="test" value={formData.test} onChange={handleChange}>
                <option value="">--Sélectionner--</option>
                <option value="Regulier">Régulier</option>
                <option value="Automatique">Automatique</option>
              </select> {errors.test && <p className="error-text">{errors.test}</p>}
            </div>

            <div className="half">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="">--Sélectionner--</option>
                <option value="prise_en_charge">Prise en charge</option>
                <option value="oriente">Orienté</option>
              </select>  {errors.status && <p className="error-text">{errors.status}</p>}
            </div>
          </div>

          <label>Maladie</label>
          <button type="button" className="maladieBTN" onClick={handleGoToMaladies}>
            +
          </button>
        </form>

        <div className="action-buttons">
          <button type="button" onClick={handleAddPrescription}>
               Ajouter ordonnance
               </button>
          <button type="button" className="enregistrer-button" onClick={handleSave}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddConsultation;


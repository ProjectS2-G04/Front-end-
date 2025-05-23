import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBareDocs from './SideBareDocs';
import './AddConsultation.css';

function AddConsultation() {
  const navigate = useNavigate();

  const patientInfo = {
    nom: 'Fezazi',
    prenom: 'Khadidja Amina',
  };

  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: today,
    temperature: '',
    poids: '',
    taille: '',
    sexe: '',
    tension: '',
    frequence: '',
    test: '',
    status: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const fullData = {
      ...patientInfo,
      ...formData,
    };
    console.log('Saving consultation:', fullData);
    // Send fullData to backend
  };

  return (
    <div className="consultation-container">
      <SideBareDocs />

      <div className="consultation-content">
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
          />

          <label>Température</label>
          <input
            type="text"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="°C"
          />

          <div className="row">
            <div className="half">
              <label>Poids</label>
              <input
                type="text"
                name="poids"
                value={formData.poids}
                onChange={handleChange}
                placeholder="kg"
              />
            </div>

            <div className="half">
              <label>Taille</label>
              <input
                type="text"
                name="taille"
                value={formData.taille}
                onChange={handleChange}
                placeholder="cm"
              />
            </div>
          </div>

          <div className="row">
            <div className="half">
              <label>Sexe</label>
              <select name="sexe" value={formData.sexe} onChange={handleChange}>
                <option value="">--Sélectionner--</option>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
              </select>
            </div>

            <div className="half">
              <label>Tension artérielle</label>
              <input
                type="text"
                name="tension"
                value={formData.tension}
                onChange={handleChange}
                placeholder="mmHg"
              />
            </div>

            <div className="half">
              <label>Fréquence cardiaque</label>
              <input
                type="text"
                name="frequence"
                value={formData.frequence}
                onChange={handleChange}
                placeholder="bpm"
              />
            </div>
          </div>

          <div className="row">
            <div className="half">
              <label>Test</label>
              <select name="test" value={formData.test} onChange={handleChange}>
                <option value="">--Sélectionner--</option>
                <option value="Régulier">Régulier</option>
                <option value="Automatique">Automatique</option>
              </select>
            </div>

            <div className="half">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="">--Sélectionner--</option>
                <option value="Prise en charge">Prise en charge</option>
                <option value="Orienté">Orienté</option>
              </select>
            </div>
          </div>

          <label>Maladie</label>
          <button type="button" className="maladieBTN" onClick={() => navigate('/AddDisease')}>
            +
          </button>
        </form>

        <div className="action-buttons">
        <button type="button" onClick={() => navigate('/MedicalPrescription')}>
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

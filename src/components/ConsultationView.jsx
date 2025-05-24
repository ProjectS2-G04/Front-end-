import React from 'react';
import SideBareDocs from './SideBareDocs';
import './ConsultationView.css';
import { useNavigate } from 'react-router-dom';

function ConsultationView() {
  const navigate = useNavigate();

  const formData = {
    nom: 'Fezazi',
    prenom: 'Khadidja Amina',
    naissance: '21-09-2004',
    temperature: '37 C°',
    poids: '60Kg',
    taille: '1.65 cm',
  };

  return (
    <div className="patient-details-container">
      <SideBareDocs />

      <div className="patient-details-content">
        <form className="form-card">
          <label>Nom</label>
          <input name="nom" value={formData.nom} readOnly />

          <label>Prénom</label>
          <input name="prenom" value={formData.prenom} readOnly />

          <label>Date de naissance</label>
          <input name="naissance" value={formData.naissance} readOnly />

          <label>Température</label>
          <input name="temperature" value={formData.temperature} readOnly />

          <div className="row">
            <div className="half">
              <label>Poids</label>
              <input name="poids" value={formData.poids} readOnly />
            </div>
            <div className="half">
              <label>Taille</label>
              <input name="taille" value={formData.taille} readOnly />
            </div>
          </div>
        </form>


        <div className="action-buttons">
          <button
            className="see-button"
            onClick={() => navigate('/PrescriptionPrint/:id/')}
          >
            Voir ordonnance
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsultationView;

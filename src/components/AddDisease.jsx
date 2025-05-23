import React, { useState } from 'react';
import './AddDisease.css';
import { useNavigate } from 'react-router-dom';
import SideBareDocs from './SideBareDocs';

function AddDisease() {
  const navigate = useNavigate();
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const handleToggle = (disease) => {
    setSelectedDiseases((prev) =>
      prev.includes(disease)
        ? prev.filter((d) => d !== disease)
        : [...prev, disease]
    );
  };

  const handleSave = () => {
    console.log('Selected diseases:', selectedDiseases);
    navigate(-1);
  };

  const renderCheckbox = (label) => (
    <label className="checkbox-label" key={label}>
      <input
        type="checkbox"
        checked={selectedDiseases.includes(label)}
        onChange={() => handleToggle(label)}
      />
      {label}
    </label>
  );

  return (
    <div className="disease-container">
      <SideBareDocs />

      <div className="disease-content">
        <div className="disease-card">
          <div className="column">
            <h3>Maladies chroniques</h3>

            <h4>Maladie Respiratoires</h4>
            <div className="maladies">
              {renderCheckbox('Asthme')}
              {renderCheckbox('Allergie')}
              {renderCheckbox('Tuberculose')}
              {renderCheckbox('Inflammation des poumons')}
            </div>

            <h4>Maladie cardiaque</h4>
            <div className="maladies">
              {renderCheckbox('Hypertension artérielle')}
              {renderCheckbox('Rhumatisme articulaire')}
              {renderCheckbox('Rhumatisme articulaire aigu')}
              {renderCheckbox('Trouble du rythme cardiaque')}
            </div>

            <h4>Maladie du système digestif</h4>
            <div className="maladies">
              {renderCheckbox('Hépatite')}
              {renderCheckbox('Maladie de Crohn')}
              {renderCheckbox('Maladie cœliaque')}
              {renderCheckbox('Ulcère gastrique')}
            </div>

            <h4>Appareil ORL (oreilles, nez, gorge)</h4>
            <div className="maladies">
              {renderCheckbox('Sinusite')}
              {renderCheckbox('Angine')}
            </div>

            <h4>Maladies mentales</h4>
            <div className="maladies">
              {renderCheckbox('Dépression')}
              {renderCheckbox('Trouble obsessionnel-compulsif')}
              {renderCheckbox('Trouble bipolaire')}
              {renderCheckbox('Autre')}
            </div>
          </div>

          <div className="column">
            <h3>Maladies contagieuses</h3>
            <div className="maladies">
              {renderCheckbox('Type de maladie infectieuse')}
              {renderCheckbox('VIH/SIDA')}
              {renderCheckbox('Grippe saisonnière')}
              {renderCheckbox('Hépatite virale')}
              {renderCheckbox('Tuberculose pulmonaire')}
              {renderCheckbox('COVID-19')}
              {renderCheckbox('Autre')}
            </div>
          </div>
        </div>

        <div className="disease-footer">
          <button className="save-btn" onClick={handleSave}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDisease;

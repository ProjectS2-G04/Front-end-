import React, { useState } from 'react';
import './AddDisease.css';
import { useNavigate } from 'react-router-dom';
import SideBareDocs from './SideBareDocs';

function AddDisease() {
  const navigate = useNavigate();
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const handleToggle = (label, subLabel = null) => {
    const entry = subLabel ? [label, subLabel] : label;
    const alreadySelected = selectedDiseases.some(d =>
      Array.isArray(d) ? (d[0] === label && d[1] === subLabel) : d === label
    );

    if (alreadySelected) {
      setSelectedDiseases(prev =>
        prev.filter(d =>
          Array.isArray(d)
            ? !(d[0] === label && d[1] === subLabel)
            : d !== label
        )
      );
    } else {
      setSelectedDiseases(prev => [...prev, entry]);
    }
  };

  const isChecked = (label, subLabel = null) => {
    return selectedDiseases.some(d =>
      Array.isArray(d) ? (d[0] === label && d[1] === subLabel) : d === label
    );
  };

 const handleSave = async () => {
  // Load previous form data
  const formData = JSON.parse(localStorage.getItem("consultation_form_data"));

  // Extract selected diseases
  const maladies_croniques = selectedDiseases
    .filter(d => Array.isArray(d))
    .map(([nom, sub_nom]) => ({ nom, sub_nom }));

  const maladies_contagieuses = selectedDiseases
    .filter(d => typeof d === 'string');

  // Combine into full payload
  const payload = {
    ...formData,
    maladies_croniques,
    maladies_contagieuses
  };

  try {
    //const rendezvousId = localStorage.getItem("rendezvous_id"); // You must save this in AddConsultation
    const response = await fetch(`http://localhost:8000/api/consultation/7/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // include Authorization header if needed
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Consultation créée avec succès !");
      localStorage.removeItem("consultation_form_data");
      localStorage.removeItem("maladies_selectionnees");
      navigate("/AddConsultation/7/"); // Or your desired page
    } else {
      alert(data.error || "Erreur lors de la création");
    }
  } catch (error) {
    console.error("Erreur réseau", error);
    alert("Erreur réseau");
  }
};


  const renderCheckbox = (category, disease) => (
    <label className="checkbox-label" key={`${category}-${disease}`}>
      <input
        type="checkbox"
        checked={isChecked(category, disease)}
        onChange={() => handleToggle(category, disease)}
      />
      {disease}
    </label>
  );

  const renderSimpleCheckbox = (disease) => (
    <label className="checkbox-label" key={disease}>
      <input
        type="checkbox"
        checked={isChecked(disease)}
        onChange={() => handleToggle(disease)}
      />
      {disease}
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
              {renderCheckbox('Maladie Respiratoires', 'Asthme')}
              {renderCheckbox('Maladie Respiratoires', 'Allergie')}
              {renderCheckbox('Maladie Respiratoires', 'Tuberculose')}
              {renderCheckbox('Maladie Respiratoires', 'Inflammation des poumons')}
            </div>

            <h4>Maladie cardiaque</h4>
            <div className="maladies">
              {renderCheckbox('Maladie cardiaque', 'Hypertension artérielle')}
              {renderCheckbox('Maladie cardiaque', 'Rhumatisme articulaire')}
              {renderCheckbox('Maladie cardiaque', 'Rhumatisme articulaire aigu')}
              {renderCheckbox('Maladie cardiaque', 'Trouble du rythme cardiaque')}
            </div>

            <h4>Maladie du système digestif</h4>
            <div className="maladies">
              {renderCheckbox('Maladie du système digestif', 'Hépatite')}
              {renderCheckbox('Maladie du système digestif', 'Maladie de Crohn')}
              {renderCheckbox('Maladie du système digestif', 'Maladie cœliaque')}
              {renderCheckbox('Maladie du système digestif', 'Ulcère gastrique')}
            </div>

            <h4>Appareil ORL (oreilles, nez, gorge)</h4>
            <div className="maladies">
              {renderCheckbox('Appareil ORL', 'Sinusite')}
              {renderCheckbox('Appareil ORL', 'Angine')}
            </div>

            <h4>Maladies mentales</h4>
            <div className="maladies">
              {renderCheckbox('Maladies mentales', 'Dépression')}
              {renderCheckbox('Maladies mentales', 'Trouble obsessionnel-compulsif')}
              {renderCheckbox('Maladies mentales', 'Trouble bipolaire')}
              {renderCheckbox('Maladies mentales', 'Autre')}
            </div>
          </div>

          <div className="column">
            <h3>Maladies contagieuses</h3>
            <div className="maladies">
              {renderSimpleCheckbox('Type de maladie infectieuse')}
              {renderSimpleCheckbox('VIH/SIDA')}
              {renderSimpleCheckbox('Grippe saisonnière')}
              {renderSimpleCheckbox('Hépatite virale')}
              {renderSimpleCheckbox('Tuberculose pulmonaire')}
              {renderSimpleCheckbox('COVID-19')}
              {renderSimpleCheckbox('Autre')}
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


import React, { useState } from 'react';
import './MedicalPrescription.css';
import SideBareDocs from './SideBareDocs';

function MedicalPrescription() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
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

  return (
    <div className="medeciel-container">
      <div className="app-layout">
        <SideBareDocs />

        <main className="prescription-content">
          <h1 className="title">Ordonnance médicale</h1>
          <div className="form-grid">
            <div className="form-group">
              <label>Nom</label>
              <input name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Âge</label>
              <input name="age" value={formData.age} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input name="firstName" value={formData.firstName} onChange={handleInputChange} />
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
            <button className="save-btn">Enregistrer</button>
            <button className="print-btn" onClick={handlePrint}>Imprimer</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MedicalPrescription;

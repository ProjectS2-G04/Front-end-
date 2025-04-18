import React from 'react';
import './PrescriptionPrint.css';
import logo from '../assets/logo.png';

function OrdonnancePrint({
  patient = {},
  medications = [
    { name: '', dosage: '', duration: '' },
  ],
}) {
  const {
    lastName = '',
    firstName = '',
    age = '',
    date = new Date().toLocaleDateString('fr-FR'),
  } = patient;

  return (
    <div className="ordonnance-print">
      <header className="ordonnance-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="ordonnance-title">Ordonnance médicale</h1>
        </div>
        <section className="patient-info">
        <p><strong>Nom :</strong> {lastName}</p>
        <p><strong>Prénom :</strong> {firstName}</p>
        <p><strong>Âge :</strong> {age} ans</p>
        <p><strong>Date :</strong> {date}</p>
      </section>
      </header>

     

      <section className="medication-table">
        <table>
          <thead>
            <tr>
              <th>Médicaments</th>
              <th>Posologie</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, index) => (
              <tr key={index}>
                <td>{med.name}</td>
                <td>{med.dosage}</td>
                <td>{med.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="signature">Signature</div>
      </section>
    </div>
  );
}

export default OrdonnancePrint;

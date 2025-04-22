import React, { useState, useEffect } from 'react';
import './TakeAppointment.css';
import PatientSideBare from './PatientSideBare';

export default function TAkeAppointment() {
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchPatientId = async () => {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');

      try {
        const res = await fetch(`http://localhost:8000/api/accounts/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        const patient = data.find((user) => user.email === email);
        if (!patient) {
          console.error('Patient not found');
          return;
        }

        setPatientId(patient.id);
        console.log('Patient ID:', patient.id);
      } catch (error) {
        console.error('Error fetching patient ID:', error);
      }
    };

    fetchPatientId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const date = e.target.date.value;
    const motif = e.target.motif.value;
    const description = e.target.description.value;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/rendez-vous/demande/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date_demandee: date,
          motif: motif,
          description: description,
          patient: patientId,
          age: 19 // modify this later
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur:', errorData);
        if (response.status === 400) {
          alert('Erreur de validation. Veuillez vérifier vos données.');
        } else if (response.status === 401) {
          alert('Non autorisé. Veuillez vous connecter à nouveau.');
        } else if (response.status === 500) {
          alert('Erreur interne du serveur. Veuillez réessayer plus tard.');
        } else {
          alert('Une erreur inconnue est survenue. Veuillez réessayer.');
        }
        return;
      } else {
        const resData = await response.json();
        console.log('Demande envoyée !', resData);
        alert('Demande envoyée avec succès !');
      }
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      alert('Erreur lors de la soumission. Veuillez réessayer.');
    }
  };

  return (
    <div className="app">
      <PatientSideBare />
      <div className="rendezvous-container">
        <h2 className="title">Demande de rendez vous</h2>
        <form className="rendezvous-form" onSubmit={handleSubmit}>
          <label htmlFor="date">Date demandée</label>
          <input type="date" id="date" name="date" />

          <label htmlFor="motif">Motif</label>
          <input type="text" id="motif" name="motif" placeholder="Motif de la demande" />

          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="5" placeholder="Description..."></textarea>

          <button type="submit" className="submit-btn">Envoyer</button>
        </form>
      </div>
    </div>
  );
}
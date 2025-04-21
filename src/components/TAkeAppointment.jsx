import React from 'react';
import './TakeAppointment.css';
import PatientSideBare from './PatientSideBare'; 

export default function TAkeAppointment() {
  return (
    <div className="app">
      <PatientSideBare />
      <div className="rendezvous-container">
        <h2 className="title">Demande de rendez vous</h2>
        <form className="rendezvous-form">
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
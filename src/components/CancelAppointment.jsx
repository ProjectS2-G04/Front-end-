import React from "react";
import "./CancelAppointment.css";
import PatientSideBare from './PatientSideBare';

function CancelAppointment() {
  return (
    <div className="app-layout"> {/* This will be a flex container */}

      <PatientSideBare /> {/* Sidebar */}

      <div className="cancel-container"> {/* Main content */}
        <h2 className="cancel-header">Annuler un rendez-vous</h2>

        <div className="cancel-form">
          <label htmlFor="date">Date annulée</label>
          <input type="date" id="date" className="cancel-input" />

          <label htmlFor="reason">Motif</label>
          <textarea id="reason" rows="4" className="cancel-textarea" />

          <button className="cancel-submit">Envoyer</button>
        </div>
      </div>
    </div>
  );
}

export default CancelAppointment;

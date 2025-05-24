import React, { useEffect, useState } from 'react';
import './ConsultationList.css';
import { useNavigate } from 'react-router-dom'; 
import SideBareDocs from './SideBareDocs';

function ConsultationList() {
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mocking a fetch call here — replace with real API later
    const fetchConsultations = async () => {
      // Simulate backend data structure
      const response = [
        { id: '1', date: '2025-03-03', patient: 'Patient 1' },
        { id: '2', date: '2025-04-20', patient: 'Patient 2' },
        { id: '3', date: '2025-10-31', patient: 'Patient 3' },
        { id: '4', date: '2025-12-02', patient: 'Patient 4' }
      ];

      // Sort by date
      const sorted = response.sort((a, b) => new Date(a.date) - new Date(b.date));
      setConsultations(sorted);
    };

    fetchConsultations();
  }, []);

  return (
    <div className="medeciel-container">
      <div className="app-layout">
        <SideBareDocs />

        <main className="consultation-content">
          <h1>La liste des Consultations</h1>

          <div className="divider"></div>

          {/* Consultations List */}
          <div className="consultation-list">
            {consultations.map((consultation) => (
              <div key={consultation.id} className="consultation-card">
                <div className="consultation-header">
                  <span className="consultation-date">
                    {new Date(consultation.date).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="consultation-patient">{consultation.patient}</span>
                </div>
                <button 
                  className="view-btn" 
                  onClick={() => navigate('/ConsultationView')}
                >
                  Voir consultation
                </button>
              </div>
            ))}
          </div>

          {/* Add Consultation Button */}
          <div className="add-consultation">
            <button 
              className="add-btn" 
              onClick={() => navigate('/AddConsultation')}
            >
              Ajouter une consultation
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ConsultationList;
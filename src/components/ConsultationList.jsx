import React, { useEffect, useState } from 'react';
import './ConsultationList.css';
import { useNavigate, useParams } from 'react-router-dom'; 
import SideBareDocs from './SideBareDocs';

function ConsultationList() {
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // get patient_id from URL

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/consultation/patient/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch consultations");
        }

        const data = await response.json();

        // Sort by date
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setConsultations(sorted);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchConsultations();
  }, [id]);


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
                         onClick={() => navigate(`/ConsultationView/${consultation.consultation_id}`)}>
                              Voir consultation
                                 </button>
              </div>
            ))}
          </div>

          {/* Add Consultation Button */}
          <div className="add-consultation">
            <button 
              className="add-btn" 
              onClick={() => navigate(`/AddConsultation/${id}/`)}
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
import React, { useEffect, useState } from 'react';
import './PrescriptionList.css';
import { useNavigate } from 'react-router-dom'; 
import SideBareDocs from './SideBareDocs';

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Mocking a fetch call here — replace with real API later
    const fetchPrescriptions = async () => {
      // Simulate backend data structure
      const response = [
        { id: 'n/oa/2025/001', date: '2025-04-20' },
        { id: 'n/oa/2025/002', date: '2025-10-31' },
        { id: 'n/oa/2025/003', date: '2025-12-01' }
      ];

      // Optional: Sort by date
      const sorted = response.sort((a, b) => new Date(a.date) - new Date(b.date));
      setPrescriptions(sorted);
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="medeciel-container">
      <div className="app-layout">
        <SideBareDocs />

        <main className="prescription-content">
          <h1>La liste des ordonnances</h1>
          <div className="prescription-list">
            {prescriptions.map((prescription, index) => (
              <div key={index} className="prescription-card">
                <div className="prescription-header">
                  <span className="prescription-date">
                    {new Date(prescription.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <button className="view-btn" onClick={() => navigate('/PrescriptionPrint')} >Voir ordonnance</button>
              </div>
            ))}
          </div>

          <div className="add-prescription">
            <button className="add-btn" onClick={() => navigate('/MedicalPrescription')}
            >Ajouter une ordonnance</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrescriptionList;

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
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found.');
        }
    
        const response = await fetch('http://127.0.0.1:8000/api/rendez-vous/list/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch prescriptions: ${response.status}`);
        }
    
        const data = await response.json();
    
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setPrescriptions(sorted);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
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
                <button className="view-btn" onClick={() => navigate(`/PrescriptionPrint/${prescription.id}`)}>
                   Voir ordonnance
                    </button>
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

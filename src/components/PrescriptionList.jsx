import React, { useEffect, useState } from 'react';
import './PrescriptionList.css';
import SideBareDocs from './SideBareDocs';
import { useLocation,useNavigate, useParams } from 'react-router-dom';

function PrescriptionList() {
  const { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // ajouté ici
  const [error, setError] = useState(null); // ajouté ici
  const navigate = useNavigate();

  const location = useLocation();
  const nom = location.state?.nom;
  const prenom =location.state?.prenom

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found.');
        }
  
        const response = await fetch(`http://127.0.0.1:8000/api/rendez-vous/ordonnances-dossier/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch prescriptions: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.length === 0) {
          setPrescriptions([]); // no ordonnance
        } else {
          const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
          setPrescriptions(sorted);
        }
  
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPrescriptions();
  }, [id]);

  return (
    <div className="medeciel-container">
      <div className="app-layout">
        <SideBareDocs />

        <main className="prescription-content">
          <h1>La liste des ordonnances</h1>
          <div className="prescription-list">
  {isLoading ? (
    <p>Chargement...</p>
  ) : error ? (
    <p className="error">{error}</p>
  ) : prescriptions.length === 0 ? (
    <p>Aucune ordonnance trouvée.</p>
  ) : (
    prescriptions.map((prescription, index) => (
      <div key={index} className="prescription-card">
        <div className="prescription-header">
          <span className="prescription-date">
            {new Date(prescription.date).toLocaleDateString('fr-FR')}
          </span>
        </div>
        <button
          className="view-btn"
          onClick={() => navigate(`/PrescriptionPrint/${prescription.id}`)}
        >
          Voir ordonnance
        </button>
      </div>
    ))
  )}
</div>
   

          <div className="add-prescription">
          <button className="add-btn" onClick={() => navigate(`/MedicalPrescription/${id}` ,{ state: { nom: nom , prenom : prenom } })}>
            Ajouter une ordonnance</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrescriptionList;

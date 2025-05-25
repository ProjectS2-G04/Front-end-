import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PrescriptionPrint.css';
import logo from '../assets/logo.png';

function OrdonnancePrint() {
  const { id } = useParams();
  const [ordonnance, setOrdonnance] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdonnance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/rendez-vous/list/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Ordonnance non trouvée pour cette consultation.');
        } else {
          setOrdonnance(data);
        }
      } catch (error) {
        setError('Erreur lors de la récupération de l\'ordonnance.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdonnance();
  }, [id]);

  if (loading) return <div>Chargement...</div>;

  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  if (!ordonnance) return <div>chargement ....</div>;

  const {
    patient_prenom,
    patient_nom,
    age,
    date,
    medicaments,
  } = ordonnance;

  return (
    <div className="ordonnance-print">
      <header className="ordonnance-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="ordonnance-title">Ordonnance médicale</h1>
        </div>
        <section className="patient-info">
          <p><strong>Nom :</strong> {patient_nom}</p>
          <p><strong>Prénom :</strong> {patient_prenom}</p>
          <p><strong>Âge :</strong> {age} ans</p>
          <p><strong>Date :</strong> {new Date(date).toLocaleDateString('fr-FR')}</p>
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
            {medicaments.map((med, index) => (
              <tr key={index}>
                <td>{med.nom}</td>
                <td>{med.posologie}</td>
                <td>{med.duree}</td>
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



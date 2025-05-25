import React, { useState, useEffect } from 'react'; // ✅ Import manquant
import SideBareDocs from './SideBareDocs';
import './ConsultationView.css';
import { useNavigate , useParams } from 'react-router-dom';

function ConsultationView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    temperature: '',
    poids: '',
    taille: '',
    date: '',
    ordonnance_exist:'',
  });

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/consultation/detail/${id}/`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Erreur lors du chargement de la consultation :', error);
      }
    };

    fetchConsultation();
  }, [id]);

  return (
    <div className="patient-details-container">
      <SideBareDocs />

      <div className="patient-details-content">
        <form className="form-card">
          <label>Nom</label>
          <input name="nom" value={formData.nom} readOnly />

          <label>Prénom</label>
          <input name="prenom" value={formData.prenom} readOnly />

          <label>Date de consultation</label>
          <input name="date" value={formData.date ? new Date(formData.date).toLocaleDateString('fr-FR') : ''} readOnly />

          <label>Température</label>
          <input name="temperature" value={formData.temperature + ' °C'} readOnly />

          <div className="row">
            <div className="half">
              <label>Poids</label>
              <input name="poids" value={formData.poids + ' kg'} readOnly />
            </div>
            <div className="half">
              <label>Taille</label>
              <input name="taille" value={formData.taille + ' cm'} readOnly />
            </div>
          </div>
        </form>
       <div className="action-buttons">
  {formData.ordonnance_exist ? (
    <button
      className="see-button"
      onClick={() => navigate(`/PrescriptionPrint/${id}`)}
    >
      Voir ordonnance
    </button>
  ) : (
    <div className="no-ordonnance-container">
      <button className="no-ordonnance-button" disabled>
        Aucune ordonnance n'est associée à cette consultation.
      </button>
    </div>
  )}
</div>
  </div> {/* <-- fermeture manquante */}
  </div>        
  );
}

export default ConsultationView;



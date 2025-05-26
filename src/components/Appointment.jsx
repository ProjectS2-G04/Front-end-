import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Appointment.css';
import SideBareDocs from './SideBareDocs';

function AppointmentForm() {
  const location = useLocation();
  const idPatient = location.state?.idPatient;
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    description: '',
    date: '',
    heure_debut: '',
    heure_fin: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    const selectedDate = new Date(formData.date);

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    } else if (selectedDate < today) {
      newErrors.date = 'La date doit être aujourd\'hui ou dans le futur';
    }

    if (!formData.heure_debut) {
      newErrors.heure_debut = 'L\'heure de début est requise';
    } else {
      const [hours, minutes] = formData.heure_debut.split(':').map(Number);
      if (hours < 8) {
        newErrors.heure_debut = 'L\'heure de début doit être après 8h du matin';
      }
    }

    if (!formData.heure_fin) {
      newErrors.heure_fin = 'L\'heure de fin est requise';
    } else {
      const [hours, minutes] = formData.heure_fin.split(':').map(Number);
      if (hours >= 17) {
        newErrors.heure_fin = 'L\'heure de fin doit être avant 17h';
      }
    }

    if (formData.heure_debut && formData.heure_fin && formData.heure_debut >= formData.heure_fin) {
      newErrors.heure_fin = 'L\'heure de fin doit être après l\'heure de début';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        try {
            if (!idPatient) {
                console.error('idPatient is missing:', idPatient);
                alert('ID Patient is missing.');
                return;
            }

            const userResponse = await fetch(`http://127.0.0.1:8000/api/dossier-medicale/dossiers/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!userResponse.ok) {
                const errorText = await userResponse.text();
                console.error('Failed to fetch dossiers:', errorText);
                alert(`Failed to fetch user information: ${errorText}`);
                return;
            }

            const dossiers = await userResponse.json();
            const dossier = dossiers.find((d) => d.user === idPatient);

            if (!dossier) {
                console.error('No dossier found for idPatient:', idPatient);
                alert('No dossier found for the given user ID. Please create a medical dossier first.');
                navigate('/CreateFormPatient', { state: { patientId: idPatient } });
                return;
            }

            const userId = dossier.user;
            const requestBody = {
                description: formData.description,
                date: formData.date,
                heure_debut: formData.heure_debut,
                heure_fin: formData.heure_fin,
            };

            const response = await fetch(
                `http://127.0.0.1:8000/api/rendez-vous/createrenderVousMedAss/${userId}/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const errorText = await response.text();
                console.error('Non-JSON response:', errorText);
                alert(`Server returned an unexpected response: ${errorText.substring(0, 200)}...`);
                return;
            }

            const data = await response.json();
            if (response.ok) {
                alert('Rendez-vous créé avec succès!');
                handleCancel();
            } else {
                alert(`Erreur lors de la création du rendez-vous: ${JSON.stringify(data, null, 2)}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Une erreur s'est produite: ${error.message}`);
        }
    }
};
  const handleCancel = () => {
    setFormData({
      description: '',
      date: '',
      heure_debut: '',
      heure_fin: ''
    });
    setErrors({});
    navigate('/PatientList'); 
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="medeciel-container">
      <div className="app-layout">
        <SideBareDocs />

        <main className="appointment-form">
          <h1>Rendez-vous</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="description">Description de rendez-vous</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date de rendez-vous</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                required
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="time-inputs">
              <div className="form-group">
                <label htmlFor="heure_debut">Heure de début (après 8h)</label>
                <input
                  type="time"
                  id="heure_debut"
                  name="heure_debut"
                  value={formData.heure_debut}
                  onChange={handleChange}
                  min="08:00"
                  max="16:59"
                  required
                />
                {errors.heure_debut && <span className="error-message">{errors.heure_debut}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="heure_fin">Heure de fin (avant 17h)</label>
                <input
                  type="time"
                  id="heure_fin"
                  name="heure_fin"
                  value={formData.heure_fin}
                  onChange={handleChange}
                  min="08:01"
                  max="17:00"
                  required
                />
                {errors.heure_fin && <span className="error-message">{errors.heure_fin}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Annuler
              </button>
              <button type="submit" className="submit-btn">
                Ajouter
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default AppointmentForm;
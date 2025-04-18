import React, { useState } from 'react';
import './Appointment.css';
import SideBareDocs from './SideBareDocs';

function AppointmentForm() {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    startTime: '',
    endTime: ''
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
    
    // Reset time parts for comparison
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    // Validate date
    if (!formData.date) {
      newErrors.date = 'La date est requise';
    } else if (selectedDate < today) {
      newErrors.date = 'La date doit être aujourd\'hui ou dans le futur';
    }
    
    // Validate start time
    if (!formData.startTime) {
      newErrors.startTime = 'L\'heure de début est requise';
    } else {
      const [hours, minutes] = formData.startTime.split(':').map(Number);
      if (hours < 8) {
        newErrors.startTime = 'L\'heure de début doit être après 8h du matin';
      }
    }
    
    // Validate end time
    if (!formData.endTime) {
      newErrors.endTime = 'L\'heure de fin est requise';
    } else {
      const [hours, minutes] = formData.endTime.split(':').map(Number);
      if (hours >= 17) {
        newErrors.endTime = 'L\'heure de fin doit être avant 17h';
      }
    }
    
    // Validate end time is after start time
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'L\'heure de fin doit être après l\'heure de début';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      console.log('Appointment data:', formData);
      // Ajoutez ici votre logique pour envoyer les données au serveur
    }
  };

  const handleCancel = () => {
    setFormData({
      description: '',
      date: '',
      startTime: '',
      endTime: ''
    });
    setErrors({});
  };

  // Set minimum date for date picker (today)
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
                <label htmlFor="startTime">Heure de début (après 8h)</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  min="08:00"
                  max="16:59"
                  required
                />
                {errors.startTime && <span className="error-message">{errors.startTime}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="endTime">Heure de fin (avant 17h)</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  min="08:01"
                  max="17:00"
                  required
                />
                {errors.endTime && <span className="error-message">{errors.endTime}</span>}
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
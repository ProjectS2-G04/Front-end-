import React, { useState, useEffect } from 'react';
import PatientSideBare from './PatientSideBare';
import './Notification.css';

function Notification() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/notifications/afficher_mes_notifications/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error('Erreur lors de la récupération des notifications');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notifications/supprimer/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        setData(data.filter(notification => notification.id !== id));
        setMessage('Notification supprimée avec succès');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div className="app">
      <PatientSideBare />
      <div className="notifications-container">
        <h2 className="title">Notifications</h2>

        {/* ✅ Display message here */}
        {message && (
          <div className="alert-message">
            {message}
          </div>
        )}

        {data.map((msg, i) => (
          <div key={i} className="notification">
            <span>{msg.message}</span>
            <button className="delete-btn" onClick={() => handleDelete(msg.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;

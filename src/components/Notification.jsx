import React, { useState, useEffect } from 'react';
import PatientSideBare from './PatientSideBare';
import './Notification.css' 

function Notification() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      
      const token = localStorage.getItem('token'); 
      console.log("Token utilisé:", token);
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

  
  return (
    <div className="app">
    <PatientSideBare />
    <div className="notifications-container">
      <h2 className="title">Notifications</h2>
     {data.map((msg, i) => (
  <div key={i} className="notification">
    <span>{msg.message}</span> {/* ✅ Just the message field */}
    <button className="delete-btn">Supprimer</button>
     </div>
     ))}

    </div>
  </div>
  )
}

export default Notification
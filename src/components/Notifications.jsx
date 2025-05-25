import React, { useState } from 'react';
import SideBareDocs from './SideBareDocs';
import './Notifications.css';
import { Calendar } from 'lucide-react';

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      nom: 'Mohamed Amin',
      date: '25/06/2025',
      heure: '08:00',
      lu: false,
    },
    {
      id: 2,
      nom: 'Mohamed Amin',
      date: '25/06/2025',
      heure: '08:00',
      lu: false,
    },
    {
      id: 3,
      nom: 'Mohamed Amin',
      date: '25/06/2025',
      heure: '08:00',
      lu: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, lu: true } : notif
      )
    );
  };

  return (
    <div className="notifications-page">
      <SideBareDocs />

      <div className="notifications-content">
        <h2>Notifications</h2>
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification-item ${notif.lu ? 'read' : ''}`}>
            <div className="notif-message">
              <Calendar className="notif-icon" />
              <strong>{notif.nom}</strong> a demandé un rendez-vous le <strong>{notif.date}</strong> à <strong>{notif.heure}</strong>
            </div>

            {!notif.lu && (
              <button className="mark-read-btn" onClick={() => markAsRead(notif.id)}>
                Marque comme lu
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;

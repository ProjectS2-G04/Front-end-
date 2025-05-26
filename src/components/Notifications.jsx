import React, { useState, useEffect } from 'react';
import SideBareDocs from './SideBareDocs';
import './Notifications.css';
import { Calendar } from 'lucide-react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/notifications/afficher_mes_notifications/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Erreur de récupération');
      }
    } catch (err) {
      console.error('Erreur réseau:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    const token = localStorage.getItem('token');
    try {
      // Optional backend call to mark as read
      await fetch(`http://127.0.0.1:8000/api/notifications/marquer_comme_lu/${id}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Update frontend state
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-page">
      <SideBareDocs />

      <div className="notifications-content">
        <h2>Notifications</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : notifications.length === 0 ? (
          <p>Aucune notification.</p>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className={`notification-item ${notif.is_read ? 'read' : ''}`}>
              <div className="notif-message">
                <Calendar className="notif-icon" />
                <span>{notif.message}</span>
              </div>

              {/* 👇 Only show this button if NOT read */}
              {!notif.is_read && (
                <button className="mark-read-btn" onClick={() => markAsRead(notif.id)}>
                  Marquer comme lu
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;

import React ,{ useState } from 'react'
import PatientSideBare from './PatientSideBare';
import './Notification.css' 

function Notification() {
  const [data, setData] = useState([
    "Le rendez vous de la date 11/03/2025 est confirmée",
    "Le rendez vous de la date 11/03/2025 est confirmée",
    "Le rendez vous de la date 18/03/2025 est reportée à la date 23/03/2025",
    "Le rendez vous de la date 18/03/2025 est reportée à la date 23/03/2025",
    "Le rendez vous de la date 18/03/2025 est reportée à la date 23/03/2025",
  ]);
  const supprimerNotification = (indexASupprimer) => {
    const nouvellesNotifications = data.filter((_, index) => index !== indexASupprimer);
    setData(nouvellesNotifications);
  };

  
  return (
    <div className="app">
    <PatientSideBare />
    <div className="notifications-container">
      <h2 className="title">Notifications</h2>
      {data.map((msg, i) => (
        <div key={i} className="notification">
          <span>{msg}</span>
          <button className="delete-btn" >Supprimer</button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Notification
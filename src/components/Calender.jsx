import React, { useState, useEffect } from 'react';
import './Calender.css';
import SideBareDocs from './SideBareDocs';

const timeSlots = [
  "8-9 Am", "9-10 Am", "10-11 Am", "11-12 Am", "12-1 Pm",
  "1-2 Pm", "2-3 Pm", "3-4 Pm", "4-5 Pm"
];

const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const getWeekDates = (startDate) => {
  const week = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay());
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    week.push(day);
  }
  return week;
};

const Calendar = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [appointments, setAppointments] = useState({});
  const [popup, setPopup] = useState(null); // { x, y, day, time }
  const [activeTab, setActiveTab] = useState(null); // Added for SideBareDocs

  const today = new Date();
  const currentWeek = new Date(today.setDate(today.getDate() + weekOffset * 7));
  const weekDates = getWeekDates(currentWeek);

  const handleCellClick = (day, timeIndex, event) => {
    // Check if the clicked date and time is in the past
    const clickedDate = new Date(weekDates[day]);
    clickedDate.setHours(timeIndex + 8); // Set the time (8am to 5pm)

    // If clicked date and time are in the past, do nothing
    if (clickedDate < new Date()) {
      return;
    }

    const rect = event.target.getBoundingClientRect();
    setPopup({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      day,
      time: timeIndex,
    });
  };

  const setStatus = (status) => {
    const key = `${popup.day}-${popup.time}`;
    setAppointments((prev) => ({
      ...prev,
      [key]: status === 'clear' ? undefined : status,
    }));
    setPopup(null);
  };

  const getCellClass = (day, time) => {
    const key = `${day}-${time}`;
    const status = appointments[key];
  
    if (status === 'termine') return 'done';
    if (status === 'reserve') return 'reserved';
    if (status === 'grise') return 'lunch';
  
    // Handle lunch and weekend
    if (time === 4) return 'lunch';
    if (day === 5 || day === 6) return 'weekend';
  
    const clickedDate = new Date(weekDates[day]);
    clickedDate.setHours(time + 8);
    if (clickedDate < new Date()) return 'past';
  
    return '';
  };
        

  const fetchPlagesHoraires = async (startDate, endDate) => {
    try {
      const token = localStorage.getItem("token"); 
      const res = await fetch(`http://127.0.0.1:8000/api/rendez-vous/plages_horaires/?start=${startDate}&end=${endDate}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Fetching plages horaires from:", `/api/rendez-vous/plages-horaires?start=${startDate}&end=${endDate}`);

      const text = await res.text(); 
      console.log("Raw response:", text);

      return JSON.parse(text);
    } catch (error) {
      console.error("Failed to fetch plages horaires:", error);
      return [];
    }
  };


  useEffect(() => {
    const loadAppointments = async () => {
      const start = weekDates[0].toISOString().split("T")[0];
      const end = weekDates[6].toISOString().split("T")[0];
      const data = await fetchPlagesHoraires(start, end);

      const newAppointments = {};

      data.forEach(plage => {
        const date = new Date(plage.date);
        const day = date.getDay();
        const startHour = parseInt(plage.heure_debut.split(":")[0]);
        const timeIndex = startHour - 8;

        const key = `${day}-${timeIndex}`;
        newAppointments[key] = plage.statut;
      });

      setAppointments(newAppointments);
    };

    loadAppointments();
  }, [weekOffset]);

  return (
    <div className="calendar-container">
      <SideBareDocs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        disableDropdown={false}
      />
      <div className="calender-wrapper">
        <div className="legend">
          <div><span className="box reserved"></span> Réservée</div>
          <div><span className="box done"></span> Terminée</div>
          <div><span className="box weekend"></span> hors travail</div>
        </div>
        <div className="calendar-header">
          <button onClick={() => setWeekOffset(weekOffset - 1)}>‹</button>
          <span>{weekDates[0].toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => setWeekOffset(weekOffset + 1)}>›</button>
        </div>

        <table className="calendar">
          <thead>
            <tr>
              <th>Temps</th>
              {weekDates.map((date, index) => (
                <th key={index}>
                  {dayNames[index]} <br />
                  {date.getDate()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, timeIdx) => (
              <tr key={timeIdx}>
                <td>{slot}</td>
                {weekDates.map((_, dayIdx) => (
                  <td
                    key={`${dayIdx}-${timeIdx}`}
                    className={getCellClass(dayIdx, timeIdx)}
                    onClick={(e) => handleCellClick(dayIdx, timeIdx, e)}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {popup && (
          <div
            className="popup"
            style={{ top: popup.y + 30, left: popup.x }}
          >
            <div onClick={() => setStatus('réservée')} className="popup-option reserved">Réservée</div>
            <div onClick={() => setStatus('terminée')} className="popup-option done">Terminée</div>
            <div onClick={() => setStatus('clear')} className="popup-option">Effacer</div>
          </div>
        )}
      </div>
    </div>
  );
};



export default Calendar;
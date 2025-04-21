import React, { useState } from 'react';
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
  start.setDate(start.getDate() - start.getDay()); // start on Sunday
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
  
    // Handle weekend and lunch slots
    if (status === 'terminée') return 'done';
    if (status === 'réservée') return 'reserved';
    if (time === 4) return 'lunch'; // Lunch break (12-1)
  
    // Weekends (Friday = 5, Saturday = 6)
    if (day === 5 || day === 6) return 'weekend';
  
    // Handle past days and times
    const clickedDate = new Date(weekDates[day]);
    clickedDate.setHours(time + 8); // Set the time (8am to 5pm)
  
    // Disable past days (grey out the entire day)
    if (clickedDate < new Date()) {
      return 'past'; // Past day or past time slot
    }
  
    return '';
  };

  return (
    <div className="calendar-container">
      <SideBareDocs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        disableDropdown={false} // Added props
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
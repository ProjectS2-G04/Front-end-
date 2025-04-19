import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import './SideBareDocs.css';

function SideBareDocs({ activeTab, setActiveTab, disableDropdown }) {
  const navigate = useNavigate();
 
  const rawRole = localStorage.getItem('role');
  const userRole = rawRole?.toUpperCase() || 'DOCTOR';
  console.log('Raw role from localStorage:', rawRole, 'Normalized:', userRole);

  const handlePatientListClick = () => {
    console.log('Navigating to PatientList');
    navigate('/PatientList');
  };

  const handleInboxClick = () => {
    console.log('Inbox clicked');
    navigate('/Demandes');
  };
  const handleCalendrierClick = () => {
    console.log('Inbox clicked');
    navigate('/Calender');
  };

  const handleDropdownChange = (e) => {
    const newTab = e.target.value;
    console.log('Dropdown changed to:', newTab, 'userRole:', userRole);
    setActiveTab(newTab);
    
    const targetPath = userRole === 'DOCTOR' ? '/DoctorList' : '/AssistantList';
    console.log('Navigating to:', targetPath);
    navigate(targetPath, { state: { activeTab: newTab } });
  };

  const handleProfileClick = () => {
    console.log('Navigating to Profile');
    navigate('/profile');
  };

  return (
    <div className="sidebardocs">
      <div className="sidebardocs-header">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebardocs-nav">
        <div className="options-todo">
          <button onClick={handlePatientListClick} className="sidebar-button">
            La liste patients
          </button>
          <select
            id="role-select"
            value={activeTab || 'etudiants'}
            onChange={handleDropdownChange}
            className="role-select"
            disabled={disableDropdown}
          >
            <option value="etudiants">Dossier médical d'étudiants</option>
            <option value="enseignants">Dossier médical d'enseignants</option>
            <option value="ats">Dossier médical d'ATS</option>
          </select>
          <button onClick={handleCalendrierClick} className="sidebar-button">
            calendrier
          </button>
          
          <button onClick={handleInboxClick} className="sidebar-button">
            Inbox
          </button>
        </div>
        <button className="profile" onClick={handleProfileClick}>
          <img src={user} alt="Profile" />
          <p>Mon profil</p>
        </button>
        
      </nav>
    </div>
  );
}

export default SideBareDocs;
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChartBar, FaUserInjured, FaFolder, FaCalendarAlt, FaInbox, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import './SideBareDocs.css';

function SideBareDocs({ activeTab, setActiveTab, disableDropdown }) {
  const navigate = useNavigate();
  const location = useLocation();

  const rawRole = localStorage.getItem('role');
  const userRole = rawRole?.toUpperCase() || 'DOCTOR';
  console.log('Raw role from localStorage:', rawRole, 'Normalized:', userRole);

  // Sync activeTab with route on mount
  useEffect(() => {
    const path = location.pathname;
    const stateTab = location.state?.activeTab;
    console.log('useEffect - path:', path, 'stateTab:', stateTab, 'activeTab:', activeTab);

    if (path.includes('DoctorList') || path.includes('AssistantList')) {
      if (stateTab && stateTab !== activeTab) {
        setActiveTab(stateTab);
      } else if (!activeTab) {
        setActiveTab('etudiants');
        const targetPath = userRole === 'DOCTOR' ? '/DoctorList' : '/AssistantList';
        console.log('Initial navigation to:', targetPath, 'with activeTab: etudiants');
        navigate(targetPath, { state: { activeTab: 'etudiants' }, replace: true });
      }
    } else if (path.includes('PatientList') || path.includes('Calendar') || path.includes('Demandes') || path.includes('dashboarddirector')) {
      if (activeTab !== null) {
        setActiveTab(null);
      }
    }
  }, [location, activeTab, setActiveTab, navigate, userRole]);

  const handleDashboardClick = () => {
    console.log('Navigating to Dashboard');
    navigate('/dashboarddirector');
  };

  const handlePatientListClick = () => {
    console.log('Navigating to PatientList');
    navigate('/PatientList');
  };

  const handleInboxClick = () => {
    console.log('Inbox clicked');
    navigate('/Notifications');
  };

  const handleCalendrierClick = () => {
    console.log('Calendrier clicked');
    navigate('/Calendar');
  };

  const handleDropdownChange = (e) => {
    const newTab = e.target.value;
    console.log('Dropdown changed to:', newTab, 'userRole:', userRole);

    if (newTab !== 'placeholder') {
      setActiveTab(newTab);
      const targetPath = userRole === 'DOCTOR' ? '/DoctorList' : '/AssistantList';
      console.log('Navigating to:', targetPath, 'with activeTab:', newTab);
      navigate(targetPath, { state: { activeTab: newTab } });
    }
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
            <FaUserInjured className="inline mr-2" />
            La liste patients
          </button>
          <select
            id="role-select"
            value={activeTab || 'placeholder'}
            onChange={handleDropdownChange}
            className="role-select"
            disabled={disableDropdown}
          >
            <option value="placeholder" disabled>
              Dossier médicaux
            </option>
            <option value="etudiants">Dossier médicaux d'étudiants</option>
            <option value="enseignants">Dossier médicaux d'enseignants</option>
            <option value="ats">Dossier médicaux d'ATS</option>
          </select>
          <button onClick={handleCalendrierClick} className="sidebar-button">
            <FaCalendarAlt className="inline mr-2" />
            Calendrier
          </button>
          <button onClick={handleInboxClick} className="sidebar-button">
            <FaInbox className="inline mr-2" />
            Inbox
          </button>
          {userRole === 'DOCTOR' && (
            <button onClick={handleDashboardClick} className="sidebar-button">
              <FaChartBar className="inline mr-2" />
              Statistiques
            </button>
          )}
        </div>
        <button className="profile" onClick={handleProfileClick}>
          <img src={user} alt="Profile" className="inline mr-2" />
          <p>Mon profil</p>
        </button>
      </nav>
    </div>
  );
}

export default SideBareDocs;
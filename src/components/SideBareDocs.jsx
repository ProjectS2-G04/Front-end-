import React from 'react'
import './SideBareDocs.css'
import logo from '../assets/logo.png'
import user from '../assets/user.png'

function SideBareDocs({ activeTab, setActiveTab }) {
   
  return (
    <div className="sidebardocs">
    <div className="sidebardocs-header">
      <img src={logo}></img>
      
    </div>

    <nav className="sidebardocs-nav">
      <div className="options-todo">
        <button>La liste patients</button>
        <label htmlFor="role-select" ></label>
        <select
          id="role-select"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option value="etudiants">Dossier médicale D'étudiants</option>
          <option value="enseignants"> Dossier médicale d'enseignants</option>
          <option value="ats">  Dossier médicale d'ATS</option>
        </select>
        <button>Inbox</button>
        <button>Calendrier</button>
        </div>
        <button className='profile'> <img src={user} alt=''/><p>Mon profile</p> </button>
    </nav>
  </div>
  )
}

export default SideBareDocs
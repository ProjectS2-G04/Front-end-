import React from 'react'
import './SideBareDocs.css'
import logo from '../assets/logo.png'

function SideBareDocs({ activeTab, setActiveTab }) {
   
  return (
    <div className="sidebardocs">
    <div className="sidebardocs-header">
      <img src={logo}></img>
      <p>La liste des dossiers médicales</p>
    </div>
    <nav className="sidebardocs-nav">
      
    <label htmlFor="role-select" ></label>
        <select
          id="role-select"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option value="etudiants">Étudiants</option>
          <option value="enseignants">Enseignants</option>
          <option value="ats">ATS</option>
        </select>
      
    </nav>
  </div>
  )
}

export default SideBareDocs
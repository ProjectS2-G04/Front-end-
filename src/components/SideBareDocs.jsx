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
    <button
        className={activeTab === 'etudiants' ? 'active' : ''}
        onClick={() => setActiveTab('etudiants')}
      >
        Étudiants
      </button>
      <button
        className={activeTab === 'enseignants' ? 'active' : ''}
        onClick={() => setActiveTab('enseignants')}
      >
        Enseignants
      </button>
      <button
        className={activeTab === 'ats' ? 'active' : ''}
        onClick={() => setActiveTab('ats')}
      >
        ATS
      </button>
    </nav>
  </div>
  )
}

export default SideBareDocs
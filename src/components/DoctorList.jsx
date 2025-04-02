import React ,  { useState } from 'react'
import SideBareDocs from './SideBareDocs';
import './DoctorList.css'
import { RiDossierFill } from "react-icons/ri";
import { BsFillSave2Fill } from "react-icons/bs";
import { IoArrowBackCircle } from "react-icons/io5";


function DoctorList(){
    const [activeTab, setActiveTab] = useState('etudiants');
    const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const records = {
    enseignants: [
      { id: 1, name: 'Mohamed Amin' },
      { id: 2, name: 'Fatima Zahra' },
      { id: 3, name: 'Ahmed Benali' },
      { id: 4, name: 'Leila Mansouri' },
    ],
    etudiants: [
      { id: 1, name: 'Youssef Khalid' },
      { id: 2, name: 'Amina Toumi' },
      { id: 3, name: 'Karim Belhaj' },
    ],
    ats: [
      { id: 1, name: 'Mohamed Amin' },
      { id: 2, name: 'Samira Nouri' },
    ]
  };

  const filteredRecords = records[activeTab].filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  return (
   
    <div className="app-container">
      <SideBareDocs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="listDoctor-main-content">
        <header className="content-header">
          <h1>La liste des dossiers médicaux des {activeTab}</h1>
        </header>

        <div className="content-body">
          <div className="search-bar"> 
            <p>{activeTab}</p>
            <input
              type="text"
              placeholder="Rechercher"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="records-list">
            {filteredRecords.map(record => (
              <div key={record.id} className="record-card">
                <div className="recordnamedocs">
                <RiDossierFill className='RiDossierFill'/>
                  <span className="record-name">{record.name}</span>
                  </div>
                <div className="record-actions">
                  <button className="modify-btn">Modifier</button>
                  <button className="print-btn">Imprimer</button>
                  <BsFillSave2Fill className='BsFillSave2Fill'/>
                </div>
              </div>
            ))}
          </div>
            <div className="addreturn">
              <IoArrowBackCircle className='IoArrowBackCircle'/>
              <button className="add-btn">Ajouter</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorList
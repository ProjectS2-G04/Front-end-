import React from 'react'
import './home.css'
import homeLogo from "../assets/logo.png"
import homeUser from "../assets/user.png"
import { HiMiniDocumentText } from "react-icons/hi2";
import OnlineDoctoramico from "/src/assets/OnlineDoctor-amico.svg";
function PatientHome() {
  return (
   <div className='home-container'>
       
           <heder className="home-header">
                   <img src={homeLogo} alt="Medeciel Logo" />
                <nav>
                  
                <img src={homeUser} alt="Profile Icon" />
                
                 <button className="deconnexion-button">Déconnexion</button>
                
                </nav>
           </heder>
           <div className="options">
             <button>Consulter mon  dossier medicale <HiMiniDocumentText className='HiMiniDocumentText'/> </button>
             <button>Exporter mon dossier medicale <HiMiniDocumentText className='HiMiniDocumentText'/> </button>
             
           </div>
           <div className="homeimg">
          <img src={OnlineDoctoramico} alt="" />
         </div>
       </div>
  )
}

export default PatientHome
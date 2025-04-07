import React from 'react';
import { HiMiniDocumentText } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import homeLogo from "../assets/logo.png";
import homeUser from "../assets/user.png";
import './home.css';
import OnlineDoctoramico from "/src/assets/OnlineDoctor-amico.svg";

function PatientHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };
  const handleProfile = () =>{
    navigate('/profile');
  };

  return (
   <div className='home-container'>
       
           <heder className="home-header">
                   <img src={homeLogo} alt="Medeciel Logo" />
                <nav>
                  
                <img src={homeUser} onClick={handleProfile} alt="Profile Icon"  />
                
                 <button className="deconnexion-button" onClick={handleLogout}>Déconnexion</button>
                
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
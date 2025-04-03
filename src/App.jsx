import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './components/Admin_Page';
import Forgot_Password from './components/Forgot_Password';
import Forgot_Password1 from './components/Forgot_Password1';
import Forgot_Password2 from './components/Forgot_Password2';
import Doctorhome from "./components/Doctorhome";
import Profile from "./components/profile";
import SeConnecter from "./components/seConnecter";
import Signup_User from './components/Signup_User';
import Sinscrire from "./components/sinscrire";
import SideBareDocs from './components/SideBareDocs';
import DoctorList from './components/DoctorList';
import AssitantHome from './components/AssitantHome';
import PatientHome from './components/PatientHome';
import AssistantList from './components/AssistantList';

const App = () => {
  return (
  <>
  

  
     <Router> 
    <Routes>
      <Route path="/" element={<SeConnecter />} /> 
      <Route path="/home" element={<Doctorhome />} /> 
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/sinscrire" element={<Sinscrire />} /> 
      <Route path="/forgot-password" element={<Forgot_Password />} />
      <Route path="/enter-code" element ={<Forgot_Password1/>} />
      <Route path="/reset-password" element ={<Forgot_Password2/>}/>
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/signup_user" element={<Signup_User />} />
      <Route path="/Assitanthome" element={<AssitantHome />} />
      <Route path="/Patienthome" element={<PatientHome />} />
      <Route path="/AssistantList" element={<AssistantList />} />
      <Route path="/home/DoctorList" element={<DoctorList />} />

    </Routes>
  </Router>
  
  
  </>
  )
}

export default App

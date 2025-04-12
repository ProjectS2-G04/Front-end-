import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './components/Admin_Page';
import AssistantList from './components/AssistantList';
import AssitantHome from './components/AssitantHome';
import CreateFormATS from './components/CreateFormATS';
import CreateFormEnseignant from './components/CreateFormEnseignant';
import CreateFormPatient from './components/CreateFormPatient';
import Doctorhome from "./components/Doctorhome";
import DoctorList from './components/DoctorList';
import Forgot_Password from './components/Forgot_Password';
import Forgot_Password1 from './components/Forgot_Password1';
import Forgot_Password2 from './components/Forgot_Password2';
import PatientHome from './components/PatientHome';
import Profile from "./components/profile";
import SeConnecter from "./components/seConnecter";
import Signup_User from './components/Signup_User';
import Sinscrire from "./components/sinscrire";
import VerifyEmail from './components/VerifyEmail';
<<<<<<< HEAD
import ReadOnlyStudent from './components/ReadOnlyStudent';
import ReadOnlyAts from './components/ReadOnlyAts';
import ReadOnlyTeacher from './components/ReadOnlyTeacher';
=======
import ModifyFormEtudiant from './components/ModifyFormEtudiant';
import ModifyFormEnseignant from './components/ModifyFormEnseignant';
import ModifyFormATS from './components/ModifyFormATS';

>>>>>>> 66a744e24e2845f2347da3dcc603e6fdf4c528db

const App = () => {
  return (
    <>
<<<<<<< HEAD
   
    <ReadOnlyStudent />
    <ReadOnlyAts />
    <CreateFormPatient />
    <ReadOnlyTeacher />
     {/* <Router>
=======
    
     <Router>
>>>>>>> 66a744e24e2845f2347da3dcc603e6fdf4c528db
        <Routes>
          <Route path="/" element={<SeConnecter />} />
          <Route path="/home" element={<Doctorhome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sinscrire" element={<Sinscrire />} />
          <Route path="/verify-email/:uidb64/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<Forgot_Password />} />
          <Route path="/enter-code" element={<Forgot_Password1 />} />
          <Route path="/reset-password" element={<Forgot_Password2 />} />
          <Route path="/Admin_Page" element={<AdminPage />} />
          <Route path="/signup_user" element={<Signup_User />} />
          <Route path="/Assitanthome" element={<AssitantHome />} />
          <Route path="/Patienthome" element={<PatientHome />} />
          <Route path="/AssistantList" element={<AssistantList />} />
          <Route path="/DoctorList" element={<DoctorList />} />
          <Route path="/CreateFormPatient" element={<CreateFormPatient />} />
          <Route path="/CreateFormPatient" element={<CreateFormPatient/>}/>
          <Route path="/CreateFormEnseignant" element={ <CreateFormEnseignant/>}/>
          <Route path="/CreateFormATS" element={<CreateFormATS/>}/>
          <Route path="/ModifyFormEtudiant/:id" element={<ModifyFormEtudiant />} />        
          <Route path="/ModifyFormEnseignant/:id" element={<ModifyFormEnseignant />} />  
          <Route path="/ModifyFormATS/:id" element={<ModifyFormATS />} /> 
        </Routes>
      </Router>
    </>
  );
};

export default App;
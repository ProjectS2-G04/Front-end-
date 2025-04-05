import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './components/Admin_Page';
import Forgot_Password from './components/Forgot_Password';
import Forgot_Password1 from './components/Forgot_Password1';
import Forgot_Password2 from './components/Forgot_Password2';
import Doctorhome from "./components/Doctorhome";
import Profile from "./components/profile";
import SeConnecter from "./components/seConnecter";
import Signup_User from './components/Signup_User';
import Sinscrire from "./components/sinscrire";
import AssitantHome from './components/AssitantHome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeConnecter />} />
        <Route path="/home" element={<Doctorhome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sinscrire" element={<Sinscrire />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/enter-code" element={<Forgot_Password1 />} />
        <Route path="/reset-password" element={<Forgot_Password2 />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/signup_user" element={<Signup_User />} />
        <Route path="/assistant-home" element={<AssitantHome />} />
      </Routes>
    </Router>
  );
};

export default App;
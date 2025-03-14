import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Forgot_Password from './components/Forgot_Password';
import SeConnecter from "./components/seConnecter"
import Sinscrire from "./components/sinscrire"
import Profile from "./components/profile"
import Home from "./components/home"
import Forgot_Password1 from './components/Forgot_Password1';
import Forgot_Password2 from './components/Forgot_Password2';

const App = () => {
  return (
    <Router> 
    <Routes>
      <Route path="/" element={<SeConnecter />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/sinscrire" element={<Sinscrire />} /> 
      <Route path="/forgot-password" element={<Forgot_Password />} />
      <Route path="/enter-code" element ={<Forgot_Password1/>} />
      <Route path="/reset-password" element ={<Forgot_Password2/>}></Route>
    </Routes>
  </Router>
  )
}

export default App

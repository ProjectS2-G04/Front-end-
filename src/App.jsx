import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SeConnecter from "./components/seConnecter"
import Sinscrire from "./components/sinscrire"
import Profile from "./components/profile"
import Home from "./components/home"


const App = () => {
  return (
    <Router> 
    <Routes>
      <Route path="/" element={<SeConnecter />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/sinscrire" element={<Sinscrire />} /> 
    </Routes>
  </Router>
  )
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PlayerMain from './pages/PlayerMain';
import AdminMain from './pages/AdminMain';
import Results from './pages/Results';
import Live from './pages/Live';
import AdminSignup from './pages/AdminSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/player" element={<PlayerMain />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/results" element={<Results />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </Router>
  );
}

export default App;

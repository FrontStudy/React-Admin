import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './Components/DashBoard';
import DiaryEntry from './Components/DiaryEntry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/calendar" element={<DashBoard />} />
        <Route path="/diary/:date" element={<DiaryEntry />} />
        <Route path="/" element={<DashBoard />} /> 
      </Routes>
    </Router>
  );
}

export default App;
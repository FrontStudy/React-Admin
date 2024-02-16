import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './Components/DashBoard';
import DiaryEntry from './Components/DiaryEntry';

function App() {
  return (
      <Routes>
        <Route path="/calendar" element={<DashBoard />} />
        <Route path="/diary/:date" element={<DiaryEntry />} />
        <Route path="/" element={<DashBoard />} /> 
      </Routes>
  );
}

export default App;
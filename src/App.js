import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Diarymain from './screen/diary/Diarymain.js';
import DiaryEntry from './Components/DiaryEntry';
import Login from './screen/login.js';
import Adminmain from './screen/admin/Adminmain.js';

function App() {
  return (
      <Routes>
        <Route path="/calendar" element={<Diarymain />} />
        <Route path="/diary/:date" element={<DiaryEntry />} />
        <Route path="/Diarymain" element={<Diarymain />} /> 
        <Route path="/Adminmain" element={<Adminmain />} /> 
        <Route path="/" element={<Login />} /> 
      </Routes>
  );
}

export default App;
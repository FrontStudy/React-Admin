import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './Components/DashBoard';
import DiaryEntry from './Components/DiaryEntry';
import Login from './screen/login.js';

function App() {
  return (
      <Routes>
        <Route path="/calendar" element={<DashBoard />} />
        <Route path="/diary/:date" element={<DiaryEntry />} />
        <Route path="/DashBoard" element={<DashBoard />} /> 
        <Route path="/" element={<Login />} /> 
      </Routes>
  );
}

export default App;
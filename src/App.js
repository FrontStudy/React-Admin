<<<<<<< HEAD
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './screen/Main';
import ScreenA from './screen/ScreenA';
import ScreenB from './screen/ScreenB';
import ScreenC from './screen/ScreenC';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/ScreenA' element={<ScreenA />} />
        <Route path='/ScreenB' element={<ScreenB />} />
        <Route path='/ScreenC' element={<ScreenC />} />
    </Routes>
=======

import './App.css';

function App() {
  return (
    <div className="App">
      <p>준원입니다. 잘부탁드립니다.</p>
      <p>안녕하세요.</p>
    </div>
>>>>>>> 8c050bfc1cc13ea50e00290404597a23c1cbb4fc
  );
}

export default App;

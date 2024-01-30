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
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiarylayoutMain from './screen/diary/layout/DiarylayoutMain.js';
import Diarymain from './screen/diary/Diarymain.js';
import DiaryEntry from './Components/DiaryEntry';
import Login from './screen/login.js';
import Adminmain from './screen/admin/Adminmain.js';
import Mydiarypage from './screen/diary/Mydiarypage';
import Mymemberinformation from './screen/diary/Mymemberinformation.js';

function App() {
  return (
      <Routes>
        <Route path="/calendar" element={<Diarymain />} />
        <Route path="/diary/:date" element={<DiaryEntry />} />
        <Route path="/Diarymain" element={<Diarymain />} /> 
        <Route path="/Adminmain" element={<Adminmain />} /> 
        <Route path="/" element={<Login />} /> 

        <Route
          path="/Diarymain"
          element={<DiarylayoutMain 
            nowTitle="홈" 
            component={<Diarymain />}/>
          }
        />
        <Route
          path="/Mydiarypage"
          element={<DiarylayoutMain 
            nowTitle="나의 일기장" 
            component={<Mydiarypage />}/>
          }
        />
        <Route
          path="/Mymemberinformation"
          element={<DiarylayoutMain 
            nowTitle="마이 페이지" 
            component={<Mymemberinformation />}/>
          }
        />
      </Routes>
  );
}

export default App;
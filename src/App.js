import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiarylayoutMain from './screen/diary/layout/DiarylayoutMain.js';
import Diarymain from './screen/diary/Diarymain.js';
import DiaryEntry from './screen/diary/DiaryEntry';
import Login from './screen/login.js';
import Adminmain from './screen/admin/Adminmain.js';
import Mydiarypage from './screen/diary/Mydiarypage';
import Mymemberinformation from './screen/diary/Mymemberinformation.js';
import MemberList from './screen/admin/MemberList.js';
import DiaryList from './screen/diary/DiaryList.js';

function App() {
  return (
      <Routes>
        <Route path="/calendar" element={<Diarymain />} />
        <Route path="/Adminmain/*" element={<Adminmain />} /> 
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
        <Route
          path="/diary/:date"
          element={<DiarylayoutMain 
            nowTitle="오늘의 일기장" 
            component={<DiaryEntry />}/>
          }
        />
        <Route
          path="/DiaryList"
          element={<DiarylayoutMain 
            nowTitle="나의 일기 목록" 
            component={<DiaryList />}/>
          }
        />
      </Routes>
  );
}

export default App;
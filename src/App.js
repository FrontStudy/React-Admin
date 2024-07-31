import React from 'react';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiarylayoutMain from './screen/diary/layout/DiarylayoutMain.js';
import Diarymain from './screen/diary/Diarymain.js';
import DiaryEntry from './screen/diary/DiaryEntry';
import Login from './screen/login.js';
import Adminmain from './screen/admin/Adminmain.js';
import Mydiarypage from './screen/diary/Mydiarypage';
import Mymemberinformation from './screen/diary/Mymemberinformation.js';
import MemberList from './screen/admin/MemberList.js';
import MydiarypageDetail from './screen/diary/MydiarypageDetail.js';
import DiaryEdit from './screen/diary/DiaryEdit.js';
import SharedDiarypageDetail from './screen/diary/SharedDiarypageDetail.js';

function App() {
  return (
      <Routes>
        <Route path="/calendar" element={<Diarymain />} />
        <Route path="/Adminmain/*" element={<Adminmain />} /> 
        <Route path="/" element={<Login />} /> 

        <Route
          path="/Diarymain"
          element={<DiarylayoutMain 
            nowTitle="오늘의 일기장" 
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
          path="/diary/MydiarypageDetail/:diaryId" 
          element={<DiarylayoutMain 
            nowTitle="일기 상세정보" 
            component={<MydiarypageDetail />}/>
          }
        />
        <Route 
          path="/diary/DiaryEdit/:diaryId" 
          element={<DiarylayoutMain 
            nowTitle="일기 수정하기" 
            component={<DiaryEdit />}/>
        }
        />
         <Route 
          path="/diary/SharedDiarypageDetail/:diaryId" 
          element={<DiarylayoutMain 
            nowTitle="공유일기 상세정보" 
            component={<SharedDiarypageDetail />}/>
          }
        />
      </Routes>
  );
}

export default App;
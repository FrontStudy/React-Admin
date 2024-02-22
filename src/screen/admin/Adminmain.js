import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import MemberList from './MemberList';
import MemberPost from './MemberPost';

function Adminmain() {
  return (
    <div id="AdminMain" className="Adminmain">
      <div className="Sidebar">
        <NavBar />
      </div>
      <div className="MainContent">
        <Routes>
          <Route path="memberlist" element={<MemberList />} /> {/* Remove the leading slash */}
          <Route path="memberpost" element={<MemberPost />} /> {/* Remove the leading slash */}
          {/* Redirect to /Adminmain/memberlist as default */}
          <Route path="*" element={<Navigate replace to="memberlist" />} /> {/* Use relative path */}
        </Routes>
      </div>
    </div>
  );
}

export default Adminmain;
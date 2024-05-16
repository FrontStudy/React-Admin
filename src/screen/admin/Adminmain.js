import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import MemberList from './MemberList';
import MemberPost from './MemberPost';
import MemberListDetail from './MemberListDetail';
import MemberPostDetail from './MemberPostDetail';
import Dashboard from './Dashborad';

function Adminmain() {
  return (
    <div id="AdminMain" className="Adminmain">
      <div className="Sidebar">
        <NavBar />
      </div>
      <div className="MainContent">
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="memberlist" element={<MemberList />} /> 
          <Route path="memberpost" element={<MemberPost />} /> 
          <Route path="memberlist/:memberId" element={<MemberListDetail />} />
          <Route path="memberpost/:postId" element={<MemberPostDetail />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default Adminmain;
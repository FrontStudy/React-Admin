import React from 'react';
import NavBar from './NavBar';
import MemberList from './MemberList';
import MemberPost from './MemberPost';

function Adminmain() {
  const [activeComponent, setActiveComponent] = React.useState('memberList');

  const handleMenuClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div id="AdminMain" className="Adminmain">
      <div className="Sidebar">
        <NavBar onMenuClick={handleMenuClick} />
      </div>
      <div className="MainContent">
        {activeComponent === 'memberList' && <MemberList />}
        {activeComponent === 'memberPost' && <MemberPost />}
        {/* You can add other conditional components here */}
      </div>
    </div>
  );
}

export default Adminmain;
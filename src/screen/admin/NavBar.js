import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="NavBar">
      <div className="NavBar-header">
        <h2>관리자메뉴</h2>
      </div>
      <ul className="NavBar-menu">
        <li>
          <NavLink to="memberlist" className={({ isActive }) => isActive ? 'active' : ''}>
            회원목록
          </NavLink>
        </li>
        <li>
          <NavLink to="memberpost" className={({ isActive }) => isActive ? 'active' : ''}>
            회원게시글
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default NavBar;
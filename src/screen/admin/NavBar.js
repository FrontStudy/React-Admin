import React from 'react';

function NavBar({ onMenuClick }) {
  return (
    <nav className="NavBar">
      <div className="NavBar-header">
        <h2>관리자메뉴</h2> {/* Admin Menu */}
      </div>
      <ul className="NavBar-menu">
        <li onClick={() => onMenuClick('memberList')}>
          <span className="NavBar-icon">👤</span>
          <span className="NavBar-text">회원목록</span>
        </li>
        <li onClick={() => onMenuClick('memberPost')}>
          <span className="NavBar-icon">📚</span>
          <span className="NavBar-text">회원게시글</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const goToAdminPage = () => {

    navigate('/Diarymain');
  };

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
      </ul>
      <div className= 'adminmainbuttonboxAD'>
        <button onClick={goToAdminPage} className='adminmainbutton'>
            서비스 페이지
        </button>
        </div>

    </nav>
  );
}

export default NavBar;
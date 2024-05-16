import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import SignupForm from '../Components/SignupForm';

export default function Login() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('signup');

  const handleToggle = (formType) => {
    setActiveForm(formType);
  };

  return (
    <section className="loginWrap" id="Login">
      <div className={`container ${activeForm === 'signup' ? 'right-panel-active' : ''}`} id="container">
        {activeForm === 'login' ? (
          <div className="overlay-panel overlay-left">
            <LoginForm />
          </div>
        ) : (
          <div className="overlay-panel overlay-right">
            <SignupForm />
          </div>
        )}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>로그인</h1>
              <p>돌아온걸 축하해!</p>
              <button className="ghost" id="signIn" onClick={() => handleToggle('login')}>
                로그인
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>회원가입</h1>
              <p>회원가입 후 같이 일기 써봐요.</p>
              <button className="ghost" id="signUp" onClick={() => handleToggle('signup')}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
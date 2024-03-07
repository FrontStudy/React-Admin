import React from 'react';
import { useState, useEffect } from "react";
import * as API from "../../../service/api";
import * as STR from "../../../service/string";
import { useNavigate } from 'react-router-dom';

function Diarynavigation() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  function axiosData() {
    API.servicesGetData(STR.diarynavUrl).then((res) => {
      setData(res);
    });
  }

  useEffect(() => {
    axiosData();
  }, []);

  const goToAdminPage = () => {
    navigate('/Adminmain');
  };


  // Assuming diarynav contains a property called subNav which is an array
  return (
    <div className='diarynav navigationWrap'>
      <div className="navbar">
        <div className='diarylogo'>
          Exchange Diary
        </div>
        <ul>
          {data.map((item, key) => (
              <li key={key}>
                <div>
                  <a href={item.url}><span>{item.name}</span></a>
                </div>
              </li>
          ))}
        </ul>
      </div>
      <div className= 'adminmainbuttonbox'>
        <button onClick={goToAdminPage} className='adminmainbutton'>
            관리자 페이지
        </button>
      </div>
    </div>
  );
}

export default Diarynavigation;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesGetStorage } from '../../service/storage';
import { Button } from 'bootstrap';

import * as API from "../../service/api";
import * as STR from "../../service/string";
import * as TOA from "../../service/toast";

function Mydiarypage() {

    const dateClick = (info) => { 
        navigate(`/diary/DiaryEntry`);
    };

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [diaryList, setDiaryList] = useState([]); 
  
    useEffect(() => {
      fetchMeDiaryList();
    }, [currentPage]);

    const fetchMeDiaryList = async () => {
      try {
        const data = await API.servicesGetData(STR.urlMeDiaryList, {
          offset: 0,
          size: 20
        });
        if (data && data.data) {
            setDiaryList(data.data);
        } else {
          console.error('응답 데이터에 문제가 있습니다:', data);
        }
      } catch (error) {
        console.error('"나의 일기 목록" 불러오기를 실패하였습니다..', error);
      }
    };
    
    const handleDiaryClick = (diaryId) => {
      navigate(`/diary/MydiarypageDetail/${diaryId}`);
  };

  return (
    <div id='mydiary'>
      <div className='diarymain diarycontentBox'>
        <div className='maincalendar'>
          <div className='maincalendar-button' >
            <button onClick={dateClick}>일기쓰기</button>
          </div>
            
            <div>
                <ul className='MeDiaryListBox'>
                {diaryList.map((diary, index) => (
                  (diary.title && diary.content) && ( 
                    <li key={index} className='MeDiaryListLi'>
                      <a className='MeDiaryList' onClick={() => handleDiaryClick(diary.id)}>
                        <div>
                          <p className='MeDiaryList-title hidden-scrollbar'>{diary.title}</p>
                          <p className='MeDiaryList-content hidden-scrollbar'>{diary.content}</p>
                        </div>
                      </a>
                    </li>
                  )
                ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Mydiarypage;
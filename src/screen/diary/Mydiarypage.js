import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesGetStorage } from '../../service/storage';
import { Button } from 'bootstrap';

import * as API from "../../service/api";
import * as STR from "../../service/string";
import * as TOA from "../../service/toast";

function Mydiarypage() {

    const dateClick = (info) => {
        navigate(`/diary/${info.dateStr}`);
    };

    const navigate = useNavigate();

    //   const [diaryList, setDiaryList] = useState([]); 

    //   function fetchMeDiaryList(offset = 0, size = 20) {
    //     API.servicesGetData(STR.urlMeDiaryList, {
    //       params: {
    //         offset: offset,
    //         size: size,
    //       },
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
  
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //     //   setDiaryList(res.data.data);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching diary list:", error);
    //     });
    //   }
    
    //   useEffect(() => {
    //     fetchMeDiaryList();
    //   }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [diaryList, setDiaryList] = useState([]); 
  
    useEffect(() => {
      fetchMeDiaryList();
    }, [currentPage]);

    const fetchMeDiaryList = async () => {
      try {
        const data = await API.servicesGetData(STR.urlMeDiaryList, {
          offset: 0,
          size: 100
        });
        if (data) {
            setDiaryList(data.data);
        } else {
          console.error('응답 데이터에 문제가 있습니다:', data);
        }
      } catch (error) {
        console.error('"나의 일기 목록" 불러오기를 실패하였습니다..', error);
      }
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
                      <a className='MeDiaryList'>
                        <div>
                          <p className='MeDiaryList-title'>{diary.title}</p>
                          <p className='MeDiaryList-content'>{diary.content}</p>
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
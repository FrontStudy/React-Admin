import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as API from '../../service/api';
import * as STR from '../../service/string';
import { useNavigate } from 'react-router-dom';

function SharedDiarypageDetail() {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchDiaryEntry();
  }, [diaryId]);
 
  const fetchDiaryEntry = async () => {
    try {
      const url = `${STR.urlDiaryDetail}/${diaryId}`;
      const data = await API.servicesGetData(url);
      if (data && data.data) {
        setDiary(data.data);
      } else {
        console.error('응답 데이터에 문제가 있습니다:', data);
      }
    } catch (error) {
      console.error('일기 세부 정보 불러오기를 실패하였습니다.', error);
    }
  };

  const handleEditClick = () => {
    navigate(``);
  };

  const handleBackToListClick = () => {
    navigate(`/Diarymain`);
  };

  if (!diary) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='diary-entry'>
      <h1>{diary.title}</h1>
      <p>{diary.content}</p>
      <p>{diary.date}</p>
      <button onClick={handleEditClick}>수정하기</button>
      <button onClick={handleBackToListClick}>목록으로 돌아가기</button>
    </div>
  );
}

export default SharedDiarypageDetail;
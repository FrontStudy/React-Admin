import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as API from '../../service/api';
import * as STR from '../../service/string';
import { useNavigate } from 'react-router-dom';

function SharedDiarypageDetail() {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState(null);
  const [comment, setComment] = useState('');
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

  const handleBackToListClick = () => {
    navigate(`/Diarymain`);
  };

  const handleCommentSubmit = () => {
    // 댓글 제출 로직 추가
    console.log('Comment submitted:', comment);
  };

  if (!diary) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='diary-detail-container'>
      <div className='diary-entry'>
        <h1>{diary.title}</h1>
        <p>{diary.content}</p>
        <p>{diary.date}</p>
        <button onClick={handleBackToListClick}>목록으로 돌아가기</button>
      </div>
      <div className='diary-comments'>
        <h2>댓글</h2>
        <textarea 
          value={comment}
          //onChange={handleCommentChange}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleCommentSubmit}>댓글 작성</button>
       </div>
    </div>
  );
}

export default SharedDiarypageDetail;
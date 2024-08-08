import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as API from '../../service/api';
import * as STR from '../../service/string';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function SharedDiarypageDetail() {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState(null);
  const [commentList, setCommentList] = useState([]); 
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    getValues, 
    reset, 
    formState: { errors } } = useForm({
        defaultValues: {
            _content: "",
        }
});

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

  useEffect(() => {
    fetchCommentList();
  }, [diaryId]);
 
  const fetchCommentList = async () => {
    try {
      const url = `${STR.urlGetComment}/${diaryId}/comment`;
      const data = await API.servicesGetData(url);
      if (data && data.data) {
        setCommentList(data.data);
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

  const handleCommentSubmit  = (e) => {
    console.log("content:", diaryId);
   console.log("content:", getValues("_content"));
   API.servicesPostData(STR.urlAddComment, {
    diaryId: diaryId,
    content: getValues("_content"),
     })
   .then((res) => {
       console.log("입력성공");
       fetchCommentList();  
       reset(); 
   })
   .catch(() =>
       console.error("오류")
   );
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
            {...register("_content")}
            id="content"
            placeholder="댓글을 입력하세요"
          />
        <button onClick={handleCommentSubmit}>댓글 작성</button>
        <ul className='MeDiaryListBox'>
          {commentList.map((comment, index) => (
              <li key={index} className='MeDiaryListLi'>
                <div className='MeDiaryList'>
                  <p className='MeDiaryList-title hidden-scrollbar'>{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
       </div>
    </div>
  );
}

export default SharedDiarypageDetail;
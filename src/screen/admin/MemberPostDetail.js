import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as STR from '../../service/string';
import * as API from '../../service/api';

function MemberPostDetail() {
  const { postId } = useParams();  // URL로부터 postId 추출
  const [postDetail, setPostDetail] = useState(null);
  const [comments, setComments] = useState([]);
  // console.log(postId);
  useEffect(() => {
    fetchPostDetail();
    fetchComments();
  }, [postId]); // postId가 변경될 때마다 fetchPostDetail 호출

  const fetchPostDetail = async () => {
    try {
      const requestBody = { offset: 0, size: 1, postId: postId };
      const data = await API.servicesPostData(STR.urlDiaryListAdmin, requestBody);
      if (data && data.status === "success" && data.data.length > 0) {
        setPostDetail(data.data);
      } else {
        console.error('응답 데이터에 문제가 있습니다:', data);
        setPostDetail(null);
      }
    } catch (error) {
      console.error('게시글 상세 정보를 불러오는데 실패했습니다:', error);
      setPostDetail(null);
    }
  };

  const fetchComments = async () => {
    const url = STR.urlComment.replace("{diaryId}", postId); // postId를 diaryId로 사용
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setComments(data.data || []); // 응답에서 data.data를 사용하여 댓글 상태 설정
      } else {
        throw new Error('댓글을 불러오는데 실패했습니다');
      }
    } catch (error) {
      console.error(error);
      setComments([]); // 에러 발생 시 댓글 상태를 비움
    }
  };

  if (!postDetail) return <div>Loading...</div>;

    return (
    <div className='custom-container'>
      <div className='custom-box'>
        <h2 className='custom-title'>{postDetail.title}</h2>
        <p className='custom-content'>{postDetail.content}</p>
        <span>좋아요 수: {postDetail.likes}</span>
        <span>조회수 : {postDetail.readCount} </span>
        <div className='custom-comments'>
          <h3>댓글</h3>
          {comments.map((comment, index) => (
            <div key={index} className='custom-comment'>
              <p>{comment.content}</p>
              <p className='custom-date'>{new Date(comment.date).toLocaleDateString('ko-KR')}</p>
            </div>
          ))}
        </div>
        <p className='custom-date'>생성 날짜: {new Date(postDetail.createdDate).toLocaleDateString('ko-KR')}</p>
      </div>
    </div>
  );
}

export default MemberPostDetail;
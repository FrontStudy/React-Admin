import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as STR from '../../service/string';
import * as API from '../../service/api';

function MemberListDetail() {
  const { memberId } = useParams(); // URL로부터 memberId 추출
  const [memberDetail, setMemberDetail] = useState(null);

  useEffect(() => {
    fetchMemberDetail();
  }, [memberId]); // memberId가 변경될 때마다 fetchMemberDetail 호출

  const fetchMemberDetail = async () => {
    try {
      // POST 요청 본문에 memberId 포함
      const requestBody = {
        offset: 0,
        size: 1,
        memberId: memberId, // 사용자가 선택한 memberId
      };
      
      // API 요청
      const data = await API.servicesPostData(STR.urlMemberList, requestBody);
      
      // 응답 데이터 처리
      if (data && data.status === "success") {
        // 가정: 응답된 데이터 중 첫 번째 항목을 사용
        const memberInfo = data.data.length > 0 ? data.data[0] : null;
        setMemberDetail(memberInfo);
      } else {
        console.error('응답 데이터에 문제가 있습니다:', data);
      }
    } catch (error) {
      console.error('회원 상세 정보를 불러오는데 실패했습니다:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const formatGender = (gender) => {
    return gender === 'male' ? '남성' : gender === 'female' ? '여성' : '미정';
  };

  return (
    <div className='container'>
      {memberDetail ? (
        <div>
          <h1 className='UserDetailTitle'>회원 상세 정보</h1>
          <div className='UserDetail_info-box'><span className='label'>닉네임: </span> <span className="value">{memberDetail.nickname}</span></div>
          <div className='UserDetail_info-box'><span className='label'>이메일: </span><span className="value">{memberDetail.email}</span></div>
          <div className='UserDetail_info-box'><span className='label'>생일: </span><span className="value">{memberDetail.birthDate}</span></div>
          <div className='UserDetail_info-box'><span className='label'>이름 : </span><span className="value">{memberDetail.name}</span></div>
          <div className='UserDetail_info-box'><span className='label'>성별: </span><span className="value">{formatGender(memberDetail.gender)}</span></div>
          <div className='UserDetail_info-box'><span className='label'>계정생성일: </span><span className="value">{formatDate(memberDetail.createdDate)}</span></div>
          <div className='UserDetail_info-box'><span className='label'>게시글수 : </span><span className="value">{memberDetail.diaryCount}</span></div>
          <div className='UserDetail_info-box'><span className='label'>댓글수 : </span><span className="value">{memberDetail.commentCount}</span></div>

        </div>
      ) : (
        <p>정보를 불러오는 중...</p>
      )}
    </div>
  );
}

export default MemberListDetail;
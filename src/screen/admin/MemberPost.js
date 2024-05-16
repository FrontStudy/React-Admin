import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../Components/Pagination';
import { urlMemberPost } from '../../service/string';
import { useNavigate } from 'react-router-dom';

import * as STR from '../../service/string';
import * as API from '../../service/api'

function MemberPost() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchPosts();
    fetchMembers(); // 회원 목록을 가져오는 함수 호출
  }, [currentPage]);

  useEffect(() => {
    fetchPosts();
    fetchMembers();
  }, [currentPage]);

  const handleRowClick = (postId) => {
    navigate(`/Adminmain/memberpost/${postId}`); // 프로그래매틱 라우팅 실행
  };

  const fetchPosts = async () => {
    // currentPage가 1일 때 offset을 0으로, 2일 때 1로 설정
    const offset = currentPage - 1;
    
    try {
      const response = await axios.get(urlMemberPost, {
        params: {
          offset: offset, // 계산된 offset 값을 사용
          size: itemsPerPage, // 페이지당 표시할 아이템 수
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPosts(response.data.data); // 게시글 데이터 설정
      // API 응답에서 제공하는 총 페이지 수와 총 아이템 수를 상태로 설정
      setTotalItems(response.data.page.totalElements); 
      setTotalPages(response.data.page.totalPages);
    } catch (error) {
      console.error('회원 게시글을 불러오는데 실패했습니다.', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const data = await API.servicesPostData(STR.urlMemberList, {
        offset: 0,
        size: 10,
        active: true
      });
      if (data && data.status === "success") {
        // 회원 배열을 객체로 변환
        const membersMap = data.data.reduce((acc, member) => {
          acc[member.id] = member;
          return acc;
        }, {});
        setMembers(membersMap);
      } else {
        console.error('응답 데이터에 문제가 있습니다:', data);
      }
    } catch (error) {
      console.error('회원 목록을 불러오는데 실패했습니다.', error);
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='menutitle'>
      <h3>회원게시글</h3>
      <div style={{backgroundColor: '#fff'}}>
        <table>
          <thead>
            <tr>
              <th>게시글 ID</th>
              <th>게시글 제목</th>
              <th>닉네임</th>
              <th>생성 날짜</th>
              {/* <th>게시글 내용</th> */}
              <th>공개범위</th>
              <th>회원상태</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.map((post, index) => (
              <tr key={index} onClick={() => handleRowClick(post.id)} style={{cursor: 'pointer'}}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{members[post.memberId] ? members[post.memberId].nickname : '알 수 없음'}</td>
                <td>{post.createdDate.split('T')[0]}</td>
                <td>{post.accessLevel === 'public' ? '공개' : '비공개'}</td>
                <td>{post.active ? '정상' : '탈퇴'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default MemberPost;
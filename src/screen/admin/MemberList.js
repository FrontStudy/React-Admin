import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../Components/Pagination';
import { servicesPostData } from '../../service/api'; // servicesGetStorage를 가져옵니다.

import * as STR from '../../service/string';
import * as API from '../../service/api'
function MemberList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await API.servicesPostData(STR.urlMemberList, {
        offset: 0,
        size: 10,
        active: true
      });
      if (data && data.status === "success") {
        setMembers(data.data);
      } else {
        console.error('응답 데이터에 문제가 있습니다:', data);
      }
    } catch (error) {
      console.error('회원 목록을 불러오는데 실패했습니다.', error);
    }
  };

  const filteredMembers = members && members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate number of pages needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the current page items
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='menutitle'>
      <h3>회원목록</h3>
      <div style={{backgroundColor: '#fff'}}>
        <input
          type="text"
          placeholder="이름 검색"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{margin: '20px'}}
        />
        <table>
          <thead>
            <tr>
              <th>닉네임</th>
              <th>이메일</th>
              <th>가입일</th>
              <th>게시글수</th>
              <th>댓글수</th>
              <th>가입상태</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((member, index) => (
              <tr key={index}>
                <td>{member.nickname}</td>
                <td>{member.email}</td>
                <td>{member.createdDate.split('T')[0]}</td>
                <td>{member.diaryCount}</td>
                <td>{member.comments}</td>
                <td>{member.active ? '활성' : '비활성'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredMembers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default MemberList;
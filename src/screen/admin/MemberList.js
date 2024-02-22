import React, { useState } from 'react';
import Pagination from '../../Components/Pagination';

function MemberList() {
  // 검색
  const [searchTerm, setSearchTerm] = useState('');

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Dummy data for the table, replace with your actual data source
  const members = [
    { name: '김test', id: '김아이디', date: '2024-02-01', posts: 5, comments: 9, status: 'Active' },
    { name: '이test', id: '김아이디', date: '2024-02-01', posts: 14, comments: 12, status: 'Active' },
    { name: '나test', id: '김아이디', date: '2024-02-01', posts: 5, comments: 9, status: 'Active' },
    { name: '박test', id: '김아이디', date: '2024-02-01', posts: 14, comments: 12, status: 'Active' },
    { name: '정test', id: '김아이디', date: '2024-02-01', posts: 5, comments: 9, status: 'Active' },
    { name: '한test', id: '김아이디', date: '2024-02-01', posts: 14, comments: 12, status: 'Active' },
    { name: '용test', id: '김아이디', date: '2024-02-01', posts: 5, comments: 9, status: 'Active' },
    { name: '성test', id: '김아이디', date: '2024-02-01', posts: 14, comments: 12, status: 'Active' },
    { name: '민test', id: '김아이디', date: '2024-02-01', posts: 5, comments: 9, status: 'Active' },
    { name: '안test', id: '김아이디', date: '2024-02-01', posts: 14, comments: 12, status: 'Active' },
  ];

  const filteredMembers = members.filter(member =>
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
            <th>이름</th>
            <th>아이디</th>
            <th>가입일</th>
            <th>게시글수</th>
            <th>댓글수</th>
            <th>가입상태</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.id}</td>
              <td>{member.date}</td>
              <td>{member.posts}</td>
              <td>{member.comments}</td>
              <td>{member.status}</td>
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
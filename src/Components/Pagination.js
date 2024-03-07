import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0', 
  };
  
  const pageItemStyle = {
    margin: '0 5px', 
  };

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination' style={paginationStyle}>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`page-item ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
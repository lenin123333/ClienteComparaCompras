import React from 'react';

const PaginationMenu = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <span>
        Página:
        <input
          type="number"
          min={0}
          max={totalPages}
          value={currentPage}
          onChange={(e) => handlePageChange(parseInt(e.target.value))}
        />
        de {totalPages}
      </span>
    </div>
  );
};

export default PaginationMenu;

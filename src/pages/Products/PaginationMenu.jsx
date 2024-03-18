/* eslint-disable react/prop-types */
const PaginationMenu = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center m-5">
  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    <a
      href="#"
      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      onClick={() => handlePageChange(currentPage - 1)}
    >
      <span className="sr-only">Previous</span>
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M11.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
    </a>
    {[...Array(totalPages).keys()].map((index) => (
      <a
        key={index}
        href="#"
        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${
          index + 1 === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : ''
        }`}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </a>
    ))}
    <a
      href="#"
      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      onClick={() => handlePageChange(currentPage + 1)}
    >
      <span className="sr-only">Next</span>
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M8.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 11H4a1 1 0 010-2h6.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </a>
  </nav>
</div>


  );
};

export default PaginationMenu;

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const handlePrevPage = () => {
    if (currentPage > 0) setPage(currentPage - 1, totalPages);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setPage(currentPage + 1, totalPages);
  };

  const handlePageClick = (pageIndex) => {
    setPage(pageIndex, totalPages);
  };

  return (
    <div className="flex justify-center mt-8 mb-10">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 0}
        className={`p-2 ${
          currentPage === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        <FaChevronLeft className="text-gray-500 text-sm" />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index)}
          className={`mx-1 p-2 ${
            index === currentPage
              ? "font-bold text-blue-400"
              : "text-gray-500 hover:text-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
        className={`p-2 ${
          currentPage === totalPages - 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        <FaChevronRight className="text-gray-500 text-sm" />
      </button>
    </div>
  );
};

export default Pagination;

import { useState } from "react";

const usePagination = (initialPage = 0) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const setPage = (newPage, totalPages) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return { currentPage, setPage };
};

export default usePagination;

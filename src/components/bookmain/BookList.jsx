import React, { useState } from "react";
import usePagination from "../../hooks/usePagination";
import BookCard from "../../components/ui/BookCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BookList = ({ books }) => {
  const [category, setCategory] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  const itemsPerPage = 12; // 한 페이지에 12개 아이템

  // 필터링된 문제집 리스트
  const filteredBooks = books
    .filter((book) => {
      if (category === "전체") return true;
      return book.category === category;
    })
    .sort((a, b) => {
      if (sortOrder === "최신순") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return b.bookmarkCount - a.bookmarkCount;
      }
    });

  const {
    currentPage,
    currentItems,
    totalPages,
    paginate,
    goToPrevPage,
    goToNextPage,
  } = usePagination(filteredBooks, itemsPerPage);

  return (
    <div>
      {/* 카테고리 필터 버튼 */}
      <div className="flex mb-4">
        {["전체", "CS", "자격증", "기타"].map((cat) => (
          <button
            key={cat}
            className={`py-2 px-4 mx-1 rounded ${
              category === cat ? "font-semibold" : "text-gray-400"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 정렬 옵션 버튼 */}
      <div className="flex mb-4 ml-2">
        {["최신순", "북마크 많은 순"].map((order) => (
          <button
            key={order}
            className={`py-2 px-4 mx-1 rounded rounded-xl text-sm ${
              sortOrder === order ? "bg-black text-white" : "border"
            }`}
            onClick={() => setSortOrder(order)}
          >
            {order}
          </button>
        ))}
      </div>

      {/* 문제집 카드 리스트 */}
      <div className="grid grid-cols-4 gap-4">
        {currentItems.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            bookmarkCount={book.bookmarkCount}
            category={book.category}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8 mb-10">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          <FaChevronLeft className="text-gray-500 text-sm" />
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 ${
              index + 1 === currentPage
                ? "font-bold text-blue-400"
                : "text-gray-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          <FaChevronRight className="text-gray-500 text-sm" />
        </button>
      </div>
    </div>
  );
};

export default BookList;

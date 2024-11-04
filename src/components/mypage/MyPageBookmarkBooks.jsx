import React, { useEffect, useState } from 'react';
import BookCard from '../ui/BookCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../api/api';

const MypageBookmarkBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/mypage/book/bookmarks', {
          params: { page: currentPage },
        });

        setBooks(response.data.content);
        setTotalPages(response.data.page.totalPages);
        setTotalBooksCount(response.data.page.totalElements);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) return <div className="text-red-500">{error.message}</div>; // 에러 메시지 표시

  return (
    <div>
      <div className="text-xl font-semibold mb-7">
        북마크 문제집 목록 [{totalBooksCount}]
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="flex h-full">
            <BookCard
              key={book.id}
              title={book.title}
              userId={book.userId}
              username={book.username}
              bookmarkCount={book.bookmarkCount}
              id={book.id}
              profileImage={book.userProfile}
              category={book.category}
              isBookmarked={book.bookmarked}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <FaChevronLeft className="text-gray-500 text-sm" />
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`mx-1 ${
              index === currentPage
                ? 'font-bold text-blue-400'
                : 'text-gray-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <FaChevronRight className="text-gray-500 text-sm" />
        </button>
      </div>
    </div>
  );
};

export default MypageBookmarkBooks;

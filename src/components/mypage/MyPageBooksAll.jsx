import React, { useEffect, useState } from 'react';
import BookCard from '../ui/BookCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BookLockToggle from './BookLockToggle';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const MypageBooksAll = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/mypage/book/books', {
        params: { page: currentPage },
      });
      setBooks(response.data.content);
      setTotalPages(response.data.page.totalPages);
      setTotalBooksCount(response.data.page.totalElements);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateBook = () => {
    navigate('/book/create');
  };

  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`, {});

      await fetchBooks();

      setTotalBooksCount((prevCount) => prevCount - 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-7">
        <div className="text-xl font-semibold mr-2">
          문제집 목록 [{totalBooksCount}]
        </div>
        <button
          onClick={handleCreateBook}
          className="bg-gray-200 text-black py-1 px-3 rounded-full ml-5"
        >
          문제집 만들기
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="flex flex-col relative h-full">
            <BookCard
              title={book.title}
              author={book.username}
              bookmarkCount={book.bookmarkCount}
              category={book.category}
            />
            <div className="flex items-center absolute bottom-5 right-2">
              <button
                onClick={() => handleDeleteBook(book.id)}
                className="bg-red-500 text-white text-xs py-1 px-2 rounded ml-2"
              >
                삭제
              </button>
              <BookLockToggle book={book} style={'cursor-pointer'} />
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
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

export default MypageBooksAll;

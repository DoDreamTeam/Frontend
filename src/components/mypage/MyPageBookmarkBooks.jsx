import React, { useState } from 'react';
import BookCard from '../ui/BookCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { FaRegFaceSadCry } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const MyPageBookmarkBooks = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const getBookmarkedBooks = async () => {
    const response = await api.get('/mypage/book/bookmarks', {
      params: { page: currentPage },
    });
    return response.data;
  };

  const {
    data: books = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['myBookmarks', currentPage],
    queryFn: getBookmarkedBooks,
    onError: (err) => {
      console.error(err);
    },
  });

  const { content: bookList, page } = books;
  const totalPages = page?.totalPages || 0;
  const totalBooksCount = page?.totalElements || 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <div className="text-xl font-semibold mb-7">
        북마크 문제집 목록 [{totalBooksCount}]
      </div>

      {bookList.length === 0 ? (
        <div className="text-gray-500 text-center flex items-center justify-center flex-col">
          <div className="flex items-center">
            북마크 한 문제집 목록이 없습니다.
            <FaRegFaceSadCry className="ml-2 text-xl" />
          </div>
          <Link
            to="/book"
            className="mt-4 text-gray-500 font-semibold underline hover:text-gray-500 text-base
             hover:text-[17px] transition-all duration-300 ease-in-out"
          >
            북마크 할 문제집 보러가기
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bookList.map((book) => (
              <div key={book.id} className="flex h-full">
                <BookCard
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
        </>
      )}
    </div>
  );
};

export default MyPageBookmarkBooks;

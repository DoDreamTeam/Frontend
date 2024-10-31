import React from "react";
import BookCard from "../ui/BookCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import usePagination from "../../hooks/usePagination";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const MyProfile = ({ userId, userInfo }) => {
  const { currentPage, setPage } = usePagination(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userBooks", userId, currentPage],
    queryFn: async () => {
      const response = await api.get(
        `/mypage/books/${userInfo.userId}?page=${currentPage}`
      );
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { content: books, totalPages, totalElements: totalBooksCount } = data;

  return (
    <div>
      <div className="flex items-center mb-8">
        {userInfo.profileImage ? (
          <img
            src={userInfo.profileImage}
            alt={`${userInfo.userName}'s profile`}
            className="w-10 h-10 rounded-full mr-4"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-black mr-4" />
        )}
        <div className="text-l font-semibold">{userInfo.userName}</div>
      </div>
      <div className="border-b border-gray-300 mb-8" />

      <div className="flex justify-between items mb-4">
        <div className="text-xl font-semibold mb-7">
          {userInfo.userName} 님의 문제집 목록 [{totalBooksCount}]
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="flex h-full">
            <BookCard
              id={book.id}
              title={book.title}
              username={book.username}
              bookmarkCount={book.bookmarkCount}
              category={book.category}
            />
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalBooksCount > 4 && (
        <div className="flex justify-center mt-8 mb-10">
          <button
            onClick={() => setPage(currentPage - 1, totalPages)}
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
              onClick={() => setPage(index, totalPages)}
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
            onClick={() => setPage(currentPage + 1, totalPages)}
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
      )}
    </div>
  );
};

export default MyProfile;

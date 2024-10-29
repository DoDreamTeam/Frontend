import React, { useEffect, useState } from "react";
import BookCard from "../ui/BookCard";
import useUser from "../../hooks/useUser";
import { getCookie } from "../../utils/cookieUtils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const MyProfile = ({ userId }) => {
  const { userData} = useUser(userId)
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooksCount, setTotalBooksCount] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!userId) {
        console.error("User Id 정의안됨")
        return
      }
      try {
        const token = getCookie("accessToken"); // 토큰 가져오기
        const response = await axios.get(`${import.meta.env.VITE_REST_SERVER}/mypage/books/${userId}?page=${currentPage}`, {
            headers: {
                Authorization: `Bearer ${token}` // 헤더에 토큰 추가
            }
        })
        setBooks(response.data.content) // 사용자 데이터 저장
        setTotalPages(response.data.totalPages)
        setTotalBooksCount(response.data.totalElements)
      } catch (err) {
        console.error(err)
      }
    }
    fetchBooks()
  }, [userId, currentPage]);

  if (!userData) return null; // userData 가 없으면 null 반환
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <div>
      <div className="flex items-center mb-8">
        {userData.profileImage ? (
          // 프로필 이미지가 있으면 표시
          <img
          src={userData.profileImage}
          alt={`${userData.userName}'s profile`}
          className="w-10 h-10 rounded-full mr-4"
          />
        ) : (
          // 프로필 이미지가 없으면 기본 원형
          <div className="w-10 h-10 rounded-full bg-black mr-4" />
        )}
        <div className="text-l font-semibold">{userData.userName}</div>
      </div>
      <div className="border-b border-gray-300 mb-8" />

      <div className="flex justify-between items mb-4">
        <div className="text-xl font-semibold mb-7">
          {userData.userName} 님의 문제집 목록 [{totalBooksCount}]
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          // 책 목록을 BookCard 컴포넌트로 매핑
          <div key={book.id} className="flex h-full">
            <BookCard
              title={book.title}
              author={book.username}
              bookmarkCount={book.bookmarkCount}
              category={book.category}
              />
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8 mb-10">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          <FaChevronLeft className="text-gray-500 text-sm" />
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
          key={index}
            onClick={() => handlePageChange(index)}
            className={`mx-1 ${
              index + 1 === currentPage
                ? "font-bold text-blue-400"
                : "text-gray-500"
            }`}
            >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
          <FaChevronRight className="text-gray-500 text-sm" />
        </button>
      </div>

    </div>
  );
}

  export default MyProfile;
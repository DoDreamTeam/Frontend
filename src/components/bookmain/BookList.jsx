import React, { useState } from "react";
import BookCard from "../../components/ui/BookCard";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import usePagination from "../../hooks/usePagination";
import { categoryNames } from "../../utils/categoryUtils";
import Pagination from "../ui/Pagination";

const BookList = ({ searchResults }) => {
  const itemsPerPage = 12;
  const [category, setCategory] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  const { currentPage, setPage } = usePagination(0);

  // 책 목록을 가져오는 함수
  const getBookList = async (page) => {
    const categoryParam = category !== "전체" ? `&category=${category}` : "";
    try {
      const response = await api.get(
        `/books?page=${page}&size=${itemsPerPage}${categoryParam}`
      );
      return response.data;
    } catch (error) {
      throw error; // 에러를 던져서 useQuery에서 처리하도록 합니다.
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", currentPage, category],
    queryFn: () => getBookList(currentPage),
  });

  // 로딩 중일 때
  if (isLoading) return <p>Loading...</p>;

  // 오류 발생 시
  if (error) {
    console.error("Error fetching books:", error);
  }

  // `data`가 없거나, 데이터가 빈 배열일 경우 처리
  const books = searchResults || (data && data.content) || [];
  const totalBooks = searchResults
    ? searchResults.length
    : data?.page?.totalElements || 0;

  const filteredBooks = books.sort((a, b) => {
    if (sortOrder === "최신순") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return b.bookmarkCount - a.bookmarkCount;
    }
  });

  return (
    <div className="mb-6 max-w-screen-lg mx-auto">
      {/* 카테고리 필터 버튼 */}
      <div className="flex mb-4">
        {["전체", "CATEGORY_CS", "CATEGORY_CERT", "CATEGORY_ETC"].map((cat) => (
          <button
            key={cat}
            className={`py-2 px-4 mx-1 rounded ${
              category === cat ? "font-semibold text-black" : "text-gray-400"
            }`}
            onClick={() => setCategory(cat)}
          >
            {categoryNames[cat]}
          </button>
        ))}
      </div>

      {/* 정렬 옵션 버튼 */}
      <div className="flex mb-4 ml-2">
        {["최신순", "북마크 많은 순"].map((order) => (
          <button
            key={order}
            className={`py-2 px-4 mx-1 rounded text-sm ${
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
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              userId={book.userId}
              username={book.username}
              bookmarkCount={book.bookmarkCount}
              category={book.category}
              id={book.id}
              profileImage={book.userProfile}
              isBookmarked={book.bookmarked}
            />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            {category !== "전체" &&
            data &&
            data.content &&
            data.content.length === 0
              ? `해당 카테고리에 존재하는 문제집이 없습니다.`
              : "검색 결과와 일치하는 문제집이 없습니다."}
          </p>
        )}
      </div>

      {/* 페이지네이션 */}
      {searchResults ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.page?.totalPages || 0}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default BookList;

import React, { useState } from "react";
import BookBanner from "../components/bookmain/BookBanner";
import BookSearch from "../components/bookmain/BookSearch";
import { useNavigate } from "react-router-dom";
import BookList from "../components/bookmain/BookList";

const BookMain = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* 문제집 설명 Banner */}
      <BookBanner />

      {/* 검색창 및 버튼 */}
      <div className="flex justify-end mb-10">
        <div className="flex items-center w-full max-w-md space-x-2">
          <button
            className="bg-[#ACC7FF] text-white px-2 py-2 rounded-lg text-sm w-[50%] hover:bg-[#6686FA]"
            onClick={() => navigate("/book/create")}
          >
            문제집 만들기
          </button>
          <BookSearch setSearchResults={setSearchResults} />
        </div>
      </div>

      {/* 문제집 리스트 */}
      <BookList searchResults={searchResults} />
    </div>
  );
};

export default BookMain;

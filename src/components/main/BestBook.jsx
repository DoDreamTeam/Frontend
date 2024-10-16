import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BestBookList from "./BestBookList";

const BestBook = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">🔥 이번주 인기 문제집</div>
        <button
          className="flex items-center text-xs text-gray-500 hover:underline"
          onClick={() => navigate("/book")}
        >
          더보기 <FaAngleRight className="ml-1 text-gray-500" />
        </button>
      </div>

      {/* 북마크 수가 많은 문제집 4개를 가져오기 */}
      <BestBookList />
    </div>
  );
};

export default BestBook;

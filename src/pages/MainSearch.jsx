import React from "react";
import SearchResult from "../components/main/SearchResult";
import { useLocation, useNavigate } from "react-router-dom";

const MainSearch = () => {
  const location = useLocation(); // 현재 경로의 정보를 가져옴
  const searchResults = location.state?.results || { content: [] }; // 이전 페이지에서 전달한 검색 결과
  const keyword = location.state?.keyword || "";
  const navigate = useNavigate();

  return (
    <div className="w-[1200px]">
      <div className="flex items-center justify-between mb-4 p-2">
        <h1 className="text-2xl font-bold">{keyword}로 검색한 결과</h1>
        <button
          className="text-sm px-4 py- text-gray-400 hover:underline"
          onClick={() => navigate("/")}
        >
          이전으로
        </button>
      </div>
      {searchResults.content.length > 0 ? (
        <SearchResult results={searchResults} />
      ) : (
        <p className="col-span-4 text-center text-gray-500 mb-16">
          검색 결과와 일치하는 문제집/스터디가 없습니다.
        </p>
      )}
    </div>
  );
};

export default MainSearch;

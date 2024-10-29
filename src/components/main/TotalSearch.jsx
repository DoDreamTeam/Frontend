import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../ui/SearchInput";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const TotalSearch = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const {
    data: searchResults = { content: [] },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchResults", keyword],
    queryFn: async () => {
      if (!keyword) return { content: [] };
      const response = await api.get(
        `/search?keyword=${encodeURIComponent(keyword)}`
      );
      return response.data;
    },
    enabled: !!keyword,
  });

  const handleSearchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchResult = () => {
    if (keyword) {
      // 검색어가 있을 경우, 검색 결과를 전달하여 /search로 이동
      navigate("/search", { state: { results: searchResults, keyword } });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md justify-end">
        <SearchInput
          className="w-full max-w-md"
          value={keyword}
          onChange={handleSearchKeyword}
          onSearch={handleSearchResult}
          placeholder="검색어를 입력하세요"
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default TotalSearch;

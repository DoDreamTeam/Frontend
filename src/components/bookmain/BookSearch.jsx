import React, { useState } from "react";
import SearchInput from "../ui/SearchInput";

const BookSearch = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="w-full flex items-center">
      <SearchInput
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="문제집 제목을 검색할 수 있습니다."
        className="flex-1" // 추가: flex-grow
      />
    </div>
  );
};

export default BookSearch;

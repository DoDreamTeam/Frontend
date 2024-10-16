import React, { useState } from "react";
import SearchInput from "../ui/SearchInput";

const TotalSearch = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <SearchInput
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default TotalSearch;

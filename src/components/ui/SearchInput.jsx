import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ value, onChange, placeholder, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
        placeholder={placeholder}
        className="border border-gray-300 rounded-md p-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
      />
      <button
        onClick={onSearch} // 검색 버튼 클릭 시 검색 수행
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
      >
        <FaSearch className="text-gray-500" />
      </button>
    </div>
  );
};

export default SearchInput;

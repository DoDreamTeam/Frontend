import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import defaultProfile from "../../assets/default_profile.jpg";
import { useNavigate } from "react-router-dom";

const categoryStyles = {
  CS: "bg-blue-100 text-blue-800 border border-blue-300 text-xs",
  자격증: "bg-green-100 text-green-800 border border-green-300 text-xs",
  기타: "bg-yellow-100 text-yellow-800 border border-yellow-300 text-xs",
};

const BookCard = ({ title, author, bookmarkCount, category }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="border border-black shadow-lg rounded-lg p-4 flex flex-col h-64 w-64 justify-between">
      {/* 카테고리 및 북마크 */}
      <div className="flex justify-between items-center mb-1">
        <div
          className={`text-sm font-semibold p-2 rounded ${categoryStyles[category]}`}
          style={{ borderRadius: "20px" }}
        >
          {category}
        </div>
        <div className="flex items-center text-xs">
          <button onClick={toggleBookmark}>
            {isBookmarked ? (
              <FaBookmark className="text-blue-500 mr-1" />
            ) : (
              <FaBookmark className="text-gray-500 mr-1" />
            )}
          </button>
          <span className="text-sm text-gray-500">{bookmarkCount}</span>
        </div>
      </div>
      {/* 문제집 제목 */}
      <div
        className="text-lg mt-3 mb-2 flex-grow hover:underline hover:text-gray-400 cursor-pointer"
        onClick={() => navigate("/book/:id/questions")}
      >
        {title}
      </div>
      {/* 작성자 및 프로필 사진 */}
      <div className="flex items-center text-sm text-gray-500 mt-auto">
        <img
          src={defaultProfile}
          alt="Profile"
          className="h-6 w-6 rounded-full mr-2"
        />
        <span>{author}</span>
      </div>
    </div>
  );
};

export default BookCard;

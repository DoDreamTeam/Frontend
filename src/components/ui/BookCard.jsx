import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryNames, categoryStyles } from "../../utils/categoryUtils";
import { FaBookmark } from "react-icons/fa";
import api from "../../api/api";
import defaultProfile from "../../assets/default_profile.jpg";
import BookmarkButton from "./BookmarkButton";

const BookCard = ({
  id,
  title,
  userId,
  username,
  profileImage,
  bookmarkCount,
  category,
  isBookmarked,
  onBookmarkToggle,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border border-black shadow-lg rounded-lg p-4 flex flex-col h-60 w-60 justify-between">
      {/* 카테고리 및 북마크 */}
      <div className="flex justify-between items-center mb-1">
        <div
          className={`text-sm font-semibold p-2 rounded ${categoryStyles[category]}`}
          style={{ borderRadius: "20px" }}
        >
          {categoryNames[category] || category}
        </div>
        <div className="flex items-center">
          <BookmarkButton
            bookId={id}
            isBookmarked={isBookmarked}
            onBookmarkToggle={onBookmarkToggle}
            bookOwnerName={username}
          />
          <div className="ml-1">{bookmarkCount}</div>
        </div>
      </div>
      {/* 문제집 제목 */}
      <div
        className="text-lg mt-3 mb-2 flex-grow hover:underline hover:text-gray-400 cursor-pointer"
        onClick={() => navigate(`/book/${id}/questions`)}
      >
        {title}
      </div>
      {/* 작성자 및 프로필 사진 */}
      <div className="flex items-center text-sm text-gray-500 mt-auto">
        <img
          src={profileImage || defaultProfile}
          alt="profile"
          className="h-6 w-6 rounded-full mr-2"
        />
        <span
          className="hover:underline cursor-pointer"
          onClick={() => navigate(`/mypage/${userId}`)}
        >
          {username}
        </span>
      </div>
    </div>
  );
};

export default BookCard;

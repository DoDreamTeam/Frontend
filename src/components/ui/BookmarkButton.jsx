import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import api from "../../api/api";

const BookmarkButton = ({
  isBookmarked,
  bookmarkCount,
  onToggleBookmark,
  bookId,
}) => {
  const toggleBookmark = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/books/${bookId}/bookmark`);
      return response.data;
    },
    onSuccess: (data) => {
      onToggleBookmark(data.deleted); // deleted가 true면 북마크 취소
    },
    onError: (error) => {
      console.error("Bookmark ERROR: ", error);
    },
  });

  const handleToggleBookmark = () => {
    toggleBookmark.mutate();
  };

  return (
    <div className="flex items-center">
      <button onClick={handleToggleBookmark}>
        <FaBookmark
          className={isBookmarked ? "text-blue-500 mr-1" : "text-gray-500 mr-1"}
        />
      </button>
      <span className="text-sm text-gray-500">{bookmarkCount}</span>
    </div>
  );
};

export default BookmarkButton;

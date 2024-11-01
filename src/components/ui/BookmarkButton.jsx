import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import api from "../../api/api";
import { useUser } from "../../context/UserProvider";
import useAlert from "../../hooks/useAlert";

const BookmarkButton = ({
  bookId,
  isBookmarked,
  onBookmarkToggle,
  bookOwnerName,
}) => {
  const { userInfo } = useUser();
  const queryClient = useQueryClient();
  const { showAlert, Alert } = useAlert();

  const toggleBookmark = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/books/${bookId}/bookmark`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("books");
      onBookmarkToggle(data.isBookmarked);
    },
  });

  const handleClick = () => {
    if (!userInfo) {
      showAlert("로그인 후 북마크를 사용할 수 있습니다.");
      return;
    }

    if (userInfo.userName === bookOwnerName) {
      showAlert("본인이 만든 문제집을 북마크할 수 없습니다.");
      return;
    }

    toggleBookmark.mutate();
  };

  return (
    <div className="flex items-center">
      <button onClick={handleClick}>
        <FaBookmark
          className={isBookmarked ? "text-blue-500 mr-1" : "text-gray-500 mr-1"}
        />
      </button>

      {/* alert */}
      <Alert />
    </div>
  );
};

export default BookmarkButton;

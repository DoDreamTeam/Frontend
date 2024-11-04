import React from "react";
import { useUser } from "../../../context/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "../../../hooks/useAlert";
import api from "../../../api/api";
import { FaHeart } from "react-icons/fa";

const LikeButton = ({
  bookId,
  commentId,
  isLiked,
  onLikeToggle,
  commentOwnerName,
}) => {
  const { userInfo } = useUser();
  const queryClient = useQueryClient();
  const { showAlert, Alert } = useAlert();

  const toggleLike = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `/books/${bookId}/comments/${commentId}/like`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("comments");
      onLikeToggle(data.isLiked);
    },
  });

  const handleClick = () => {
    if (!userInfo) {
      showAlert("로그인 후 좋아요를 누를 수 있습니다.");
      return;
    }

    if (userInfo.userName === commentOwnerName) {
      showAlert("본인이 작성한 댓글은 좋아요할 수 없습니다.");
      return;
    }

    toggleLike.mutate();
  };

  return (
    <div className="flex items-center">
      <button onClick={handleClick} disabled={toggleLike.isLoading}>
        <FaHeart
          className={isLiked ? "text-red-500 mr-1" : "text-gray-500 mr-1"}
        />
        <Alert />
      </button>
    </div>
  );
};

export default LikeButton;

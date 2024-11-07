import React, { useState } from "react";
import { useUser } from "../../../context/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";
import { FaHeart } from "react-icons/fa";
import useModal from "../../../hooks/useModal";
import LoginRequestModal from "../../ui/LoginRequestModal";

const LikeButton = ({
  userAnswerId,
  commentId,
  isLiked,
  onLikeToggle,
  commentOwnerName,
}) => {
  const { userInfo } = useUser();
  const queryClient = useQueryClient();
  const { openModal, closeModal, Modal } = useModal();
  const [isMyComment, setIsMyComment] = useState(false);

  const toggleLike = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `/study/answer/${userAnswerId}/comments/${commentId}/like`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("studycomments");
      onLikeToggle(data.isLiked);
    },
  });

  const handleClick = () => {
    if (!userInfo) {
      openModal();
      return;
    }

    if (userInfo.userName === commentOwnerName) {
      setIsMyComment(true);
      openModal();
      return;
    }

    toggleLike.mutate();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="flex items-center">
      <button onClick={handleClick} disabled={toggleLike.isLoading}>
        <FaHeart
          className={isLiked ? "text-red-500 mr-1" : "text-gray-500 mr-1"}
        />
      </button>

      {/* 비회원이 좋아요 누를 때 Modal */}
      <Modal>
        <LoginRequestModal handleCloseModal={handleCloseModal} />
      </Modal>

      {isMyComment && (
        <Modal>
          <div className="text-2xl font-semibold m-6">
            본인이 쓴 댓글은 좋아요를 누를 수 없습니다.
            <div className="flex justify-center mt-4 w-full">
              <button
                className="w-3/4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-4"
                onClick={closeModal}
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LikeButton;

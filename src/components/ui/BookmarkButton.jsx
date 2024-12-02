import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import api from "../../api/api";
import { useUser } from "../../context/UserProvider";
import useModal from "../../hooks/useModal";
import LoginRequestModal from "./LoginRequestModal";

const BookmarkButton = ({
  bookId,
  isBookmarked,
  onBookmarkToggle,
  bookOwnerName,
}) => {
  const { userInfo } = useUser();
  const queryClient = useQueryClient();
  const { openModal, closeModal, Modal } = useModal();
  const [isMyBook, setIsMyBook] = useState(false);

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
      openModal();
      return;
    }

    if (userInfo.userName === bookOwnerName) {
      setIsMyBook(true);
      openModal();
      return;
    }

    toggleBookmark.mutate();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="flex items-center">
      <button onClick={handleClick}>
        <FaBookmark
          className={isBookmarked ? "text-blue-500 mr-1" : "text-gray-500 mr-1"}
        />
      </button>

      {/* 비회원이 북마크 누를 때 Modal */}
      <Modal>
        <LoginRequestModal handleCloseModal={handleCloseModal} />
      </Modal>

      {isMyBook && (
        <Modal>
          <div className="text-2xl font-semibold m-6">
            본인이 만든 문제집은 북마크할 수 없습니다.
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

export default BookmarkButton;

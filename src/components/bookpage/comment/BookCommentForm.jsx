import React, { useState } from "react";
import CommentForm from "../../ui/CommentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";
import useModal from "../../../hooks/useModal";
import { IoMdWarning } from "react-icons/io";

const BookCommentForm = ({ bookId }) => {
  const queryClient = useQueryClient();
  const { openModal, Modal, closeModal, isModalOpen } = useModal();
  const [comment, setComment] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (comment) => {
      const response = await api.post(`/books/${bookId}/comments`, {
        comment: comment,
      });
      return response.data;
    },
    onSuccess: () => {
      // 댓글 작성 성공 후 쿼리 무효화
      queryClient.invalidateQueries(["comments", bookId]);
    },
    onError: (error) => {
      if (error.response && error.response.status === 403) {
        setModalMessage("댓글을 작성하려면 로그인해 주세요."); // 403 에러 메시지 설정
        openModal();
      } else {
        console.log("COMMENT ERROR!", error);
      }
    },
  });

  const handleCommentSubmit = (comment) => {
    if (!comment || comment.trim() === "") {
      setModalMessage("댓글을 작성해야 합니다.");
      openModal();
      return;
    }
    mutation.mutate(comment);
    setComment("");
  };

  const handleCloseModal = () => {
    closeModal();
    setModalMessage("");
  };

  return (
    <>
      <CommentForm
        placeholder="문제집에 궁금한 점이 있다면 댓글을 남겨주세요 :)"
        buttonText="작성"
        onSubmit={handleCommentSubmit}
        comment={comment}
        setComment={setComment}
      />

      {/* 댓글 작성이 비어 있을 경우 모달 */}
      {isModalOpen && (
        <Modal>
          <div className="text-center p-4">
            <h2 className="flex justify-center">
              <IoMdWarning className="text-yellow-500 text-4xl" />
            </h2>
            <p className="mt-2">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BookCommentForm;

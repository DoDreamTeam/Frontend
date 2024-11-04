import React from "react";
import CommentForm from "../../ui/CommentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";

const BookCommentForm = ({ bookId }) => {
  const queryClient = useQueryClient();

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
    onError: () => {
      console.log("COMMENT ERROR!");
    },
  });

  const handleCommentSubmit = (comment) => {
    mutation.mutate(comment); // 댓글 내용을 인자로 전달
  };

  return (
    <>
      <CommentForm
        placeholder="문제집에 궁금한 점이 있다면 댓글을 남겨주세요 :)"
        buttonText="작성"
        onSubmit={handleCommentSubmit}
      />
    </>
  );
};

export default BookCommentForm;

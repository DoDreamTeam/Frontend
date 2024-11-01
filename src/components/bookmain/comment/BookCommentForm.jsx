import React from "react";
import CommentForm from "../../ui/CommentForm";

const BookCommentForm = () => {
  const handleCommentSubmit = () => {
    alert("댓글");
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

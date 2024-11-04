import React from "react";
import CommentForm from "../bookmain/comment/BookCommentForm";
import CommentList from "../bookmain/comment/CommentList";

const BookComment = ({ bookId }) => {
  return (
    <div>
      <CommentForm bookId={bookId} />

      <CommentList bookId={bookId} />
    </div>
  );
};

export default BookComment;

import React from "react";
import CommentForm from "./comment/BookCommentForm";
import CommentList from "./comment/CommentList";

const BookComment = ({ bookId }) => {
  return (
    <div>
      <CommentForm bookId={bookId} />

      <CommentList bookId={bookId} />
    </div>
  );
};

export default BookComment;

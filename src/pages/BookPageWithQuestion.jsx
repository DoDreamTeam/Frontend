import React from "react";
import BookInfo from "../components/bookpage/BookInfo";
import { useParams } from "react-router-dom";
import QuestionList from "../components/bookpage/QuestionList";
import BookComment from "../components/bookpage/BookComment";

const BookPageWithQuestion = () => {
  const { id } = useParams();

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col w-full">
      <BookInfo bookId={id} />

      {/* 문제 리스트 */}
      <QuestionList bookId={id} />

      {/* 문제집 댓글 */}
      <BookComment bookId={id} />
    </div>
  );
};

export default BookPageWithQuestion;

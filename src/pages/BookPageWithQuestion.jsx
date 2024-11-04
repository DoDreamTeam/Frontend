import React from "react";
import BookInfo from "../components/bookpage/BookInfo";
import { useParams } from "react-router-dom";
import QuestionList from "../components/bookpage/QuestionList";
import BookComment from "../components/bookpage/BookComment";
import api from "../api/api";
import { useQuery } from "@tanstack/react-query";

const BookPageWithQuestion = () => {
  const { id } = useParams();

  // 문제집 정보 가져오기
  const getBookInfo = async () => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  };

  const {
    data: bookData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: getBookInfo,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col w-full">
      <BookInfo bookData={bookData} />

      {/* 문제 리스트 */}
      <QuestionList bookId={id} bookOwnerName={bookData.username} />

      {/* 문제집 댓글 */}
      <BookComment bookId={id} />
    </div>
  );
};

export default BookPageWithQuestion;

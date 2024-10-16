import React from "react";
import BookCard from "../ui/BookCard";

const BestBookList = () => {
  const books = [
    {
      title: "정보처리기사 필기",
      author: "testA",
      bookmarkCount: 200,
      category: "CS",
    },
    {
      title: "삼성전자 면접 대비",
      author: "testB",
      bookmarkCount: 170,
      category: "자격증",
    },
    {
      title: "면접 대비 네트워크 공부",
      author: "testC",
      bookmarkCount: 140,
      category: "자격증",
    },
    {
      title: "정보처리기사 실기",
      author: "testA",
      bookmarkCount: 70,
      category: "기타",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book, index) => (
        <div key={index} className="flex h-full">
          <BookCard
            title={book.title}
            author={book.author}
            bookmarkCount={book.bookmarkCount}
            category={book.category}
          />
        </div>
      ))}
    </div>
  );
};

export default BestBookList;

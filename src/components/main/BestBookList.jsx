import React, { useState } from "react";
import BookCard from "../ui/BookCard";
import axios from "axios";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const BestBookList = () => {
  const getPopularBooks = async () => {
    const response = await api.get("/books/popular");
    return response.data.content;
  };

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularBooks"],
    queryFn: getPopularBooks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book, index) => (
        <div key={index} className="flex h-full">
          <BookCard
            title={book.title}
            userId={book.userId}
            username={book.username}
            bookmarkCount={book.bookmarkCount}
            category={book.category}
            id={book.id}
            profileImage={book.userProfile}
            isBookmarked={book.bookmarked}
          />
        </div>
      ))}
    </div>
  );
};

export default BestBookList;

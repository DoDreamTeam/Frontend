import React from "react";
import BookCard from "../ui/BookCard";

const MyProfile = () => {
  const data = {
    user: {
      id: "1",
      username: "Minsung",
      profile_image: "",
      provider: "kakao",
      provider_id: "12345",
      created_at: "2022-01-01T10:00:00Z",
      updated_at: "2023-10-01T12:00:00Z",
    },
    books: [
      {
        book_id: "1",
        title: "CS 문제집",
        category: "자격증",
        secret: true,
        author: "Minsung",
        bookmarkCount: 150,
        viewCount: 300,
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-01-10T09:00:00Z",
      },
      {
        book_id: "2",
        title: "CS 문제집2",
        category: "기타",
        secret: false,
        author: "Minsung",
        bookmarkCount: 100,
        viewCount: 500,
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-01-10T09:00:00Z",
      },
      {
        book_id: "3",
        title: "CS 문제집3",
        category: "CS",
        secret: false,
        author: "Minsung",
        bookmarkCount: 100,
        viewCount: 500000,
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-01-10T09:00:00Z",
      },
    ],
  };
  return (
    <div>
      <div className="flex items-center mb-8">
        {data.user.profile_image ? (
          <img
            src={data.user.profile_image}
            alt={`${data.user.username}'s profile`}
            className="w-10 h-10 rounded-full mr-4"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-black mr-4" />
        )}
        <div className="text-l font-semibold">{data.user.username}</div>
      </div>
      <div className="border-b border-gray-300 mb-8" />

      <div className="flex justify-between items mb-4">
        <div className="text-xl font-semibold mb-7">
          {data.user.username}님의 문제집 목록 [{data.books.length}]
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.books.map((book, index) => (
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
    </div>
  );
};

export default MyProfile;

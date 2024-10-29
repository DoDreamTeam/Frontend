import React from "react";
import BookCard from "../ui/BookCard";
import StudyCard from "../ui/StudyCard";

const SearchResult = ({ results }) => {
  // 문제집과 스터디를 별도로 그룹화
  const books = results.content.filter((result) => result.type === "Book");
  const studies = results.content.filter((result) => result.type === "Study");

  return (
    <div className="p-2 mb-6">
      {books.length > 0 && (
        <div className="mb-6">
          <div className="text-xl font-semibold mb-6">문제집</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      )}

      {studies.length > 0 && (
        <div>
          <div className="text-xl font-semibold mb-6">스터디</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {studies.map((study) => (
              <StudyCard key={study.id} {...study} />
            ))}
          </div>
        </div>
      )}

      {books.length === 0 && studies.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResult;

import React from "react";
import CreateBookForm from "../components/createBook/CreateBookForm";

const CreateBook = () => {
  return (
    <div className="w-full mb-16">
      <div className="text-3xl text-blue-600 font-bold mb-16 text-left">
        문제집 만들기
      </div>

      {/* 문제집 만들기 form */}
      <CreateBookForm />
    </div>
  );
};

export default CreateBook;

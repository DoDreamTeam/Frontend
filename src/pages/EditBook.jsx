import React from "react";
import EditForm from "../components/editBook/EditForm";

const EditBook = () => {
  return (
    <div className="w-full mb-20">
      <div className="text-3xl text-blue-600 font-bold mb-16 text-left">
        문제집 수정하기
      </div>
      <EditForm />
    </div>
  );
};

export default EditBook;

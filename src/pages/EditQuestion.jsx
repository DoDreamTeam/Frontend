import React from "react";
import EditQuestionForm from "../components/question/EditQuestionForm";

const EditQuestion = () => {
  return (
    <div className="w-full mb-16">
      <div className="text-3xl text-blue-600 font-bold mb-16 text-left">
        문제 수정하기
      </div>

      <EditQuestionForm />
    </div>
  );
};

export default EditQuestion;

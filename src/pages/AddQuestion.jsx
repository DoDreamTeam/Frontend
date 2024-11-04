import React from "react";
import QuestionForm from "../components/question/AddQuestionForm";
import { useParams } from "react-router-dom";

const AddQuestion = () => {
  const { id } = useParams();

  return (
    <div className="w-full mb-16">
      <div className="text-3xl text-blue-600 font-bold mb-16 text-left">
        문제 추가하기
      </div>

      <QuestionForm id={id} />
    </div>
  );
};

export default AddQuestion;

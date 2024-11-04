import React, { useState } from "react";
import api from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const SolveQuestionForm = ({ bookId, questionId }) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const maxAnswerLength = 1000;

  const handleAnswerChange = (e) => {
    if (e.target.value.length <= maxAnswerLength) {
      setAnswer(e.target.value);
    }
  };

  const submitAnswer = async (answerData) => {
    const response = await api.post(
      `/books/${bookId}/questions/${questionId}/answer`,
      answerData
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitAnswer,
    onSuccess: (data) => {
      navigate(`/book/${bookId}/questions/${questionId}/submit/${data.id}`);
    },
    onError: (error) => {
      console.error("Error submitting answer:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const answerData = {
      answer: answer,
    };

    mutation.mutate(answerData);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-12">
        <div className="text-3xl text-blue-600 font-bold mb-4 text-left">
          A.
        </div>
        <textarea
          placeholder="답안을 입력하세요. (1000자 이내)"
          value={answer}
          onChange={handleAnswerChange}
          className="border border-gray-300 rounded-md p-2 pr-10 w-full h-48 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs resize-none"
        />
        <div className="text-right text-gray-500 text-xs">
          {maxAnswerLength - answer.length}자 남음
        </div>
        <div className="text-left text-gray-500 text-sm">
          *아예 모르는 경우에는 그냥 [제출] 버튼을 누를 수 있습니다.
        </div>
      </div>

      <div className="flex justify-center mb-12">
        <button
          type="submit"
          className={`w-full text-white bg-blue-600 px-4 py-2 rounded-md`}
        >
          제출하기
        </button>
      </div>
    </form>
  );
};

export default SolveQuestionForm;

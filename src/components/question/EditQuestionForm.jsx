import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAlert from "../../hooks/useAlert";

const EditQuestionForm = () => {
  const { id, questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { showAlert, Alert } = useAlert();

  const maxQuestionLength = 255;
  const maxAnswerLength = 1000;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await api.get(`/books/${id}/questions/${questionId}`);
        setQuestion(response.data.question);
        setAnswer(response.data.modelAnswer);
      } catch (error) {
        console.error("Error fetching question: ", error);
      }
    };

    fetchQuestion();
  }, [id, questionId]);

  const isFormValid = question && answer;

  const handleQuestionChange = (e) => {
    if (e.target.value.length <= maxQuestionLength) {
      setQuestion(e.target.value);
    }
  };

  const handleAnswerChange = (e) => {
    if (e.target.value.length <= maxAnswerLength) {
      setAnswer(e.target.value);
    }
  };

  const updateQuestion = async (questionData) => {
    const response = await api.patch(
      `/books/${id}/questions/${questionId}`,
      questionData
    );
    return response.data;
  };

  const updateQuestionMutation = useMutation({
    mutationFn: updateQuestion,
    onSuccess: () => {
      showAlert("문제가 성공적으로 수정되었습니다.", "success");
      navigate(`/book/${id}/questions`);
    },
    onError: (error) => {
      console.error("Update Question ERROR: ", error);
      showAlert("문제 수정 중 오류가 발생했습니다.", "error");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      const questionData = {
        question,
        modelAnswer: answer,
      };

      try {
        await updateQuestionMutation.mutateAsync(questionData);
      } catch (error) {
        console.error("Error while updating question: ", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-12">
          <label className="block mb-4 text-xl font-semibold">
            질문<span className="text-red-600 font-bold">*</span>
          </label>
          <textarea
            placeholder="특수문자 포함 255자 이내로 작성해주세요."
            value={question}
            onChange={handleQuestionChange}
            className="border border-gray-300 rounded-md p-2 pr-10 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs resize-none"
          ></textarea>
          <div className="text-right text-gray-500 text-sm">
            {maxQuestionLength - question.length}자 남음
          </div>
        </div>

        <div className="mb-12">
          <label className="block mb-4 text-xl font-semibold">
            모범답안<span className="text-red-600 font-bold">*</span>
          </label>
          <textarea
            placeholder="특수문자 포함 1000자 이내로 작성해주세요."
            value={answer}
            onChange={handleAnswerChange}
            className="border border-gray-300 rounded-md p-2 pr-10 w-full h-48 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs resize-none"
          ></textarea>
          <div className="text-right text-gray-500 text-sm">
            {maxAnswerLength - answer.length}자 남음
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full text-white bg-blue-600 px-4 py-2 rounded-md mr-2 ${
              !isFormValid && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            문제 수정하기
          </button>
          <button
            type="button"
            onClick={() => navigate(`/book/${id}/questions`)}
            className="w-full border hover:bg-gray-100 px-4 py-2 rounded-md"
          >
            취소
          </button>
        </div>
      </form>

      <Alert />
    </>
  );
};

export default EditQuestionForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import useModal from "../../hooks/useModal";

const QuestionForm = ({ id }) => {
  const navigate = useNavigate();
  const { openModal, closeModal, Modal } = useModal();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const isFormValid = question && answer;
  const maxQuestionLength = 255;
  const maxAnswerLength = 1000;

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

  const addQuestion = async (questionData) => {
    const response = await api.post(`/books/${id}/questions`, questionData);
    return response.data;
  };

  const addQuestionMutation = useMutation({
    mutationFn: addQuestion,
    onSuccess: () => {
      openModal(); // 모달 열기
    },
    onError: (error) => {
      console.error("Add Question ERROR: ", error);
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
        await addQuestionMutation.mutateAsync(questionData);
      } catch (error) {
        console.error("Error while adding question: ", error);
      }
    }
  };

  const handleModalResponse = (addMore) => {
    closeModal(); // 모달 닫기
    if (addMore) {
      setQuestion(""); // 질문 입력 필드 초기화
      setAnswer(""); // 답변 입력 필드 초기화
    } else {
      navigate(`/book/${id}/questions`); // 문제집 페이지로 리다이렉션
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
            문제 추가하기
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

      {/* 문제 추가 후 모달 */}
      <Modal style="w-120 text-center">
        <div className="text-2xl font-semibold m-6">
          문제를 추가하였습니다. 더 추가하시겠습니까?
        </div>
        <div className="flex justify-around mt-4 w-full">
          <button
            className="w-3/4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-4"
            onClick={() => handleModalResponse(true)} // 예
          >
            예
          </button>
          <button
            className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
            onClick={() => handleModalResponse(false)} // 아니요
          >
            아니요
          </button>
        </div>
      </Modal>
    </>
  );
};

export default QuestionForm;

import React, { useState } from "react";
import api from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { IoMdWarning } from "react-icons/io";

const SolveQuestionForm = ({ bookId, questionId }) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const maxAnswerLength = 1000;
  const { openModal, Modal, closeModal, isModalOpen } = useModal();

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
      if (error.response && error.response.status === 403) {
        openModal();
      } else {
        console.log("SOLVE QUESTION ERROR : ", error);
      }
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
    <>
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

      {/* 비회원 접근 시 모달 */}
      {isModalOpen && (
        <Modal>
          <div className="text-center p-4">
            <h2 className="flex justify-center">
              <IoMdWarning className="text-yellow-500 text-4xl" />
            </h2>
            <p className="mt-2">문제를 풀려면 로그인해야 합니다.</p>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SolveQuestionForm;

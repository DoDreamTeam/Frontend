import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EvaluationButton from "./EvaluationButton";
import { formatDate } from "../../../utils/formatDateUtils";
import useModal from "../../../hooks/useModal";

const QuestionItem = ({
  question,
  index,
  currentPage,
  userInfo,
  bookId,
  bookOwnerName,
  onEditClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const [showAlreadySolvedModal, setShowAlreadySolvedModal] = useState(false);
  const { openModal, closeModal, Modal } = useModal();

  const isUserQuestion =
    userInfo && userInfo.userId === question.evaluation?.userId;

  const handleEvaluationButtonClick = (evaluation) => {
    if (!evaluation) {
      // '학습하기' 버튼을 클릭한 경우, 해당 질문 페이지로 이동
      navigate(`/book/${bookId}/questions/${question.id}`);
    } else {
      // 이미 푼 문제라면 모달을 띄운다
      openModal();
    }
  };

  const handleModalClose = () => {
    closeModal();
  };

  const handleModalConfirm = () => {
    // '예' 버튼 클릭 시 해당 질문 페이지로 이동
    navigate(`/book/${bookId}/questions/${question.id}`);
    closeModal();
  };

  return (
    <div
      key={question.id}
      className="flex items-center mb-2 border-b border-gray-200 pb-2"
    >
      <div className="w-12 text-center mr-2">{currentPage * 5 + index + 1}</div>
      <div
        className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap hover:underline cursor-pointer"
        onClick={() => navigate(`/book/${bookId}/questions/${question.id}`)}
      >
        {question.question}
      </div>
      <div>
        {userInfo?.userName === bookOwnerName && (
          <div className="flex justify-center mt-2">
            <button className="mx-1" onClick={() => onEditClick(question.id)}>
              <MdEdit className="hover:text-blue-400" />
            </button>
            <button className="mx-1" onClick={() => onDeleteClick(question.id)}>
              <MdDelete className="hover:text-blue-400" />
            </button>
          </div>
        )}
      </div>
      <div className="ml-4 flex items-center">
        <div
          className="text-gray-500 mr-2 text-sm"
          style={{ minWidth: "100px" }}
        >
          {formatDate(question.createdAt)}
        </div>
        <div className="flex justify-center" style={{ minWidth: "80px" }}>
          <EvaluationButton
            evaluation={isUserQuestion ? question.evaluation : null}
            onClick={() => handleEvaluationButtonClick(question.evaluation)}
          />
        </div>
      </div>

      {/* 이미 푼 문제 모달 */}

      <Modal style="w-120 text-center">
        <div className="text-2xl font-semibold m-6">
          이미 푼 문제입니다. 다시 학습하시겠습니까?
        </div>
        <div className="flex justify-around mt-4 w-full">
          <button
            className="w-3/4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-4"
            onClick={handleModalConfirm}
          >
            예
          </button>
          <button
            className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
            onClick={handleModalClose}
          >
            아니요
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionItem;

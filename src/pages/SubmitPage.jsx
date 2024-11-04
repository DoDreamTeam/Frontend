import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import EvaluationModal from "../components/questionEvaluate/EvaluationModal";
import useModal from "../hooks/useModal";

const SubmitPage = () => {
  const { bookId, questionId, id } = useParams();
  const [submissionDetails, setSubmissionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openModal, closeModal, Modal } = useModal(); // 수정

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        const response = await api.get(
          `/books/${bookId}/questions/${questionId}/answer/${id}`
        );
        setSubmissionDetails(response.data);
      } catch (error) {
        console.error("Error fetching submission details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionDetails();
  }, [bookId, questionId, id]);

  // Disable back navigation
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handlePopState = (event) => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (loading) {
    return <p>제출한 내용을 불러오는 중입니다...</p>;
  }

  return (
    <div className="w-full mb-16">
      {submissionDetails ? (
        <div>
          <div className="text-2xl text-blue-600 font-bold mb-6 text-left">
            질문
          </div>
          <div className="text-xl mb-14">{submissionDetails.question}</div>

          <hr className="my-4 mb-14" />

          <div className="text-2xl text-blue-600 font-bold mb-6 text-left">
            모범 답안
          </div>
          <div className="text-xl mb-14">{submissionDetails.modelAnswer}</div>

          <hr className="my-4 mb-14" />

          <div className="text-2xl text-blue-600 font-bold mb-6 text-left">
            제출한 답안
          </div>
          <div className="text-xl mb-16">{submissionDetails.userAnswer}</div>
        </div>
      ) : (
        <p>제출한 내용을 찾을 수 없습니다.</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={openModal}
          className="w-full border bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md"
        >
          문제 평가하기
        </button>
      </div>

      {/* Modal을 사용하여 EvaluationModal을 렌더링 */}
      <Modal>
        <EvaluationModal
          bookId={bookId}
          questionId={questionId}
          answerId={id}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default SubmitPage;

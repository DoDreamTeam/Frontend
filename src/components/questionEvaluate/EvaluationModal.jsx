import React from "react";
import api from "../../api/api";
import { evaluationStyles } from "../../utils/evaluationUtils";
import { useNavigate } from "react-router-dom";

const EvaluationModal = ({ bookId, questionId, answerId, onClose }) => {
  const navigate = useNavigate();

  const handleEvaluation = async (evaluation) => {
    try {
      await api.patch(
        `/books/${bookId}/questions/${questionId}/answer/${answerId}`,
        {
          evaluation,
        }
      );
      onClose(); // 모달 닫기
      navigate(
        `/book/${bookId}/questions/${questionId}/submit/${answerId}/add`
      );
    } catch (error) {
      console.error("평가 업데이트 중 오류 발생:", error);
      alert("평가 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">문제 평가하기</div>

      <hr className="my-4 mb-8" />

      <div className="mb-4 text-lg">문제의 난이도가 어땠나요?</div>
      <div className="mb-6">이해완료 / 애매해요 / 모르겠어요</div>
      <div className="mb-14">
        ‘애매해요’, ‘모르겠어요’라고 평가한 문제들은
        <br />
        [마이페이지 - 내가 푼 문제들]에서 다시 확인할 수 있어요!
      </div>

      <div className="flex justify-between mt-4">
        <button
          className={`${evaluationStyles.EVALUATION_DONE} flex-1 mx-2 flex flex-col items-center`}
          onClick={() => handleEvaluation("EVALUATION_DONE")}
        >
          <span className="text-2xl mb-2">🙂</span>
          <span className="text-l">이해완료</span>
        </button>
        <button
          className={`${evaluationStyles.EVALUATION_SOSO} flex-1 mx-2 flex flex-col items-center`}
          onClick={() => handleEvaluation("EVALUATION_SOSO")}
        >
          <span className="text-2xl mb-2">🤨</span>
          <span className="text-l">애매해요</span>
        </button>
        <button
          className={`${evaluationStyles.EVALUATION_UNKNOWN} flex-1 mx-2 flex flex-col items-center`}
          onClick={() => handleEvaluation("EVALUATION_UNKNOWN")}
        >
          <span className="text-2xl mb-2">😵‍💫</span>
          <span className="text-l">모르겠어요</span>
        </button>
      </div>
    </div>
  );
};

export default EvaluationModal;

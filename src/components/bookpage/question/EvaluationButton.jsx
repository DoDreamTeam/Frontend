import React from "react";
import {
  evaluationMessages,
  evaluationStyles,
} from "../../../utils/evaluationUtils";

const EvaluationButton = ({ evaluation, onClick }) => {
  if (!evaluation) {
    return (
      <button className={evaluationStyles["학습하기"]} onClick={onClick}>
        학습하기
      </button>
    );
  }

  const buttonLabel = evaluationMessages[evaluation.evaluationType];
  const buttonStyle = evaluationStyles[evaluation.evaluationType];

  return (
    <button className={buttonStyle} onClick={onClick}>
      {buttonLabel}
    </button>
  );
};

export default EvaluationButton;

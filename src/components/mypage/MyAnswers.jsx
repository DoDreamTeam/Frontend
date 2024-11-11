import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaCaretDown } from "react-icons/fa";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import {
  evaluationStyles,
  evaluationMessages,
} from "../../utils/evaluationUtils";
import { formatDate } from "../../utils/formatDateUtils";
import { FaRegFaceSadCry } from "react-icons/fa6";

const EVALUATION_OPTIONS = {
  전체: "전체",
  EVALUATION_SOSO: "애매해요",
  EVALUATION_UNKNOWN: "모르겠어요",
};

const MyAnswer = () => {
  const [answers, setAnswers] = useState([]);
  const [currentAnswerPage, setCurrentAnswerPage] = useState(0);
  const [totalPagesAnswer, setTotalPagesAnswer] = useState(0);
  const [totalAnswersCount, setTotalAnswersCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState(
    EVALUATION_OPTIONS.전체
  );
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnswers();
  }, [currentAnswerPage, currentEvaluation]);

  const fetchAnswers = async () => {
    try {
      let response;
      if (currentEvaluation === EVALUATION_OPTIONS.전체) {
        response = await api.get("mypage/book/answer", {
          params: { page: currentAnswerPage },
        });
      } else {
        const evaluationParam =
          currentEvaluation === EVALUATION_OPTIONS.EVALUATION_SOSO
            ? "EVALUATION_SOSO"
            : "EVALUATION_UNKNOWN";
        response = await api.get(`mypage/book/answer/evaluation`, {
          params: { evaluation: evaluationParam, page: currentAnswerPage },
        });
      }

      if (response && response.data && response.data.content) {
        setAnswers(response.data.content);
        setTotalPagesAnswer(response.data.page.totalPages);
        setTotalAnswersCount(response.data.page.totalElements);
        setItemsPerPage(response.data.page.size);
      } else {
        setAnswers([]);
        setTotalAnswersCount(0);
        setItemsPerPage(0);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("해당 응답이 없습니다.");
        setAnswers([]);
        setTotalAnswersCount(0);
        setItemsPerPage(0);
      } else {
        console.error("Error fetching answers:", error);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentAnswerPage(pageNumber);
  };

  const handleMenuClick = (evaluation) => {
    setCurrentEvaluation(evaluation);
    setCurrentAnswerPage(0);
    setMenuOpen(false);
  };

  const handleAnswerClick = (questionId, bookId, id) => {
    navigate(`/book/${bookId}/questions/${questionId}/submit/${id}`);
  };

  const handleOutsideClick = (event) => {
    if (
      menuOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-8">
        <div className="text-xl font-semibold">
          내가 푼 문제들 [{totalAnswersCount}]
        </div>
        <div className="relative flex items-center" ref={menuRef}>
          <div
            className="flex items-center border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{ minWidth: "150px" }}
          >
            <span className="mr-2">{currentEvaluation}</span>
            <FaCaretDown />
          </div>
          {menuOpen && (
            <div className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-1">
                {Object.values(EVALUATION_OPTIONS).map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {answers.length === 0 ? (
        <div className="text-gray-500 text-center flex items-center justify-center flex-col">
          <div className="flex items-center">
            내가 푼 문제가 없습니다.
            <FaRegFaceSadCry className="ml-2 text-xl" />
          </div>
          <Link
            to="/book"
            className="mt-4 text-gray-500 font-semibold underline hover:text-gray-500 text-base
         hover:text-[17px] transition-all duration-300 ease-in-out"
          >
            문제풀러 가기
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {answers.map((answer, index) => (
              <div
                key={answer.id}
                className="flex justify-between p-2 border-t border-gray-300 pt-5"
              >
                <div className="mr-8 ml-7">
                  {currentAnswerPage * itemsPerPage + index + 1}
                </div>
                <span
                  className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap hover:underline cursor-pointer"
                  onClick={() =>
                    handleAnswerClick(
                      answer.questionId,
                      answer.bookId,
                      answer.id
                    )
                  }
                  style={{ display: "inline-block" }}
                >
                  {answer.title}
                </span>
                <div className="mr-8 w-32 flex items-center justify-center text-gray-500 text-sm">
                  {formatDate(answer.createdAt)}
                </div>
                <div className="mr-8 w-32 text-center">
                  <span
                    className={`${
                      evaluationStyles[answer.evaluation]
                    } inline-block`}
                    style={{
                      width: "80px",
                      padding: "4px",
                      textAlign: "center",
                    }}
                  >
                    {evaluationMessages[answer.evaluation]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 mb-10">
            <button
              onClick={() => handlePageChange(currentAnswerPage - 1)}
              disabled={currentAnswerPage === 0}
            >
              <FaChevronLeft className="text-gray-500 text-sm" />
            </button>
            {Array.from({ length: totalPagesAnswer }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`mx-1 ${
                  index === currentAnswerPage
                    ? "font-bold text-blue-400"
                    : "text-gray-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentAnswerPage + 1)}
              disabled={currentAnswerPage === totalPagesAnswer - 1}
            >
              <FaChevronRight className="text-gray-500 text-sm" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyAnswer;

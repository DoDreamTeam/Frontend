import React, { useEffect, useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaCaretDown } from 'react-icons/fa';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const EVALUATION_OPTIONS = {
  전체: '전체',
  EVALUATION_SOSO: '애매해요',
  EVALUATION_UNKNOWN: '모르겠어요',
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
        response = await api.get('mypage/book/answer', {
          params: { page: currentAnswerPage },
        });
      } else {
        const evaluationParam =
          currentEvaluation === EVALUATION_OPTIONS.EVALUATION_SOSO
            ? 'EVALUATION_SOSO'
            : 'EVALUATION_UNKNOWN';
        response = await api.get(`mypage/book/answer/evaluation`, {
          params: { evaluation: evaluationParam, page: currentAnswerPage },
        });
      }
      setAnswers(response.data.content);
      setTotalPagesAnswer(response.data.page.totalPages);
      setTotalAnswersCount(response.data.page.totalElements);
      setItemsPerPage(response.data.page.size);
    } catch (error) {
      console.error('Error fetching answers:', error);
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

  const handleAnswerClick = (questionId, bookId) => {
    navigate(`/book/${bookId}/questions/${questionId}`);
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
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);

  const getEvaluationLabel = (evaluation) => {
    switch (evaluation) {
      case 'EVALUATION_DONE':
        return '이해완료';
      case 'EVALUATION_SOSO':
        return '애매해요';
      case 'EVALUATION_UNKNOWN':
        return '모르겠어요';
      default:
        return evaluation;
    }
  };

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
            style={{ minWidth: '150px' }}
          >
            <span className="mr-2">{currentEvaluation}</span>
            <FaCaretDown />
          </div>
          {menuOpen && (
            <div className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMenuClick(EVALUATION_OPTIONS.전체)}
                >
                  {EVALUATION_OPTIONS.전체}
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleMenuClick(EVALUATION_OPTIONS.EVALUATION_SOSO)
                  }
                >
                  {EVALUATION_OPTIONS.EVALUATION_SOSO}
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleMenuClick(EVALUATION_OPTIONS.EVALUATION_UNKNOWN)
                  }
                >
                  {EVALUATION_OPTIONS.EVALUATION_UNKNOWN}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

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
              className="flex-grow mx-12 cursor-pointer hover:underline"
              onClick={() =>
                handleAnswerClick(answer.questionId, answer.bookId)
              }
              style={{ display: 'inline-block' }}
            >
              {answer.title}
            </span>
            <div className="mr-8 w-32">
              {new Date(answer.createdAt).toLocaleDateString()}
            </div>
            <div className="mr-8 w-32 text-right">
              {getEvaluationLabel(answer.evaluation)}
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
                ? 'font-bold text-blue-400'
                : 'text-gray-500'
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
    </div>
  );
};

export default MyAnswer;

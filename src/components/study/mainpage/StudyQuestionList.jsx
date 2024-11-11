import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDateUtils';
import { FaRegFaceSadCry } from 'react-icons/fa6';
import {
  evaluationStyles,
  evaluationMessages,
} from '../../../utils/evaluationUtils';
import StudyQuestionSearch from './StudyQuestionSearch';

const VIEW_OPTIONS = {
  ALL: '최신순',
  MY_ANSWERS: '내가 푼 문제',
  EXCLUDE_MY_ANSWERS: '내 답안 제외',
};

const StudyQuestionList = ({ studyId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedView, setSelectedView] = useState(VIEW_OPTIONS.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      let response;
      const params = {
        page: currentPage,
        size: itemsPerPage,
        search: searchQuery,
      };

      if (selectedView === VIEW_OPTIONS.ALL) {
        response = await api.get(`/study/${studyId}/studyroom`, { params });
      } else if (selectedView === VIEW_OPTIONS.MY_ANSWERS) {
        response = await api.get(`/study/${studyId}/studyroom/my`, { params });
      } else if (selectedView === VIEW_OPTIONS.EXCLUDE_MY_ANSWERS) {
        response = await api.get(`/study/${studyId}/studyroom/other`, {
          params,
        });
      }

      if (response && response.data.content) {
        setQuestions(response.data.content);
        setTotalPages(response.data.page.totalPages);
        setItemsPerPage(response.data.page.size);
      } else {
        setQuestions([]);
        setTotalPages(0);
        setItemsPerPage(0);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewChange = (viewOption) => {
    setSelectedView(viewOption);
    setCurrentPage(0);
  };

  const handleQuestionClick = (id) => {
    navigate(`/study/${studyId}/${id}`);
  };

  const handleSearchResults = (results) => {
    setQuestions(results);
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchQuestions();
  }, [currentPage, selectedView, searchQuery]); // `currentPage`, `selectedView`, `searchQuery` 변경 시마다 호출

  return (
    <div>
      <div className="flex justify-between items-center mb-8 mt-8">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded ${
              selectedView === VIEW_OPTIONS.ALL
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => handleViewChange(VIEW_OPTIONS.ALL)}
          >
            {VIEW_OPTIONS.ALL}
          </button>
          <button
            className={`py-2 px-4 rounded ${
              selectedView === VIEW_OPTIONS.MY_ANSWERS
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => handleViewChange(VIEW_OPTIONS.MY_ANSWERS)}
          >
            {VIEW_OPTIONS.MY_ANSWERS}
          </button>
          <button
            className={`py-2 px-4 rounded ${
              selectedView === VIEW_OPTIONS.EXCLUDE_MY_ANSWERS
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => handleViewChange(VIEW_OPTIONS.EXCLUDE_MY_ANSWERS)}
          >
            {VIEW_OPTIONS.EXCLUDE_MY_ANSWERS}
          </button>
        </div>

        <div className="flex items-center">
          <StudyQuestionSearch
            studyId={studyId}
            selectedView={selectedView}
            setSearchResults={handleSearchResults}
          />
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-gray-500 text-center flex items-center justify-center flex-col mb-10">
          <div className="flex items-center">
            문제 목록이 없습니다.
            <FaRegFaceSadCry className="ml-2 text-xl" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="flex justify-between p-2 border-b border-gray-300 pt-5"
              >
                <div className="mr-8 ml-7">
                  {currentPage * itemsPerPage + index + 1}
                </div>
                <span
                  className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:underline"
                  onClick={() => handleQuestionClick(question.id)}
                >
                  {question.question}
                </span>
                <div className="ml-5 w-30 flex items-center justify-center mr-3">
                  <img
                    src={question.profileImage}
                    className="w-6 h-6 rounded-full"
                  />
                </div>
                <div
                  className="mr-8 w-32 flex items-center justify-center text-sm cursor-pointer"
                  onClick={() => navigate(`/mypage/${question.userId}`)}
                >
                  <div>{question.username}</div>
                </div>
                <div className="mr-8 w-32 flex items-center justify-center text-gray-500 text-sm">
                  {formatDate(question.createdAt)}
                </div>
                <div className="mr-8 w-32 text-center">
                  <span
                    className={`${evaluationStyles[question.evaluation]}`}
                    style={{
                      width: '80px',
                      padding: '4px',
                      textAlign: 'center',
                    }}
                  >
                    {evaluationMessages[question.evaluation]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 mb-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0 || totalPages === 0}
            >
              <FaChevronLeft className="text-gray-500 text-sm" />
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`mx-1 ${
                  index === currentPage
                    ? 'font-bold text-blue-400'
                    : 'text-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1 || totalPages === 0}
            >
              <FaChevronRight className="text-gray-500 text-sm" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudyQuestionList;

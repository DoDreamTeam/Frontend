import React, { useState } from "react";
import api from "../../api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import usePagination from "../../hooks/usePagination";
import {
  evaluationStyles,
  evaluationMessages,
} from "../../utils/evaluationUtils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { formatDate } from "../../utils/formatDateUtils";
import { useNavigate } from "react-router-dom";
import SearchInput from "../ui/SearchInput";
import { useUser } from "../../context/UserProvider";
import { MdEdit, MdDelete } from "react-icons/md";
import useModal from "../../hooks/useModal";

const QuestionList = ({ bookId, bookOwnerName }) => {
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openModal, closeModal, Modal } = useModal();

  const { currentPage, setPage } = usePagination(0);
  const questionsPerPage = 5;

  const [excludeAnswered, setExcludeAnswered] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // 선택된 질문 ID

  const handleSearchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to the first page on search
    refetch(); // Refetch data based on new keyword
  };

  const getQuestionList = async (page) => {
    const response = await api.get(
      keyword
        ? `/books/${bookId}/questions/search?keyword=${keyword}&page=${page}&size=${questionsPerPage}`
        : `/books/${bookId}/questions?page=${page}&size=${questionsPerPage}&type=${excludeAnswered}`
    );
    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["questions", bookId, currentPage, excludeAnswered],
    queryFn: () => getQuestionList(currentPage),
    enabled: !!bookId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const questions = data.content;

  const renderEvaluationButton = (evaluation) => {
    if (!evaluation) {
      return <button className={evaluationStyles["학습하기"]}>학습하기</button>;
    }

    const buttonLabel = evaluationMessages[evaluation.evaluationType];
    const buttonStyle = evaluationStyles[evaluation.evaluationType];

    return <button className={buttonStyle}>{buttonLabel}</button>;
  };

  // 문제 삭제
  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/books/${bookId}/questions/${selectedQuestionId}`
      );
      if (response.status === 204) {
        // 질문 삭제 후 페이지 새로고침
        window.location.reload();
      }
    } catch (error) {
      console.error("Delete question ERROR: ", error);
    }
  };

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
        <div className="w-full">
          <button
            onClick={() => setExcludeAnswered(false)}
            className={`py-2 px-4 mx-1 ${
              !excludeAnswered ? "font-bold" : "text-gray-400"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setExcludeAnswered(true)}
            className={`py-2 px-4 mx-1 ${
              excludeAnswered ? "font-bold" : "text-gray-400"
            }`}
          >
            내가 푼 문제 제외
          </button>
        </div>
        <SearchInput
          value={keyword}
          onChange={handleSearchKeyword}
          onSearch={handleSearch}
          placeholder="제목과 내용을 검색할 수 있습니다."
        />
      </div>

      <div className="h-60">
        {questions.length > 0 ? (
          questions.map((question, index) => {
            const isUserQuestion =
              userInfo && userInfo.userId === question.evaluation?.userId;

            return (
              <div
                key={question.id}
                className="flex items-center mb-2 border-b border-gray-200 pb-2"
              >
                <div className="w-12 text-center mr-2">
                  {currentPage * questionsPerPage + index + 1}
                </div>
                <div
                  className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap hover:underline cursor-pointer"
                  onClick={() =>
                    navigate(`/book/${bookId}/questions/${question.id}`)
                  }
                >
                  {question.question}
                </div>
                <div>
                  {userInfo?.userName === bookOwnerName && (
                    <div className="flex justify-center mt-2">
                      <button className="mx-1">
                        <MdEdit
                          className="hover:text-blue-400"
                          onClick={() =>
                            navigate(
                              `/book/${bookId}/questions/${question.id}/edit`
                            )
                          }
                        />
                      </button>
                      <button className="mx-1">
                        <MdDelete
                          className="hover:text-blue-400"
                          onClick={() => {
                            setSelectedQuestionId(question.id); // 선택된 질문 ID 설정
                            openModal();
                          }}
                        />
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
                  <div
                    className="flex justify-center"
                    style={{ minWidth: "80px" }}
                  >
                    {renderEvaluationButton(
                      isUserQuestion ? question.evaluation : null
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>질문이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={() => setPage(currentPage - 1, data.page.totalPages)}
          disabled={currentPage === 0}
          className={`p-2 ${
            currentPage === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <FaChevronLeft className="text-gray-600 text-sm" />
        </button>

        {Array.from({ length: data.page.totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index, data.page.totalPages)}
            className={`mx-1 p-2 ${
              index === currentPage
                ? "font-bold text-blue-400"
                : "text-gray-500 hover:text-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(currentPage + 1, data.page.totalPages)}
          disabled={currentPage === data.page.totalPages - 1}
          className={`p-2 ${
            currentPage === data.page.totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <FaChevronRight className="text-gray-600 text-sm" />
        </button>
      </div>

      {/* 삭제 모달 */}
      <Modal style="w-120 text-center">
        <div className="text-2xl font-semibold m-6">
          정말 문제를 삭제하시겠습니까?
        </div>
        <div className="flex justify-around mt-4 w-full">
          <button
            className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionList;

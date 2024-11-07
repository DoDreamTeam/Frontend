import React, { useState } from "react";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import usePagination from "../../hooks/usePagination";
import SearchInput from "../ui/SearchInput";
import useModal from "../../hooks/useModal";
import Pagination from "../ui/Pagination";
import QuestionItem from "./question/QuestionItem";
import LoginRequestModal from "../ui/LoginRequestModal";
import DeleteConfirmationModal from "../ui/DeleteConfirmModal";
import DeleteSuccessModal from "../ui/DeleteSuccessModal";

const QuestionList = ({ bookId, bookOwnerName }) => {
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const { openModal, closeModal, Modal } = useModal();

  const { currentPage, setPage } = usePagination(0);
  const questionsPerPage = 5;

  const [excludeAnswered, setExcludeAnswered] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSearchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    setPage(0);
    refetch();
  };

  const getQuestionList = async (page) => {
    const url =
      excludeAnswered && userInfo
        ? `/books/${bookId}/questions/my?page=${page}&size=${questionsPerPage}`
        : `/books/${bookId}/questions?page=${page}&size=${questionsPerPage}`;

    const searchUrl = keyword
      ? `/books/${bookId}/questions/search?keyword=${keyword}`
      : url;

    const response = await api.get(searchUrl);
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

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/books/${bookId}/questions/${selectedQuestionId}`
      );
      if (response.status === 204) {
        setIsDeleteSuccess(true);
        openModal();
      }
    } catch (error) {
      console.error("Delete question ERROR: ", error);
    }
  };

  const handleSuccessModalClose = () => {
    closeModal();
    setSelectedQuestionId(null);
    window.location.reload();
  };

  const handleExcludeAnsweredClick = () => {
    if (userInfo) {
      setExcludeAnswered(true);
      refetch();
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
        <div className="w-full">
          <button
            onClick={() => {
              setExcludeAnswered(false);
              refetch();
            }}
            className={`py-2 px-4 mx-1 ${
              !excludeAnswered ? "font-bold" : "text-gray-400"
            }`}
          >
            최신순
          </button>
          <button
            onClick={handleExcludeAnsweredClick}
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
            return (
              <QuestionItem
                key={question.id}
                question={question}
                index={index}
                currentPage={currentPage}
                userInfo={userInfo}
                bookId={bookId}
                bookOwnerName={bookOwnerName}
                onEditClick={(id) =>
                  navigate(`/book/${bookId}/questions/${id}/edit`)
                }
                onDeleteClick={(id) => {
                  setSelectedQuestionId(id);
                  openModal();
                }}
              />
            );
          })
        ) : (
          <div className="w-full mb-16 text-center">
            {keyword ? (
              <div className="text-xl font-medium text-center my-4">
                검색어와 일치하는 문제가 없습니다.
              </div>
            ) : (
              <div className="text-xl font-medium text-center my-4">
                문제가 존재하지 않습니다. <br /> 문제를 추가해주세요!
              </div>
            )}
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {questions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.page.totalPages}
          setPage={setPage}
        />
      )}

      {/* 모달 */}
      {showLoginModal && (
        <Modal style="w-120 text-center">
          <LoginRequestModal closeModal={closeModal} />
        </Modal>
      )}

      {selectedQuestionId && (
        <Modal style="w-120 text-center">
          <DeleteConfirmationModal
            handleDelete={handleDelete}
            closeModal={closeModal}
          />
        </Modal>
      )}

      {isDeleteSuccess && (
        <Modal style="w-120 text-center">
          <DeleteSuccessModal
            handleSuccessModalClose={handleSuccessModalClose}
          />
        </Modal>
      )}
    </div>
  );
};

export default QuestionList;

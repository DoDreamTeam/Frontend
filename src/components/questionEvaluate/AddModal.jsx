import React, { useState } from "react";
import { useUser } from "../../context/UserProvider";
import useModal from "../../hooks/useModal";
import api from "../../api/api";
import usePagination from "../../hooks/usePagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryNames, categoryStyles } from "../../utils/categoryUtils";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Pagination from "../ui/Pagination";

const AddModal = () => {
  const { id, questionId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const { closeModal } = useModal();
  const { currentPage, setPage } = usePagination(0);
  const itemsPerPage = 4;
  const [selectedBooks, setSelectedBooks] = useState([]);

  // userId를 통해 내가 만든 문제집 리스트 가져오기
  const getMyBooks = async (page) => {
    const response = await api.get(
      `/mypage/books/${userInfo.userId}?page=${page}&size=${itemsPerPage}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => getMyBooks(currentPage),
  });

  const books = data?.content || [];
  const totalPages = data?.page?.totalPages || 1; // 기본 페이지 1로 설정

  // 내 문제집에 추가하기
  const mutation = useMutation({
    mutationFn: async (targetBooks) => {
      try {
        const response = await api.post(
          `/books/${id}/questions/${questionId}/books`,
          { bookIds: targetBooks }
        );
        return response.data;
      } catch (error) {
        console.error("문제집에 추가 ERROR: ", error.response || error);
        // 서버에서의 오류 상세 메시지를 출력
        throw error;
      }
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (err) => {
      console.error("문제집에 추가 실패: ", err);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // 문제집 선택 toggle
  const toggleBookSelection = (bookId) => {
    setSelectedBooks(
      (prevSelected) =>
        prevSelected.includes(bookId)
          ? prevSelected.filter((id) => id !== bookId) // 이미 선택한 문제집을 제거
          : [...prevSelected, bookId] // 새로 선택한 문제집을 추가
    );
  };

  const handleSubmit = () => {
    if (selectedBooks.length === 0) {
      alert("선택된 문제집이 없습니다");
      return;
    }
    mutation.mutate(selectedBooks);
  };

  return (
    <div className="w-[500px]">
      {/* 나의 문제집 리스트 불러오기 */}
      <div>
        {books.length > 0 ? (
          <>
            <div className="text-3xl text-blue-600 font-bold mb-6 text-left">
              내 문제집에 추가하기
            </div>
            <div className="text-sm mb-16 text-gray-500">
              내가 만든 문제집에 이 문제를 추가할 수 있습니다.
            </div>
            {/* 문제집 선택해서 추가하기 */}
            <div className="text-lg font-semibold mb-6 p-3">
              내가 만든 문제집 리스트
            </div>

            {/* 문제집 목록 출력 */}
            {books.map((book, index) => (
              <button
                key={book.id}
                className="flex items-center mb-2 border-b border-gray-200 pb-2 space-x-4 w-full hover:bg-gray-100 active:bg-gray-200"
                onClick={() => toggleBookSelection(book.id)}
                style={{
                  backgroundColor: selectedBooks.includes(book.id)
                    ? "#e0f7fa" // 선택된 스터디에 색을 추가
                    : "transparent",
                }}
              >
                {/* 번호 */}
                <div className="w-12 text-left">
                  {currentPage * itemsPerPage + index + 1}
                </div>

                {/* 문제집 제목 */}
                <div className="flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                  {book.title}
                </div>

                {/* 카테고리 */}
                <div
                  className={`text-sm font-semibold p-2 rounded-lg text-center ${
                    categoryStyles[book.category]
                  }`}
                >
                  {categoryNames[book.category]}
                </div>
              </button>
            ))}
          </>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <div className="text-3xl text-blue-600 font-bold mb-6 text-left">
              내가 만든 문제집이 없습니다!
            </div>
            <p className="text-gray-500 text-sm">
              문제집을 만드실 경우 아래 버튼을 클릭해주세요.
            </p>
            <div className="flex justify-center mt-16 mb-6 w-full">
              <button
                onClick={() => navigate("/book/create")}
                className="w-full text-white bg-blue-600 px-4 py-2 rounded-md mr-2 hover:bg-blue-400"
              >
                문제집 만들기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 문제집이 존재하는 경우에만 나오도록 */}
      {books.length > 0 && (
        <>
          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={data.page.totalPages}
            setPage={setPage}
          />

          {/* 추가하기 */}
          <button
            onClick={handleSubmit}
            className={`w-full text-white bg-blue-600 px-4 py-2 rounded-md mb-5`}
          >
            추가하기
          </button>
        </>
      )}
    </div>
  );
};

export default AddModal;

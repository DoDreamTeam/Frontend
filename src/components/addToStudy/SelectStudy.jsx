import React, { useState } from "react";
import api from "../../api/api";
import usePagination from "../../hooks/usePagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryNames, categoryStyles } from "../../utils/categoryUtils";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../ui/Pagination";
import useModal from "../../hooks/useModal";

const SelectStudy = () => {
  const navigate = useNavigate();
  const { bookId, questionId } = useParams();
  const { currentPage, setPage } = usePagination(0);
  const itemsPerPage = 5;
  const [selectedStudies, setSelectedStudies] = useState([]);
  const { openModal, closeModal, Modal } = useModal();

  // 내가 참여중인 스터디 리스트 가져오기
  const getMyStudies = async (page) => {
    const response = await api.get(
      `/study/my?page=${page}&size=${itemsPerPage}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["studies", currentPage],
    queryFn: () => getMyStudies(currentPage),
  });

  const studies = data?.content || [];
  const totalPages = data?.page?.totalPages || 1; // 기본 페이지 1로 설정

  const mutation = useMutation({
    mutationFn: async (studyIds) => {
      const response = await api.post(
        `/books/${bookId}/questions/${questionId}/studies`,
        { studyIds }
      );
      return response.data;
    },
    onSuccess: () => {
      openModal();
    },
    onError: (err) => {
      console.error("스터디에 추가 ERROR : ", err);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // 스터디 선택 toggle
  const toggleStudySelection = (studyId) => {
    setSelectedStudies((prevSelected) =>
      prevSelected.includes(studyId)
        ? prevSelected.filter((id) => id !== studyId)
        : [...prevSelected, studyId]
    );
  };

  const handleSubmit = () => {
    if (selectedStudies.length === 0) {
      alert("선택된 스터디가 없습니다.");
      return;
    }
    mutation.mutate(selectedStudies);
  };

  const handleCloseModal = () => {
    closeModal();
    // 다시 해당 문제집 메인 페이지로 이동
    navigate(`/book/${bookId}`);
  };

  return (
    <div>
      <div>
        {studies.length > 0 ? (
          <>
            <div className="text-3xl text-blue-600 font-bold mb-6 text-left">
              내가 참여하는 스터디에 추가하기
            </div>
            <div className="text-sm mb-16 text-gray-500">
              내가 참여 중인 스터디에 추가하여 스터디원들과 함께 토론해보세요!
            </div>
            {/* 스터디 선택해서 추가하기 */}
            <div className="text-lg font-semibold mb-6 p-3">
              내가 참여하는 스터디 리스트
            </div>

            {/* 스터디 목록 출력 */}
            {studies.map((study, index) => (
              <button
                key={study.id}
                className="flex items-center mb-2 border-b border-gray-200 pb-2 space-x-4 w-full hover:bg-gray-100 active:bg-gray-200"
                onClick={() => toggleStudySelection(study.id)}
                style={{
                  backgroundColor: selectedStudies.includes(study.id)
                    ? "#e0f7fa" // 선택된 스터디에 색을 추가
                    : "transparent",
                }}
              >
                {/* 번호 */}
                <div className="w-12 text-left">
                  {currentPage * itemsPerPage + index + 1}
                </div>

                {/* 스터디 제목 */}
                <div className="flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                  {study.title}
                </div>

                {/* 카테고리 */}
                <div
                  className={`text-sm font-semibold p-2 rounded-lg text-center ${
                    categoryStyles[study.category]
                  }`}
                >
                  {categoryNames[study.category]}
                </div>
              </button>
            ))}
          </>
        ) : (
          <div className="h-[600px] w-full flex flex-col items-center justify-center">
            <div className="text-3xl text-blue-600 font-bold mb-6 text-left">
              참여 중인 스터디가 없습니다!
            </div>
            <p className="text-gray-500 text-sm">
              스터디에 참여하면 스터디원들과 내가 푼 문제를 토론할 수 있습니다.
            </p>
            <div className="flex justify-center mt-16 mb-16 w-full">
              <button
                onClick={() => navigate("/study")}
                className="w-full text-white bg-blue-600 px-4 py-2 rounded-md mr-2 hover:bg-blue-400"
              >
                스터디 목록 보러가기
              </button>
              <button
                type="button"
                onClick={() => navigate(`/book/${bookId}`)}
                className="w-full border bg-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md"
              >
                문제집으로 돌아가기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 페이지네이션, 추가하기 버튼, 취소 버튼이 스터디가 있을 때만 보이도록 */}
      {studies.length > 0 && (
        <>
          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={data.page.totalPages}
            setPage={setPage}
          />

          {/* 스터디에 추가하기 */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className={`w-full text-white bg-blue-600 px-4 py-2 rounded-md mr-2`}
            >
              추가하기
            </button>
            <button
              type="button"
              onClick={() => navigate(`/book/${bookId}`)}
              className="w-full border hover:bg-gray-100 px-4 py-2 rounded-md"
            >
              취소
            </button>
          </div>
        </>
      )}

      {/* 추가 시 Modal */}
      <Modal style="w-120 text-center">
        <div className="text-2xl font-semibold m-6">
          스터디에 추가되었습니다.
          <div className="flex justify-around mt-4 w-full">
            <button
              className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
              onClick={handleCloseModal}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelectStudy;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StudyInfoEdit from "../components/study/adminpage/StudyInfoEdit";
import StudyApplyMember from "../components/study/adminpage/StudyApplyMember";
import StudyMember from "../components/study/adminpage/StudyMember";
import useModal from "../hooks/useModal";
import StudyNoticeEdit from "../components/study/adminpage/StudyNoticeEdit";
import api from "../api/api";

const StudyAdminPage = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]); // StudyMember에 전달될 멤버 리스트
  const { openModal, closeModal, Modal: ConfirmModal } = useModal();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    closeModal();

    const fetchStudyInfo = async () => {
      const response = await api.get(`/study/participate/${studyId}`);
      if (response.data === "ROLE_LEADER") {
        setIsAdmin(true);
      }
    };
    fetchStudyInfo();

    if (!isAdmin) {
      openModal();
    }
  }, [isAdmin]);

  const close = () => {
    closeModal();
    navigate(`/study/${studyId}`);
  };

  // 멤버 리스트를 업데이트하는 함수
  const updateMembers = (newMembers) => {
    setMembers(newMembers);
  };

  // 스터디 삭제 처리
  const handleDeleteStudy = async () => {
    try {
      const response = await api.delete(`/study/${studyId}`);
      if (response.status === 204) {
        alert("스터디가 삭제되었습니다.");
        closeModal();
        navigate("/study");
      } else {
        alert("스터디 삭제에 실패했습니다. 다시 시도해주세요.");
        closeModal();
      }
    } catch (error) {
      alert("스터디 삭제에 실패했습니다. 다시 시도해주세요.");
      closeModal();
    }
  };

  const openDeleteModal = () => {
    openModal();
  };

  return (
    <>
      {isAdmin ? (
        <div className="w-full max-w-screen-lg mb-6">
          <StudyInfoEdit studyId={studyId} />
          <StudyNoticeEdit studyId={studyId} />

          {/* 승인 대기 멤버 목록 */}
          <StudyApplyMember studyId={studyId} updateMembers={updateMembers} />

          {/* 승인된 멤버 목록 */}
          <StudyMember studyId={studyId} members={members} />

          <div className="flex justify-center mt-20">
            <button
              onClick={openDeleteModal}
              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              스터디 삭제
            </button>
          </div>

          <ConfirmModal>
            <div className="text-2xl font-semibold m-6">
              정말 스터디를 삭제하시겠습니까?
            </div>
            <div className="flex justify-around mt-4 w-full">
              <button
                onClick={handleDeleteStudy}
                className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
              >
                삭제
              </button>
              <button
                onClick={closeModal}
                className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
              >
                취소
              </button>
            </div>
          </ConfirmModal>
        </div>
      ) : (
        <ConfirmModal>
          <div className="text-center p-4">
            <h2 className="text-xl font-semibold">스터디 관리자가 아닙니다!</h2>
            <p className="mt-2">스터디 관리자만 접근 가능한 페이지입니다.</p>
            <button
              onClick={close}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              닫기
            </button>
          </div>
        </ConfirmModal>
      )}
    </>
  );
};

export default StudyAdminPage;

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import useModal from "../../hooks/useModal"; // 모달 훅 import

const ProtectedRoute = ({ element, isMemberOnly = false }) => {
  const { isAuthenticated } = useAuth();
  const { openModal, Modal, closeModal, isModalOpen } = useModal(); // useModal 사용
  const [redirect, setRedirect] = useState(false); // 리디렉션 상태 추가

  // 인증되지 않은 경우 로그인 안내 모달을 띄우기
  useEffect(() => {
    if (!isAuthenticated) {
      openModal(); // 인증되지 않으면 모달 띄우기
    }
  }, [isAuthenticated, openModal]);

  // 리디렉션 후, 스크롤을 복원
  useEffect(() => {
    if (redirect) {
      document.body.style.overflow = "unset";
    }
  }, [redirect]);

  const handleCloseModal = () => {
    closeModal();
    setRedirect(true);
  };

  // 리디렉션 상태가 true로 변경되면, 메인 페이지로 리디렉션
  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {element}
      {/* 로그인 안내 모달 */}
      {isModalOpen && (
        <Modal>
          <div className="text-center p-4">
            <h2 className="text-xl font-semibold">로그인해야 합니다</h2>
            <p className="mt-2">로그인이 필요합니다. 로그인 후 이용해주세요.</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProtectedRoute;

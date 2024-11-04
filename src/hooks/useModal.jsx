import React, { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal open
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // 스크롤 비활성화
  };

  // Modal close
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset"; // 스크롤 활성화
  };

  const Modal = ({ children, style }) => {
    return isModalOpen ? (
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md" />
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 bg-white shadow-md ${style} z-60`}
        >
          {/* <button
            className="absolute top-4 right-4 text-black bg-transparent text-xl mr-4"
            onClick={closeModal}
          >
            X
          </button> */}
          <div className="flex flex-col items-center">{children}</div>
        </div>
      </div>
    ) : null;
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    Modal,
  };
};

export default useModal;

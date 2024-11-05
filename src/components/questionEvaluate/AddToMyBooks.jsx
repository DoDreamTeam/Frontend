import React from "react";
import useModal from "../../hooks/useModal";
import AddModal from "./AddModal";

const AddToMyBooks = () => {
  const { openModal, closeModal, Modal } = useModal();

  return (
    <div>
      <button
        onClick={openModal}
        className="text-xs text-white bg-blue-400 px-4 py-2 mb-4 border rounded-lg hover:bg-blue-500"
      >
        내 문제집에 추가하기
      </button>

      <Modal>
        {/* 내 문제집에 추가하게 Modal */}
        <AddModal />

        {/* 취소하기 */}
        <button
          onClick={closeModal}
          className="w-full border bg-blue-300 hover:bg-gray-100 px-4 py-2 rounded-md"
        >
          문제로 돌아가기
        </button>
      </Modal>
    </div>
  );
};

export default AddToMyBooks;

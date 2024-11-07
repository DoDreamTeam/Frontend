import React from "react";

const DeleteConfirmationModal = ({ handleDelete, closeModal }) => {
  return (
    <div className="text-2xl font-semibold m-6">
      정말 문제를 삭제하시겠습니까?
      <div className="flex justify-around mt-4 w-full">
        <button
          className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
          onClick={handleDelete}
        >
          삭제
        </button>
        <button
          className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
          onClick={closeModal} // 모달 닫기
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

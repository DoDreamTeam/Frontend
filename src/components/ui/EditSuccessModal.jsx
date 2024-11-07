import React from "react";

const EditSuccessModal = ({ handleCloseModal }) => {
  return (
    <div className="text-2xl font-semibold m-6">
      성공적으로 수정되었습니다!
      <div className="flex justify-center mt-4 w-full">
        <button
          className="w-3/4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-4"
          onClick={handleCloseModal}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default EditSuccessModal;

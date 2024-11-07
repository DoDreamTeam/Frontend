import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRequestModal = ({ closeModal }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default LoginRequestModal;

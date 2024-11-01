import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default_profile.jpg";

const BookPageNoQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { title, username } = location.state || { title: "", username: "" };

  const handleMoveToAdd = () => {
    const id = location.pathname.split("/").pop();
    navigate(`/book/${id}/questions/add`);
  };
  return (
    <div className="w-full mb-16 text-center">
      <div className="text-3xl font-bold mb-6 text-left">{title}</div>
      <div className="flex items-center text-sm text-gray-500 mt-auto text-left">
        <img
          src={defaultProfile}
          alt="profile"
          className="h-6 w-6 rounded-full mr-2"
        />
        <span>{username}</span>
      </div>
      <div className="flex flex-col justify-center items-center h-80">
        <div className="text-xl font-medium text-center my-4">
          문제가 존재하지 않습니다.
          <br /> 문제를 추가해주세요!
        </div>
      </div>
      <button
        onClick={handleMoveToAdd}
        className="w-full bg-[#6686FA] text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4 mb-6"
      >
        문제집 추가하기
      </button>
    </div>
  );
};

export default BookPageNoQuestion;

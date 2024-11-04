import React from "react";
import { MdOutlinePeopleOutline } from "react-icons/md";
import defaultProfile from "../../assets/default_profile.jpg";
import { useNavigate } from "react-router-dom";
import { categoryNames, categoryStyles } from "../../utils/categoryUtils";
import { statusNames, statusStyles } from "../../utils/statusUtils";

const StudyCard = ({
  id,
  title,
  username,
  userCount,
  profileImage,
  description,
  category,
  status,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border border-black shadow-lg rounded-lg p-4 flex flex-col h-60 w-60 justify-between overflow-hidden">
      {/* 카테고리 및 참여 버튼 */}
      <div className="flex justify-between items-center mb-2">
        <div
          className={`text-sm font-semibold p-2 rounded ${categoryStyles[category]}`}
          style={{ borderRadius: "20px" }}
        >
          {categoryNames[category] || category}
        </div>
        <button
          className={`text-xs font-semibold ${statusStyles[status]}`}>
          {statusNames[status] || status}
        </button>
      </div>

      {/* 스터디 제목 */}
      <div
        className="text-lg mt-3 mb-1 flex-grow hover:underline hover:text-gray-400 cursor-pointer"
        onClick={() => navigate("/study/:studyId")}
      >
        {id}
        {title}
      </div>

      {/* 스터디 설명 */}
      <div className="text-sm text-gray-600 mb-3">{description}</div>

      {/* 스터디장 및 참여 인원 */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center text-sm text-gray-500">
          <img
            src={profileImage || defaultProfile}
            alt="Profile"
            className="h-6 w-6 rounded-full mr-2"
          />
          <span>{username}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MdOutlinePeopleOutline className="mr-1" />
          <span>{userCount}명</span>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;

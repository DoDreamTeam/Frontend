import React from "react";
import { MdOutlinePeopleOutline } from "react-icons/md";
import defaultProfile from "../../assets/default_profile.jpg";
import { useNavigate } from "react-router-dom";

const categoryStyles = {
  CS: "bg-blue-100 text-blue-800 border border-blue-300 text-xs",
  자격증: "bg-green-100 text-green-800 border border-green-300 text-xs",
  기타: "bg-yellow-100 text-yellow-800 border border-yellow-300 text-xs",
};

const statusStyles = {
  참여하기: "text-black hover:underline hover:text-gray-400",
  "승인 대기중": "text-yellow-600",
  참여중: "text-green-600 ",
};

const StudyCard = ({
  title,
  creator,
  participants,
  category,
  description,
  status,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border border-black shadow-lg rounded-lg p-4 flex flex-col h-64 w-64 justify-between overflow-hidden">
      {/* 카테고리 및 참여 버튼 */}
      <div className="flex justify-between items-center mb-2">
        <div
          className={`text-sm font-semibold p-2 rounded ${categoryStyles[category]}`}
          style={{ borderRadius: "20px" }}
        >
          {category}
        </div>
        <button className={`text-xs text-gray-500 ${statusStyles[status]}`}>
          {status}
        </button>
      </div>

      {/* 스터디 제목 */}
      <div
        className="text-lg mt-3 mb-1 flex-grow hover:underline hover:text-gray-400 cursor-pointer"
        onClick={() => navigate("/study/:studyId")}
      >
        {title}
      </div>

      {/* 스터디 설명 */}
      <div className="text-sm text-gray-600 mb-3">{description}</div>

      {/* 스터디장 및 참여 인원 */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center text-sm text-gray-500">
          <img
            src={defaultProfile}
            alt="Profile"
            className="h-6 w-6 rounded-full mr-2"
          />
          <span>{creator}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MdOutlinePeopleOutline className="mr-1" />
          <span>{participants}명</span>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;

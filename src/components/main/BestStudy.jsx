import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BestStudyList from "./BestStudyList";

const BestStudy = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">✏️ 이번주 인기 스터디</div>
        <button
          className="flex items-center text-xs text-gray-500 hover:underline"
          onClick={() => navigate("/study")}
        >
          더보기 <FaAngleRight className="ml-1 text-gray-500" />
        </button>
      </div>

      {/* 참여 인원이 많은 스터디 4개를 가져오기 */}
      <BestStudyList />
    </div>
  );
};

export default BestStudy;

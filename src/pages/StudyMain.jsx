import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyBanner from "../components/studymain/StudyBanner";
import StudySearch from "../components/studymain/StudySearch";
import StudyList from "../components/studymain/StudyList";
import { getCookie } from "../utils/cookieUtils";
import MyStudiesList from "../components/mypage/MyStudiesList";

const StudyMain = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState();

  const isLoggedIn = Boolean(getCookie("accessToken"));

  return (
    <div>
      {/* 스터디 설명 Banner */}
      {!isLoggedIn && <StudyBanner />}
      {isLoggedIn && <MyStudiesList />}


      {/* 검색창 및 버튼 */}
      <div className="w-full max-w-screen-lg flex justify-end mb-10">
        <div className="flex items-center w-full max-w-md space-x-2">
          {isLoggedIn && (
            <button
              className="bg-[#ACC7FF] text-white px-2 py-2 rounded-lg text-sm w-[50%] hover:bg-[#6686FA]"
              onClick={() => navigate("/study/create")}
            >
              스터디 만들기
            </button>
          )}
          <StudySearch setSearchResults={setSearchResults} />
        </div>
      </div>

      {/* 스터디 리스트 */}
      <StudyList searchResults={searchResults} />
    </div>
  );
};

export default StudyMain;

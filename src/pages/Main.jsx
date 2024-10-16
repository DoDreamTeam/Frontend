import React from "react";
import Banner from "../components/main/Banner";
import TotalSearch from "../components/main/TotalSearch";
import BestBook from "../components/main/BestBook";
import BestStudy from "../components/main/BestStudy";

const Main = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* 배너 */}
      <div className="w-full max-w-screen-lg mb-6">
        <Banner />
      </div>

      {/* 전체 검색창 */}
      <div className="w-full max-w-screen-lg flex justify-end mb-10">
        <div className="w-full max-w-md">
          <TotalSearch />
        </div>
      </div>

      {/* 인기 문제집 */}
      <div className="w-full max-w-screen-lg mb-10">
        <BestBook />
      </div>

      {/* 인기 스터디 */}
      <div className="w-full max-w-screen-lg mb-10">
        <BestStudy />
      </div>
    </div>
  );
};

export default Main;

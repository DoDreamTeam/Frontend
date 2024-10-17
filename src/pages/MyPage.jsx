import React from "react";
import MyActivityCalendar from "../components/mypage/MyActiivityCalendar";
import MyProfile from "../components/mypage/MyProfile";

const MyPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-screen-lg mb-6">
        <MyProfile />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-300 pt-5">
        <MyActivityCalendar />
      </div>
    </div>
  );
};

export default MyPage;

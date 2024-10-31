import React from "react";
import MyActivityCalendar from "../components/mypage/MyActiivityCalendar";
import MyProfile from "../components/mypage/MyProfile";
import { useUser } from "../context/UserProvider";
import { useParams } from "react-router-dom";

const MyPage = () => {
  const { userId } = useParams(); // URL 에서 userId 가져오기
  const { userInfo } = useUser();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-screen-lg mb-6">
        <MyProfile userInfo={userInfo} userId={userId} />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-300 pt-5">
        <MyActivityCalendar userInfo={userInfo} />
      </div>
    </div>
  );
};

export default MyPage;

import React from 'react';
import MyActivityCalendar from '../components/mypage/MyActiivityCalendar';
import MyProfile from '../components/mypage/MyProfile';
import { useParams } from 'react-router-dom';
import MypageBooks from '../components/mypage/MyPageBooks';

const MyPage = () => {
  const { userId } = useParams(); // URL 에서 userId 가져오기

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-screen-lg mb-6">
        <MyProfile userId={userId} />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <MypageBooks userId={userId} />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <MyActivityCalendar userId={userId} />
      </div>
    </div>
  );
};

export default MyPage;

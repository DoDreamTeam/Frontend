import React from 'react';
import MyProfileMe from '../components/mypage/MyProfileMe';
import MyAnswers from '../components/mypage/MyAnswers';

const MyQuestions = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-screen-lg mb-6">
        <MyProfileMe />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-300 pt-5">
        <MyAnswers />
      </div>
    </div>
  );
};

export default MyQuestions;

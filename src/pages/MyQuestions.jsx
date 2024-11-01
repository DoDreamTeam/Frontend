import React from 'react';
import MyProfileMe from '../components/mypage/MyProfileMe';
import MyAnswer from '../components/mypage/MyAnswers';

const MyQuestions = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-screen-lg mb-6">
        <MyProfileMe />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <MyAnswer />
      </div>
    </div>
  );
};

export default MyQuestions;

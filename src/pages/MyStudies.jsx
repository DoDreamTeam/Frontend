import React from 'react';
import MyProfileMe from '../components/mypage/MyProfileMe';
import MyStudyCommentLike from '../components/mypage/MyStudyCommentLike';
import MyStudiesList from '../components/mypage/MyStudiesList';

const MyStudies = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-screen-lg mb-6">
        <MyProfileMe />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-300 pt-5">
        <MyStudiesList />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-300 pt-5">
        <MyStudyCommentLike />
      </div>
    </div>
  );
};

export default MyStudies;

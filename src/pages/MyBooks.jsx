import React from 'react';
import MyProfileMe from '../components/mypage/MyProfileMe';
import MypageBookmarkBooks from '../components/mypage/MyPageBookMarkBooks';
import MypageBooksAll from '../components/mypage/MyPageBooksAll';
import MyBookCommentLike from '../components/mypage/MyBookCommentLike';

const MyBooks = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-screen-lg mb-6">
        <MyProfileMe />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <MypageBookmarkBooks />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <MypageBooksAll />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <MyBookCommentLike />
      </div>
    </div>
  );
};

export default MyBooks;

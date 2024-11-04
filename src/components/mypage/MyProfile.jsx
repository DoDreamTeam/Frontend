import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import GetUser from './getUser';
import { getUserId } from './GetUserId'; // getUserId 가져오기

const MyProfile = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData: userInfo, error } = GetUser(userId);
  const logInUserId = getUserId(); // 로그인한 사용자 ID 가져오기

  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.userName);
      setProfileImage(userInfo.profileImage);
    }
  }, [userInfo]);

  const handleMenuClick = (path, pageName) => {
    setMenuOpen(false);
    navigate(path);
    setCurrentPage(pageName);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('mypage')) setCurrentPage('마이페이지');
    else if (path.includes('mybooks')) setCurrentPage('문제집 관리');
    else if (path.includes('myquestions')) setCurrentPage('내가 푼 문제들');
    else if (path.includes('mystudies')) setCurrentPage('스터디 관리');
  }, [location]);

  const handleOutsideClick = (event) => {
    if (
      menuOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);

  if (!userInfo) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  return (
    <div>
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${username}'s profile`}
              className="w-10 h-10 rounded-full mr-4"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-black mr-4" />
          )}
          <div className="text-l font-semibold">{username}</div>
        </div>

        {/* 로그인한 사용자 ID와 현재 프로필의 ID가 같은 경우에만 메뉴 표시 */}
        {logInUserId === userId && (
          <div className="relative mr-20 flex items-center">
            <div
              className="flex items-center border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="mr-2">{currentPage}</span>
              <FaCaretDown />
            </div>
            {menuOpen && (
              <div className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleMenuClick(`/mypage/${userId}`, '마이페이지')
                    }
                  >
                    마이페이지
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuClick('/mybooks', '문제집 관리')}
                  >
                    문제집 관리
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleMenuClick('/myquestions', '내가 푼 문제들')
                    }
                  >
                    내가 푼 문제들
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuClick('/mystudies', '스터디 관리')}
                  >
                    스터디 관리
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import { getUserId } from './GetUserId';
import { useUser } from '../../context/UserProvider';
import { FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import api from '../../api/api';

const MyProfileMe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, isLoading, isError, setUserInfo } = useUser();
  const userId = getUserId();

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.userName);
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

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      if (username) {
        formData.append('newUserName', username);
      }

      if (profileImage) {
        formData.append('file', profileImage);
      }

      const response = await api.patch('/mypage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 사용자 정보를 context에서 업데이트
      setUserInfo({
        ...userInfo,
        userName: response.data.userName,
        profileImage: response.data.profileImage,
      });

      setIsEditing(false);
      alert('프로필이 성공적으로 업데이트되었습니다.');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data</div>;

  return (
    <div className="relative">
      <div className="flex items-center mb-10 justify-between">
        <div className="flex items-center">
          {userInfo && userInfo.profileImage ? (
            <img
              src={userInfo.profileImage}
              alt={`${userInfo.userName}'s profile`}
              className="w-14 h-14 rounded-full mr-4 object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-300 mr-4" />
          )}
          <div className="text-l font-semibold">
            {userInfo ? userInfo.userName : '이름 없음'}
          </div>
          <button className="ml-5 text-blue-500" onClick={handleEditClick}>
            {isEditing ? (
              <MdCancel size={25} color="black" />
            ) : (
              <FaEdit size={25} color="black" />
            )}
          </button>
        </div>

        <div className="relative mr-20 flex items-center" ref={menuRef}>
          <div
            className="flex items-center border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
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
      </div>

      {/* 수정창 애니메이션 추가 */}
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          isEditing ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="mb-6">
          <div className="mb-4">
            <div className="mb-2 text-xl font-semibold text-gray-700">이름</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 w-full mb-4 rounded-lg focus:outline-none border-b-2 focus:ring-2 focus:ring-blue-500"
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="mb-4">
            <div className="mb-2 text-xl font-semibold text-gray-700">
              프로필 이미지
            </div>
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="p-3 w-full mb-4 rounded-lg focus:outline-none border-b-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileMe;

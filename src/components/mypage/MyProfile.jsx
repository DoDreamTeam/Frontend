import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import GetUser from './getUser';
import { getUserId } from './GetUserId'; // 로그인 사용자 ID 가져오기

const MyProfile = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData: userInfo, error } = GetUser(userId); // GetUser 훅 사용
  const logInUserId = getUserId(); // 로그인 사용자 ID

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.userName);
    }
  }, [userInfo]);

  useEffect(() => {
    console.log('userId:', userId);
    console.log('userInfo:', userInfo);
  }, [userId, userInfo]);

  const handleSave = async () => {
    try {
      const token = getCookie('accessToken');
      const formData = new FormData();

      if (username) {
        formData.append('newUserName', username);
      }
      if (profileImage) {
        formData.append('file', profileImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_REST_SERVER}/mypage`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedData = await response.json();
      setUsername(updatedData.userName || username);
      if (profileImage) {
        setProfileImage(URL.createObjectURL(profileImage));
      }

      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleMenuClick = (path, pageName) => {
    setMenuOpen(false);
    navigate(path);
    setCurrentPage(pageName);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('mypage')) {
      setCurrentPage('마이페이지');
    } else if (path.includes('mybooks')) {
      setCurrentPage('문제집 관리');
    } else if (path.includes('myquestions')) {
      setCurrentPage('내가 푼 문제들');
    } else if (path.includes('mystudies')) {
      setCurrentPage('스터디 관리');
    }
  }, [location]);

  if (!userInfo) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  return (
    <div>
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center">
          {userInfo.profileImage ? (
            <img
              src={userInfo.profileImage}
              alt={`${userInfo.userName}'s profile`}
              className="w-10 h-10 rounded-full mr-4"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-black mr-4" />
          )}
          <div className="text-l font-semibold">{userInfo.userName}</div>
          {logInUserId.toString() === userInfo.userId.toString() && ( // 로그인 사용자 ID와 동일할 때만 수정 버튼 표시
            <button className="ml-2 text-blue-500" onClick={handleEditClick}>
              {isEditing ? '취소' : '수정'}
            </button>
          )}
        </div>

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
      </div>
      {isEditing && (
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="이름을 입력하세요"
            className="border border-gray-300 p-2 w-full mb-2"
          />
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="border border-gray-300 p-2 w-full mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            저장
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;

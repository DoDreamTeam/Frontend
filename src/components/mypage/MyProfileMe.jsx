import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import { getUserId } from './GetUserId';
import { getCookie } from '../../utils/cookieUtils';
import { useUser } from '../../context/UserProvider';
import { FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

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
      const token = getCookie('accessToken');
      const formData = new FormData();

      if (username) {
        formData.append('newUserName', username);
      }

      if (profileImage) {
        formData.append('file', profileImage);
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_REST_SERVER}/mypage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

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
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center">
          {userInfo && userInfo.profileImage ? (
            <img
              src={userInfo.profileImage}
              alt={`${userInfo.userName}'s profile`}
              className="w-10 h-10 rounded-full mr-4"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-black mr-4" />
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
            className="border border-gray-300 p-2 w-full mb-2"
            placeholder="이름을 입력하세요"
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

export default MyProfileMe;

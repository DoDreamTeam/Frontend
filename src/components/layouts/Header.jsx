import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import defaultProfile from "../../assets/default_profile.jpg";
import { IoMdNotifications } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationMenu from "../notification/NotificationMenu";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import { useUser } from "../../context/UserProvider";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치 정보를 가져옴
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { userInfo } = useUser();

  const notifications = [
    {
      message: "[정처기 실기 대비] 문제집에 새로운 댓글이  달렸습니다!",
      read: false,
    },
    {
      message: "[정처기 실기 스터디] 누군가 스터디 가입 승인을 요청했습니다.",
      read: true,
    },
    {
      message: "[정처기 실기 스터디] 누군가 스터디 가입 승인을 요청했습니다.",
      read: true,
    },
    {
      message: "[면접 대비 스터디] 스터디 인증글에 새로운 댓글이  달렸습니다!",
      read: false,
    },
  ];

  // 사용자 정보가 있으면 인증
  const isAuthenticated = !!userInfo;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (notificationOpen) setNotificationOpen(false); // 알람 메뉴 닫기
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
    if (menuOpen) setMenuOpen(false); // 프로필 메뉴 닫기
  };

  const handleMenuClick = (path) => {
    setMenuOpen(false);
    setNotificationOpen(false);
    navigate(path);
  };

  // 페이지 이동 시 메뉴를 닫음
  useEffect(() => {
    setMenuOpen(false);
    setNotificationOpen(false);
  }, [location]); // location이 변경될 때마다 실행

  return (
    <header className="flex justify-center items-center px-8 py-4 bg-white w-full">
      <div className="flex justify-between items-center w-full max-w-screen-lg">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-[180px]" />
        </div>

        <div className="flex items-center space-x-4">
          <span
            className="cursor-pointer hover:text-blue-400"
            onClick={() => handleMenuClick("/book")}
          >
            문제집
          </span>
          <span
            className="cursor-pointer hover:text-blue-400"
            onClick={() => handleMenuClick("/study")}
          >
            스터디
          </span>
          {isAuthenticated ? (
            <>
              <div className="relative flex items-center">
                <span
                  className="relative cursor-pointer hover:text-blue-400"
                  onClick={toggleNotifications}
                >
                  <IoMdNotifications className="w-6 h-6" />
                  {notifications.some((notification) => !notification.read) && (
                    <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full transform -translate-y-1.0" />
                  )}
                </span>
                {notificationOpen && (
                  <NotificationMenu
                    notifications={notifications}
                    closeMenu={toggleNotifications}
                  />
                )}
              </div>
              <div className="relative flex items-center">
                <img
                  src={userInfo.profileImage || defaultProfile}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300"
                  onClick={toggleMenu}
                />
                <span className="ml-2 cursor-pointer" onClick={toggleMenu}>
                  <FaCaretDown />
                </span>
                {menuOpen && (
                  <div className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMenuClick("/book/create")}
                      >
                        문제집 만들기
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMenuClick("/study/create")}
                      >
                        스터디 만들기
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleMenuClick(`/mypage/${userInfo.userId}`)
                        }
                      >
                        마이페이지
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <LogoutButton />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

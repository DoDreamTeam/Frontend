import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

// 상대 시간 계산 함수
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}년 전`;
  } else if (months > 0) {
    return `${months}개월 전`;
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
};

const NotificationMenu = ({ notifications, closeMenu, setNotifications }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 알림 클릭 시 해당 URL로 이동하는 함수
  const handleNotificationClick = (url) => {
    // 각 URL을 처리하기 위한 정규식 패턴
    const bookCommentRegex = /\/api\/books\/(\d+)\/comments/;
    //const studyAnswerCommentRegex = /\/api\/study\/answer\/(\d+)\/comments/;
    const studyMemberRequestRegex = /\/api\/study\/(\d+)\/members/;
    const studyMemberApproveRegex = /\/api\/study\/(\d+)\/members\/(\d+)/;
    const studyExitRegex = /\/api\/study\/(\d+)\/members\/(\d+)/;
    const studyLeaderChangeRegex = /\/api\/study\/leader\/(\d+)/;

    // URL 패턴에 따른 알림 처리
    switch (true) {
      case bookCommentRegex.test(url):
        const bookMatch = url.match(bookCommentRegex);
        const bookId = bookMatch[1];
        navigate(`/book/${bookId}`);
        break;

      // case studyAnswerCommentRegex.test(url):
      //   const answerMatch = url.match(studyAnswerCommentRegex);
      //   const studyAnswerId = answerMatch[1];
      //   navigate(`/study/${studyAnswerId}`);
      //   break;

      case studyMemberRequestRegex.test(url):
        const requestMatch = url.match(studyMemberRequestRegex);
        const studyIdForRequest = requestMatch[1];
        navigate(`/study/${studyIdForRequest}`);
        break;

      case studyMemberApproveRegex.test(url):
        const approveMatch = url.match(studyMemberApproveRegex);
        const studyIdForApprove = approveMatch[1];
        navigate(`/study/${studyIdForApprove}`);
        break;

      case studyExitRegex.test(url):
        const exitMatch = url.test(studyExitRegex);
        const studyIdForExit = exitMatch[1];
        navigate(`/study/${studyIdForExit}`);
        break;

      case studyLeaderChangeRegex.test(url):
        const leaderChangeMatch = url.match(studyLeaderChangeRegex);
        const studyIdForLeaderChange = leaderChangeMatch[1];
        navigate(`/study/${studyIdForLeaderChange}`);
        break;

      default:
        console.log("알 수 없는 URL 형식: ", url);
        break;
    }
  };

  // 알림 읽음 처리
  const markAsReadMutation = useMutation({
    mutationFn: (notificationId) =>
      api.patch(`/notification/${notificationId}`, { read: true }),
    onSuccess: (data, notificationId) => {
      queryClient.invalidateQueries(["notifications"]); // 알림 데이터를 refetch
      // 성공적으로 읽음 처리 후 상태 업데이트
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
      setDropdownOpen(null);
    },
    onError: (error) => {
      console.error("알림 읽음 처리 실패:", error);
    },
  });

  // 알림 삭제
  const removeNotificationMutation = useMutation({
    mutationFn: (notificationId) =>
      api.delete(`/notification/${notificationId}`),
    onSuccess: (data, notificationId) => {
      // 삭제가 성공하면 해당 알림을 목록에서 제거
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
      setDropdownOpen(null);
    },
    onError: (error) => {
      console.error("알림 삭제 실패:", error);
    },
  });

  // 알림 삭제 함수
  const handleRemoveNotification = (notificationId) => {
    removeNotificationMutation.mutate(notificationId);
  };

  // 알림 읽음 처리 함수
  const handleMarkAsRead = (notificationId) => {
    markAsReadMutation.mutate(notificationId);
  };

  // 전체 알림 삭제
  const removeAllNotifications = () => {
    notifications.forEach((notification) => {
      removeNotificationMutation.mutate(notification.id);
    });
  };

  // 전체 알림 읽음 처리
  const markAllAsRead = () => {
    notifications.forEach((notification) => {
      markAsReadMutation.mutate(notification.id);
    });
  };

  // 드롭다운 메뉴 열기/닫기 상태 관리
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // 드롭다운 토글 함수
  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div className="absolute right-0 top-10 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center p-2 border-b m-2">
        <span className="font-semibold">알림</span>
        <button
          onClick={closeMenu}
          className="text-gray-600 hover:text-gray-800 ml-2"
        >
          <FaTimes />
        </button>
      </div>
      <ul className="py-1 max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <li className="px-4 py-2 text-gray-500">알림이 없습니다.</li>
        ) : (
          notifications.map((notification, index) => (
            <li
              key={index}
              className={`flex items-center px-4 py-2 cursor-pointer ${
                notification.read
                  ? "bg-transparent hover:bg-gray-100"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
            >
              <span className="mr-3 w-4 h-4">
                <MdOutlineAccessAlarms />
              </span>
              <div className="flex-1 m-3">
                <div className="flex justify-between items-center">
                  <span className="mr-1 text-sm text-left">
                    {notification.content}
                  </span>
                  <span className="text-xs text-right text-gray-500">
                    {timeAgo(notification.createdAt)}
                  </span>
                </div>
              </div>

              {/* 드롭다운 메뉴 아이콘 */}
              <div className="relative">
                <CiMenuKebab
                  onClick={() => toggleDropdown(index)}
                  className="cursor-pointer text-gray-600"
                />

                {/* 드롭다운 메뉴 */}
                {dropdownOpen === index && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul>
                      <li
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        읽음 처리
                      </li>
                      <li
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleNotificationClick(notification.url)
                        } // 바로가기
                      >
                        바로가기
                      </li>
                      <li
                        className="px-4 py-2 text-sm text-red-500 hover:bg-red-100 cursor-pointer"
                        onClick={() =>
                          handleRemoveNotification(notification.id)
                        }
                      >
                        삭제
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
      {notifications.length > 0 && (
        <div className="text-center py-2 border-t mt-2">
          {notifications.some((notification) => !notification.read) ? (
            <button
              onClick={markAllAsRead}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              전체 읽음 처리
            </button>
          ) : (
            <button
              onClick={removeAllNotifications}
              className="text-blue-500 hover:text-blue-700"
            >
              전체 삭제
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;

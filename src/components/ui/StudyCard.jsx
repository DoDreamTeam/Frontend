import React, { useState } from "react";
import { MdOutlinePeopleOutline } from "react-icons/md";
import defaultProfile from "../../assets/default_profile.jpg";
import { useNavigate } from "react-router-dom";
import { categoryNames, categoryStyles } from "../../utils/categoryUtils";
import { statusNames, statusStyles } from "../../utils/statusUtils";
import useModal from "../../hooks/useModal";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { useUser } from "../../context/UserProvider";
import LoginRequestModal from "./LoginRequestModal";

const StudyCard = ({
  id,
  title,
  userId,
  username,
  userCount,
  profileImage,
  description,
  category,
  status,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const { openModal, closeModal, Modal } = useModal();
  const [isNotLogin, setIsNotLogin] = useState(false);

  // 스터디 가입 요청을 처리하는 mutation
  const joinMutation = useMutation({
    mutationFn: async () => {
      try {
        // 가입 요청을 보낼 때 studyId와 roleEnum을 함께 보냄
        const response = await api.post(`/study/${id}/members`, {
          studyId: id,
          roleEnum: "ROLE_WAITING", // 가입 요청은 '승인 대기' 상태로 설정
        });
        return response.data; // 정상 응답 처리
      } catch (error) {
        console.error("가입 신청 중 오류:", error); // 오류 출력
        throw error; // 오류를 다시 던져서 onError에서 처리하도록 함
      }
    },
    onSuccess: () => {
      closeModal();
      window.location.reload();
    },
    onError: (error) => {
      console.error("가입 ERROR: ", error);
    },
  });

  const handleJoinClick = () => {
    if (!userInfo) {
      // 로그인 상태가 아니면 로그인 요청 모달을 열기
      setIsNotLogin(true);
      openModal();
      return;
    }

    if (status === null) {
      // 상태가 null이면 가입 신청 모달을 열기
      openModal();
    }
  };

  const handleJoinCancel = () => {
    closeModal(); // 모달을 닫음
  };

  const handleConfirmJoin = () => {
    joinMutation.mutate(); // 가입 신청을 위해 mutation 실행
  };

  return (
    <div className="border border-black shadow-lg rounded-lg p-4 flex flex-col h-60 w-60 justify-between overflow-hidden">
      {/* 카테고리 및 참여 버튼 */}
      <div className="flex justify-between items-center mb-2">
        <div
          className={`text-sm font-semibold p-2 rounded ${categoryStyles[category]}`}
          style={{ borderRadius: "20px" }}
        >
          {categoryNames[category] || category}
        </div>
        <button
          className={`text-xs font-semibold ${statusStyles[status]}`}
          onClick={handleJoinClick}
        >
          {statusNames[status] || status}
        </button>
      </div>

      {/* 스터디 제목 */}
      <div
        className="text-lg mt-3 mb-1 flex-grow hover:underline hover:text-gray-400 cursor-pointer"
        onClick={() => navigate(`/study/${id}`)}
      >
        {title}
      </div>

      {/* 스터디 설명 */}
      <div className="text-sm text-gray-600 mb-3">{description}</div>

      {/* 스터디장 및 참여 인원 */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center text-sm text-gray-500">
          <img
            src={profileImage || defaultProfile}
            alt="Profile"
            className="h-6 w-6 rounded-full mr-2"
          />
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate(`/mypage/${userId}`)}
          >
            {username}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MdOutlinePeopleOutline className="mr-1" />
          <span>{userCount}명</span>
        </div>
      </div>

      {/* 가입 신청 여부 모달 */}
      <Modal>
        <div className="text-2xl font-semibold m-6">
          스터디에 가입하시겠습니까?
          <div className="flex justify-around mt-4 w-full">
            <button
              className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
              onClick={handleConfirmJoin}
            >
              예
            </button>
            <button
              className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
              onClick={handleJoinCancel}
            >
              아니요
            </button>
          </div>
        </div>
      </Modal>

      {/* 비회원이 클릭한 경우 */}
      {isNotLogin && (
        <Modal>
          <LoginRequestModal handleCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default StudyCard;

import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import defaultProfile from "../../assets/default_profile.jpg";
import { formatDate } from "../../utils/formatDateUtils";
import { useNavigate } from "react-router-dom";
import LikeButton from "../bookmain/comment/LikeButton";
import { useUser } from "../../context/UserProvider";
import useModal from "../../hooks/useModal";
import api from "../../api/api";
import useAlert from "../../hooks/useAlert";

const Comment = ({
  bookId,
  id,
  userId,
  comment,
  username,
  profileImage,
  likeCount,
  createdAt,
  liked,
  onLikeToggle,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const { openModal, closeModal, Modal } = useModal();

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/books/${bookId}/comments/${id}`);
      if (response.status === 204) {
        window.location.reload();
        closeModal();
      }
    } catch (error) {
      console.error("COMMENT DELETE ERROR: ", error);
    }
  };

  return (
    <div className="flex justify-between items-start p-4 rounded mt-3 mb-3 border-b">
      <div className="flex items-start">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <img
              src={profileImage || defaultProfile}
              alt="Profile"
              className="w-7 h-7 rounded-full mr-2"
            />
            <span
              className="text-sm hover:underline cursor-pointer"
              onClick={() => navigate(`/mypage/${userId}`)}
            >
              {username}
            </span>
          </div>

          <p className="ml-10 text-gray-700 mb-3">{comment}</p>

          <div className="flex items-center ml-10 text-xs text-gray-400">
            <span>{formatDate(createdAt)}</span>
            {userInfo?.userName === username && (
              <div className="flex ml-2">
                <button className="mr-1 text-gray-500 hover:text-gray-600 hover:underline">
                  수정
                </button>
                <button
                  onClick={openModal}
                  className="text-gray-500 hover:text-gray-600 hover:underline"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center text-gray-500">
        <LikeButton
          bookId={bookId}
          commentId={id}
          isLiked={liked}
          onLikeToggle={onLikeToggle}
          commentOwnerName={username}
        />
        {likeCount}
      </div>

      {/* 삭제 모달 */}
      <Modal style="w-120 text-center">
        <div className="text-2xl font-semibold m-6">
          정말 댓글을 삭제하시겠습니까?
        </div>
        <div className="flex justify-around mt-4 w-full">
          <button
            className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Comment;

import React from "react";
import { FaHeart } from "react-icons/fa";
import defaultProfile from "../../assets/default_profile.jpg";
import { formatDate } from "../../utils/formatDateUtils";
import { useNavigate } from "react-router-dom";
import LikeButton from "../bookmain/comment/LikeButton";

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
          <span className="ml-10 text-xs text-gray-500">
            {formatDate(createdAt)}
          </span>
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
    </div>
  );
};

export default Comment;

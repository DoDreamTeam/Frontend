import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import defaultProfile from "../../assets/default_profile.jpg";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../ui/BookmarkButton";
import { useUser } from "../../context/UserProvider";

const BookInfo = ({ bookId }) => {
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const getBookInfo = async () => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", bookId],
    queryFn: getBookInfo,
  });

  useEffect(() => {
    if (data) {
      setIsBookmarked(data.isBookmarked); // 초기값 설정
      setBookmarkCount(data.bookmarkCount); // 초기 북마크 수 설정
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { title, username, userProfile, userId } = data;

  const toggleBookmark = (deleted) => {
    setIsBookmarked((prev) => !prev); // 북마크 상태 토글
    setBookmarkCount((prev) => (deleted ? prev - 1 : prev + 1)); // deleted가 true면 -1, 아니면 +1
  };

  return (
    <div className="flex justify-between items-start w-full mb-16">
      <div className="flex flex-col">
        <div className="flex items-center mb-6">
          <div className="mr-2 text-3xl font-semibold">{title}</div>
          {userInfo?.userName !== username && (
            <BookmarkButton
              isBookmarked={isBookmarked}
              bookmarkCount={bookmarkCount}
              onToggleBookmark={toggleBookmark}
              bookId={bookId}
            />
          )}
          {userInfo?.userName === username && (
            <div className="flex justify-center mt-2">
              <button className="mx-1">
                <MdEdit className="hover:text-blue-400" />
              </button>
              <button className="mx-1">
                <MdDelete className="hover:text-blue-400" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <img
            src={userProfile || defaultProfile}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 mr-2"
          />
          <div
            className="hover:underline cursor-pointer"
            onClick={() => navigate(`/mypage/${userId}`)}
          >
            {username}
          </div>
        </div>
      </div>
      {userInfo?.userName === username && (
        <div className="ml-auto">
          <button
            className="bg-blue-400 text-white text-xs py-2 px-2 rounded hover:bg-blue-600"
            onClick={() => navigate(`/book/${bookId}/questions/add`)}
          >
            문제 추가하기
          </button>
        </div>
      )}
    </div>
  );
};

export default BookInfo;

import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { formatDate } from '../../utils/formatDateUtils';
import { FaRegFaceSadCry } from 'react-icons/fa6';


const MyBookCommentLike = () => {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [currentLikePage, setCurrentLikePage] = useState(0);
  const [totalPagesComments, setTotalPagesComments] = useState(0);
  const [totalPagesLikes, setTotalPagesLikes] = useState(0);
  const [showComments, setShowComments] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get("/mypage/book/comment", {
          params: { page: currentCommentPage },
        });
        if (response.data.content) {
          setComments(response.data.content);
          setTotalPagesComments(response.data.page.totalPages);
          setItemsPerPage(response.data.page.size);
        } else {
          setComments([]);
          setTotalPagesComments(0);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await api.get("/mypage/book/comment/like", {
          params: { page: currentLikePage },
        });
        if (response.data.content) {
          setLikes(response.data.content);
          setTotalPagesLikes(response.data.page.totalPages);
          setItemsPerPage(response.data.page.size);
        } else {
          setLikes([]);
          setTotalPagesComments(0);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (showComments) {
      fetchComments();
    } else {
      fetchLikes();
    }
  }, [currentCommentPage, currentLikePage, showComments]);

  const handlePageChange = (pageNumber) => {
    if (showComments) {
      setCurrentCommentPage(pageNumber);
    } else {
      setCurrentLikePage(pageNumber);
    }
  };

  const handleTabChange = (isComments) => {
    setShowComments(isComments);
    if (isComments) {
      setCurrentCommentPage(0);
    } else {
      setCurrentLikePage(0);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="text-xl font-semibold mb-7">
        내가 작성한 댓글과 좋아요
      </div>
      <div className="flex items-center mb-4 text-gray-500">
        <button
          onClick={() => handleTabChange(true)}
          className={`p-2 transition-all duration-200 hover:bg-gray-200 rounded ${
            showComments ? "font-bold text-black underline" : ""
          }`}
        >
          댓글
        </button>
        <button
          onClick={() => handleTabChange(false)}
          className={`p-2 transition-all duration-200 hover:bg-gray-200 rounded ${
            !showComments ? "font-bold text-black underline" : ""
          }`}
        >
          좋아요
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {showComments ? (
          comments.length > 0 ? (
            comments.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-between p-2 cursor-pointer"
                onClick={() => navigate(`/book/${item.bookId}`)}
              >
                <div className="mr-8 ml-7">
                  {currentCommentPage * itemsPerPage + index + 1}
                </div>
                <div className="flex-grow mx-12 hover:underline">
                  {item.comment}
                </div>
                <div className="mr-8 flex items-center justify-center">
                  {formatDate(item.createdAt)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center flex items-center justify-center">
              작성한 댓글이 없습니다.
              <FaRegFaceSadCry className="ml-2 text-xl" />
            </div>
          )
        ) : likes.length > 0 ? (
          likes.map((item, index) => (
            <div
              key={item.commentId}
              className="flex justify-between p-2 cursor-pointer"
              onClick={() => navigate(`/book/${item.bookId}/questions`)}
            >
              <div className="mr-8 ml-7">
                {currentLikePage * itemsPerPage + index + 1}
              </div>
              <div className="flex-grow mx-12 hover:underline">
                {item.comment}
              </div>
              <div className="mr-8 flex items-center justify-center">
                {formatDate(item.createdAt)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center flex items-center justify-center">
            좋아요 한 목록이 없습니다.
            <FaRegFaceSadCry className="ml-2 text-xl" />
          </div>
        )}
      </div>

      {/* 페이지 네비게이션 */}
      {showComments && comments.length > 0 && totalPagesComments > 1 && (
        <div className="flex justify-center mt-8 mb-10">
          <button
            onClick={() => handlePageChange(currentCommentPage - 1)}
            disabled={currentCommentPage === 0}
          >
            <FaChevronLeft className="text-gray-500 text-sm" />
          </button>
          {Array.from({ length: totalPagesComments }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`mx-1 transition-all duration-200 ${
                index === currentCommentPage
                  ? 'font-bold text-blue-400'
                  : 'text-gray-500'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentCommentPage + 1)}
            disabled={currentCommentPage === totalPagesComments - 1}
          >
            <FaChevronRight className="text-gray-500 text-sm" />
          </button>
        </div>
      )}

      {(!showComments || likes.length > 0) && totalPagesLikes > 1 && (
        <div className="flex justify-center mt-8 mb-10">
          <button
            onClick={() => handlePageChange(currentLikePage - 1)}
            disabled={currentLikePage === 0}
          >
            <FaChevronLeft className="text-gray-500 text-sm" />
          </button>
          {Array.from({ length: totalPagesLikes }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`mx-1 transition-all duration-200 ${
                index === currentLikePage
                  ? 'font-bold text-blue-400'
                  : 'text-gray-500'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentLikePage + 1)}
            disabled={currentLikePage === totalPagesLikes - 1}
          >
            <FaChevronRight className="text-gray-500 text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookCommentLike;

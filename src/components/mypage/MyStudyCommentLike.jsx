import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { formatDate } from '../../utils/formatDateUtils';
import { FaRegFaceSadCry } from 'react-icons/fa6';

const MyStudyCommentLike = () => {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [currentLikePage, setCurrentLikePage] = useState(0);
  const [totalPagesComments, setTotalPagesComments] = useState(0);
  const [totalPagesLikes, setTotalPagesLikes] = useState(0);
  const [showComments, setShowComments] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const fetchData = async (endpoint, page, setData, setTotalPages) => {
    try {
      const response = await api.get(endpoint, {
        params: { page },
      });
      if (response && response.data) {
        setData(response.data.content || []);
        setTotalPages(response.data.page?.totalPages || 0);
        setItemsPerPage(response.data.page?.size || 0);
      } else {
        setData([]);
        setTotalPages(0);
      }
    } catch (err) {
      console.error(`${endpoint} 데이터를 가져오는 중 오류 발생:`, err);
      setData([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    if (showComments) {
      fetchData(
        '/mypage/book/comment/study',
        currentCommentPage,
        setComments,
        setTotalPagesComments
      );
    } else {
      fetchData(
        '/mypage/book/comment/study/like',
        currentLikePage,
        setLikes,
        setTotalPagesLikes
      );
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

  const renderItems = (items) => {
    return items.map((item, index) => (
      <div
        key={item.id || item.commentId}
        className="flex justify-between p-2 cursor-pointer"
        onClick={() => navigate(`/study/${item.studyId}/${item.studyAnswerId}`)}
      >
        <div className="mr-8 ml-7">
          {(showComments ? currentCommentPage : currentLikePage) *
            itemsPerPage +
            index +
            1}
        </div>
        <div className="flex-grow mx-12 hover:underline">{item.comment}</div>
        <div className="mr-8 flex items-center justify-center">
          {formatDate(item.createdAt)}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="text-xl font-semibold mb-7">
        내가 작성한 댓글과 좋아요
      </div>
      <div className="flex items-center mb-4 text-gray-500">
        <button
          onClick={() => handleTabChange(true)}
          className={`p-2 transition-all duration-200 hover:bg-gray-200 rounded ${
            showComments ? 'font-bold text-black underline' : ''
          }`}
        >
          댓글
        </button>
        <button
          onClick={() => handleTabChange(false)}
          className={`p-2 transition-all duration-200 hover:bg-gray-200 rounded ${
            !showComments ? 'font-bold text-black underline' : ''
          }`}
        >
          좋아요
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {showComments ? (
          comments.length > 0 ? (
            renderItems(comments)
          ) : (
            <div className="text-gray-500 text-center flex items-center justify-center">
              작성한 댓글이 없습니다.
              <FaRegFaceSadCry className="ml-2 text-xl" />
            </div>
          )
        ) : likes.length > 0 ? (
          renderItems(likes)
        ) : (
          <div className="text-gray-500 text-center flex items-center justify-center">
            좋아요 한 목록이 없습니다.
            <FaRegFaceSadCry className="ml-2 text-xl" />
          </div>
        )}
      </div>

      {showComments && comments.length > 0 && totalPagesComments > 1 && (
        <Pagination
          currentPage={currentCommentPage}
          totalPages={totalPagesComments}
          onPageChange={handlePageChange}
        />
      )}

      {!showComments && likes.length > 0 && totalPagesLikes > 1 && (
        <Pagination
          currentPage={currentLikePage}
          totalPages={totalPagesLikes}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-8 mb-10">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 0}
    >
      <FaChevronLeft className="text-gray-500 text-sm" />
    </button>
    {Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        onClick={() => onPageChange(index)}
        className={`mx-1 transition-all duration-200 ${
          index === currentPage ? 'font-bold text-blue-400' : 'text-gray-500'
        }`}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1}
    >
      <FaChevronRight className="text-gray-500 text-sm" />
    </button>
  </div>
);

export default MyStudyCommentLike;

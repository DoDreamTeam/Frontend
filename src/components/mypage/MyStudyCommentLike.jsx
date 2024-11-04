import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../api/api';

const MyStudyCommentLike = () => {
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
        const response = await api.get('/mypage/book/comment/study', {
          params: { page: currentCommentPage },
        });
        setComments(response.data.content);
        setTotalPagesComments(response.data.page.totalPages);
        setItemsPerPage(response.data.page.size);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await api.get('/mypage/book/comment/study/like', {
          params: { page: currentLikePage },
        });
        setLikes(response.data.content);
        setTotalPagesLikes(response.data.page.totalPages);
        setItemsPerPage(response.data.page.size);
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

  return (
    <div>
      <div className="text-xl font-semibold mb-7">
        {' '}
        내가 작성한 댓글과 좋아요{' '}
      </div>
      <div className="flex items-center mb-4 text-gray-500">
        <button
          onClick={() => handleTabChange(true)}
          className={`p-2 ${
            showComments ? 'font-bold text-black underline' : ''
          }`}
        >
          댓글
        </button>
        <button
          onClick={() => handleTabChange(false)}
          className={`p-2 ${
            !showComments ? 'font-bold text-black underline' : ''
          }`}
        >
          좋아요
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {(showComments ? comments : likes).map((item, index) => (
          <div
            key={item.id || item.commentId}
            className="flex justify-between p-2"
          >
            <div className="mr-8 ml-7">
              {showComments
                ? currentCommentPage * itemsPerPage + index + 1
                : currentLikePage * itemsPerPage + index + 1}
            </div>
            <div className="flex-grow mx-12">{item.comment}</div>
            <div className="mr-8">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={() =>
            handlePageChange(
              showComments ? currentCommentPage - 1 : currentLikePage - 1
            )
          }
          disabled={
            showComments ? currentCommentPage === 0 : currentLikePage === 0
          }
        >
          <FaChevronLeft className="text-gray-500 text-sm" />
        </button>
        {Array.from({
          length: showComments ? totalPagesComments : totalPagesLikes,
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`mx-1 ${
              showComments
                ? index === currentCommentPage
                  ? 'font-bold text-blue-400'
                  : 'text-gray-500'
                : index === currentLikePage
                ? 'font-bold text-blue-400'
                : 'text-gray-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            handlePageChange(
              showComments ? currentCommentPage + 1 : currentLikePage + 1
            )
          }
          disabled={
            showComments
              ? currentCommentPage === totalPagesComments - 1
              : currentLikePage === totalPagesLikes - 1
          }
        >
          <FaChevronRight className="text-gray-500 text-sm" />
        </button>
      </div>
    </div>
  );
};

export default MyStudyCommentLike;

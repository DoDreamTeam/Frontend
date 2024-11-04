import React from "react";
import usePagination from "../../../hooks/usePagination";
import api from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import Comment from "../../ui/Comment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CommentList = ({ bookId }) => {
  const { currentPage, setPage } = usePagination(0);
  const itemsPerPage = 5;

  const getCommentList = async (page) => {
    const response = await api.get(
      `/books/${bookId}/comments?page=${page}&size=${itemsPerPage}`
    );
    return response.data; // data를 반환
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", bookId, currentPage],
    queryFn: () => getCommentList(currentPage),
    enabled: !!bookId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const comments = data?.content || [];
  const totalPages = data?.page?.totalPages || 1; // 기본값 1로 설정

  return (
    <>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              userId={comment.userId}
              comment={comment.comment}
              username={comment.username}
              profileImage={comment.userProfile}
              likeCount={comment.likeCount}
              createdAt={comment.createdAt}
              liked={comment.liked}
              bookId={comment.bookId}
            />
          ))
        ) : (
          <p className="text-center m-5">댓글이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8 mb-10">
        <button
          onClick={() => setPage(currentPage - 1, totalPages)}
          disabled={currentPage === 0}
          className={`p-2 ${
            currentPage === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <FaChevronLeft className="text-gray-600 text-sm" />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index, totalPages)}
            className={`mx-1 p-2 ${
              index === currentPage
                ? "font-bold text-blue-400"
                : "text-gray-500 hover:text-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(currentPage + 1, totalPages)}
          disabled={currentPage === totalPages - 1}
          className={`p-2 ${
            currentPage === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <FaChevronRight className="text-gray-600 text-sm" />
        </button>
      </div>
    </>
  );
};

export default CommentList;

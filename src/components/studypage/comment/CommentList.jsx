import React from "react";
import usePagination from "../../../hooks/usePagination";
import api from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import Comment from "../../ui/Comment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CommentList = ({ noticeId }) => {
  const { currentPage, setPage } = usePagination(0);
  const itemsPerPage = 5;

  const getCommentList = async (page) => {
    const response = await api.get(
      `/notice/${noticeId}/comments?page=${page}&size=${itemsPerPage}`
    );
    return response.data; // data를 반환
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", noticeId, currentPage],
    queryFn: () => getCommentList(currentPage),
    enabled: !!noticeId,
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
              profileImage={comment.profileImage}
              likeCount={comment.likeCount}
              createdAt={comment.createdAt}
              liked={comment.liked}
              noticeId={comment.noticeId}
            />
          ))
        ) : (
          <div className="w-full mb-16 text-center">
            <div className="flex flex-col justify-center items-center h-80">
              <div className="text-xl font-medium text-center my-4">
                등록된 댓글이 없습니다.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {comments.length > 0 && (
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
      )}
    </>
  );
};

export default CommentList;

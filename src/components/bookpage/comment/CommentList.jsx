import React from "react";
import usePagination from "../../../hooks/usePagination";
import api from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import Comment from "../../ui/Comment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Pagination from "../../ui/Pagination";

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
        <Pagination
          currentPage={currentPage}
          totalPages={data.page.totalPages}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default CommentList;

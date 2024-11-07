import React, { useEffect } from 'react';
import usePagination from '../../../hooks/usePagination';
import api from '../../../api/api';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../ui/Pagination';
import NoticeComment from './NoticeComment';

const NoticeCommentList = ({ noticeId }) => {
  const { currentPage, setPage } = usePagination(0);
  const itemsPerPage = 5;

  const getCommentList = async (page) => {
    const response = await api.get(
      `/notice/${noticeId}/comments?page=${page}&size=${itemsPerPage}`
    );
    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['noticecomments', noticeId, currentPage],
    queryFn: () => getCommentList(currentPage),
    enabled: !!noticeId,
  });

  useEffect(() => {
    refetch();
  }, [noticeId, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const comments = data?.content || [];
  const totalPages = data?.page?.totalPages || 1; // 기본값 1로 설정

  return (
    <>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <NoticeComment
              key={comment.id}
              id={comment.id}
              userId={comment.userId}
              comment={comment.content}
              username={comment.username}
              profileImage={comment.profileImage}
              likeCount={comment.likeCount}
              createdAt={comment.createdAt}
              liked={comment.liked}
              noticeId={noticeId}
              onCommentAdded={refetch}
            />
          ))
        ) : (
          <p className="text-center m-5">댓글이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={data.page.totalPages}
        setPage={setPage}
      />
    </>
  );
};

export default NoticeCommentList;

import React from 'react';
import CommentForm from '../../ui/CommentForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../api/api';

const NoticeCommentForm = ({ noticeId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (comment) => {
      const response = await api.post(`/notice/${noticeId}/comments`, {
        content: comment,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['noticecomments', noticeId]);
    },
    onError: () => {
      console.log('COMMENT ERROR!');
    },
  });

  const handleCommentSubmit = (comment) => {
    mutation.mutate(comment);
  };

  return (
    <>
      <CommentForm
        placeholder="공지사항에 궁금한 점이 있다면 댓글을 남겨주세요 :)"
        buttonText="작성"
        onSubmit={handleCommentSubmit}
      />
    </>
  );
};

export default NoticeCommentForm;

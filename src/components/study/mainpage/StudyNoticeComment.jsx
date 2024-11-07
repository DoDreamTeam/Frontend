import React from 'react';
import NoticeCommentList from '../noticecomment/NoticeCommentList';
import NoticeCommentForm from '../noticecomment/NoticeCommentForm';

const StudyNoticeComment = ({ noticeId }) => {
  return (
    <div>
      <NoticeCommentForm noticeId={noticeId} />

      <NoticeCommentList noticeId={noticeId} />
    </div>
  );
};

export default StudyNoticeComment;

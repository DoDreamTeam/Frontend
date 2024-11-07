import React from 'react';
import StudyCommentList from '../studycomment/StudyCommentList';
import StudyCommentForm from '../studycomment/StudyCommentForm';

const StudyQuestionComment = ({ userAnswerId }) => {
  return (
    <div>
      <StudyCommentForm userAnswerId={userAnswerId} />

      <StudyCommentList userAnswerId={userAnswerId} />
    </div>
  );
};

export default StudyQuestionComment;

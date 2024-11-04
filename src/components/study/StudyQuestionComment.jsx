import React from 'react';
import StudyCommentList from './comment/StudyCommentList';
import StudyCommentForm from './comment/StudyCommentForm';

const StudyQuestionComment = ({ userAnswerId }) => {
  return (
    <div>
      <StudyCommentForm userAnswerId={userAnswerId} />

      <StudyCommentList userAnswerId={userAnswerId} />
    </div>
  );
};

export default StudyQuestionComment;

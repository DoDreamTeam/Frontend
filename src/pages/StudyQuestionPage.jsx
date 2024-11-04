import React from 'react';
import StudyQuestion from '../components/study/StudyQuestion';
import StudyQuestionComment from '../components/study/StudyQuestionComment';
import { useParams } from 'react-router-dom';

const StudyQuestionPage = () => {
  const { userAnswerId } = useParams();

  return (
    <div className="w-full max-w-screen-lg mb-6">
      <StudyQuestion />
      <StudyQuestionComment userAnswerId={userAnswerId} />
    </div>
  );
};

export default StudyQuestionPage;

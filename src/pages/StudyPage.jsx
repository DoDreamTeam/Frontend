import React from 'react';
import { useParams } from 'react-router-dom';
import StudyInfo from '../components/study/mainpage/StudyInfo';
import StudyNotice from '../components/study/mainpage/StudyNotice';
import StudyQuestionList from '../components/study/mainpage/StudyQuestionList';

const StudyPage = () => {
  const { studyId } = useParams();

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col w-full">
      <StudyInfo studyId={studyId} />
      <StudyNotice studyId={studyId} />
      <StudyQuestionList studyId={studyId} />
    </div>
  );
};

export default StudyPage;
